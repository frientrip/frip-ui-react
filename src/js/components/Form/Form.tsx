import bind from 'bind-decorator';
import { forEach as _forEach, get as _get, keys as _keys, reduce as _reduce } from 'lodash';
import * as React from 'react';

type FormValue = any;
type FormValidator = {
  validate: (value: FormValue, ...relatedValue: FormValue[]) => boolean,
  errorMessage: string;
};
type FormValueChangeHandler = (value: FormValue) => void;

/**
 * 단일 field 데이터 검증 결과
 */
interface FieldValidationResult {
  isValid: boolean;
  invalidIdx: number|null; // 실패한 validator가 없을 경우 null
}

/**
 * Form 컴포넌트가 가진 모든 fields 검증 결과
 */
interface FormValidationResult {
  isValid: boolean;
  fields: FormFieldSet;
  invalidFields: FormField[];
}

/**
 * 필드 객체를 생성하기 위한 정보 객체
 */
interface FormFieldPrototype {
  key: string;
  defaultValue?: FormValue;
  relatedFieldKeys?: string[]; // 관련된 필드의 key 값
  validators?: FormValidator[];
}

/**
 * form 입력 단위
 */
interface FormField {
  value: FormValue;
  validators: FormValidator[];
  isDirty: boolean;
  isValid: boolean;
  onChange: FormValueChangeHandler;
  relatedFieldKeys: string[]; // 관련된 필드의 key 값
  errorMessage: string;
}

/**
 * 필드 모음의 객체 형태
 */
interface FormFieldSet {
  [key: string]: FormField;
}

/**
 * 필드 submit시 전달하는 객체
 */
interface FormSubmissionSet {
  [key: string]: FormValue;
}

/**
 * render prop의 파라미터
 */
interface FormRenderProps {
  fields: FormFieldSet;
  onValidate: (fieldKeys?: string[]) => FormValidationResult;
  onSubmit: () => FormSubmissionSet;
}

interface FormProps {
  fields: FormFieldPrototype[];
  children?: (params: FormRenderProps) => React.ReactNode;
  render?: React.ComponentType<FormRenderProps>;
}

interface FormState {
  fields: FormFieldSet;
}

class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);

    this.state = {
      fields: {
        ..._reduce(
          props.fields,
          (acc, curr) => ({
            ...acc,
            [curr.key]: {
              value: curr.defaultValue !== undefined ? curr.defaultValue : '',
              validators: curr.validators || [],
              isDirty: false,
              isValid: true,
              onChange: this.makeOnChangeHandler(curr.key),
              relatedFieldKeys: curr.relatedFieldKeys || [],
              errorMessage: '',
            } as FormField,
          }),
          {},
        ),
      },
    };
  }

  /**
   * 주어진 key의 field에 접근합니다.
   * @param key
   */

  private accessField(key: string) {
    return this.state.fields[key];
  }

  /**
   * 주어진 key와 관련된 필드 key 목록을 반환합니다.
   * @param key
   */
  private accessRelatedFieldKeys(key: string): string[] {
    return this.accessField(key).relatedFieldKeys;
  }

  /**
   * 주어진 key와 value가 유효한지 검사합니다.
   * field 값이 가진 validators 사용
   * 한 번 invalid한 validator가 나오면 이후 validator의 결과와 상관없이 맨 처음 index를 넘긴다.
   * @param key
   * @param value
   */
  private validateField(key: string, value?: FormValue) {
    const currentField = this.accessField(key);
    const currentValue = (value === undefined)
      ? currentField.value
      : value;
    const relatedValues = _reduce(
      this.accessRelatedFieldKeys(key),
      (args, relateKey) => ([
        ...args,
        this.accessField(relateKey).value,
      ]),
      [] as FormValue[],
    );

    return _reduce(
      _get(
        currentField,
        'validators',
        [] as FormValidator[],
      ),
      (result: FieldValidationResult, currentValidator: FormValidator, index: number) => {
        const isCurrentValid = currentValidator.validate.apply(null, [currentValue, ...relatedValues]);
        const isFirstInvalid = (result.invalidIdx === null) && !isCurrentValid; // 처음으로 검증 깨진 경우

        return {
          isValid: result.isValid && isCurrentValid,
          invalidIdx: isFirstInvalid ? index : result.invalidIdx,
        };
      },
      { isValid: true, invalidIdx: null } as FieldValidationResult,
    );
  }

  /**
   * key 값의 인풋이 바뀌었을 때 처리 함수를 만듧니다.
   * @param key
   */
  private makeOnChangeHandler(key: string): FormValueChangeHandler {
    // VALIDATE RELATED FIELDS
    const validateRelatedFields = () => {
      _forEach(
        this.accessRelatedFieldKeys(key),
        (relatedKey) => {
          const { isValid: relatedIsValid, invalidIdx: relatedInvalidIdx } = this.validateField(relatedKey);
          this.updateFieldInState(relatedKey, this.accessField(relatedKey).value, relatedIsValid, false, relatedInvalidIdx || undefined);
        },
      );
    };

    return (value) => {
      let trimmedValue = value;

      if (typeof value === 'string') {
        // if value is string, trim it
        trimmedValue = value.trim();
      }

      // VALUE CHANGED
      const { isValid, invalidIdx } = this.validateField(key, trimmedValue);
      // OWN VALUE VALIDATED
      this.updateFieldInState(key, trimmedValue, isValid, true, invalidIdx || undefined, validateRelatedFields);
    };
  }

  /**
   * field를 state에 업데이트하는 함수
   * @param key
   * @param value
   * @param isValid
   * @param forceDirty
   * @param invalidIdx
   * @param cb
   */
  private updateFieldInState(key: string, value: FormValue, isValid: boolean, forceDirty: boolean, invalidIdx?: number, cb?: () => void) {
    this.setState(
      (state) => {
        const currentField: FormField = _get(
          state,
          ['fields', key],
        );
        const errorMessage = !isValid && invalidIdx !== undefined
          ? currentField.validators[invalidIdx].errorMessage
          : '';

        return {
          fields: {
            ...state.fields,
            [key]: {
              ...currentField,
              ...(forceDirty && { isDirty: true }),
              // value: (value instanceof Event) ? value.target.value : value, // Type check for event object
              value,
              isValid,
              errorMessage,
            } as FormField,
          },
        };
      },
      cb,
    );
  }

  /**
   * 필드 key 목록으로 form 검증 결과 객체를 만들어냅니다.
   * accepts an array of field keys to construct validated fields object
   * @param fieldKeys
   */
  private constructValidatedFieldsFromFieldsArray(fieldKeys: string[]): FormValidationResult {
    const validatedFields = _reduce(
      fieldKeys,
      (fields, key) => {
        const currentField = this.accessField(key);
        const { isValid, invalidIdx } = this.validateField(key);
        const errorMessage = !isValid && !!invalidIdx
          ? currentField.validators[invalidIdx].errorMessage
          : '';

        return {
          ...fields,
          [key]: {
            ...currentField,
            isValid,
            errorMessage,
            isDirty: true,
          } as FormField,
        };
      },
      { ...this.state.fields },
    );

    const isValid = _reduce(
      validatedFields,
      (isFormValid, field) => isFormValid && field.isValid,
      true,
    );
    const invalidFields = _reduce(
      validatedFields,
      (result, field) => {
        if (field.isValid) {
          return result;
        }
        return [
          ...result,
          field,
        ];
      },
      [] as FormField[],
    );

    return {
      isValid,
      invalidFields,
      fields: validatedFields,
    };
  }

  /**
   * render prop에 전달할 validate 함수
   * @param fieldKeys
   */
  @bind
  private handleValidate(fieldKeys?: string[]): FormValidationResult {
    const result = this.constructValidatedFieldsFromFieldsArray(
      fieldKeys && fieldKeys.length
        ? fieldKeys
        : _keys(this.state.fields),
    );

    this.setState({
      fields: result.fields,
    });
    return result;
  }

  /**
   * render prop에 전달하는 submit 함수
   */
  @bind
  private handleSubmit(): FormSubmissionSet {
    const finalFields = {
      ..._reduce(
        this.state.fields,
        (result, field, key) =>
        ({
          ...result,
          [key]: field.value,
        }),
        {} as FormSubmissionSet,
      ),
    };

    return finalFields;
  }

  /**
   * Function as Child Component 일 때 렌더링 함수
   */
  private renderFaCC() {
    const { children } = this.props;
    const {
      fields,
    } = this.state;

    if (typeof children === 'function') {
      return children({
        fields,
        validate: this.handleValidate,
        submit: this.handleSubmit,
      } as any); // HACK: deprecated
    }

    return null;
  }

  public render() {
    const { render: View } = this.props;

    if (View === undefined) {
      return this.renderFaCC();
    }

    return (
      <View
        fields={this.state.fields}
        onValidate={this.handleValidate}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default Form;
