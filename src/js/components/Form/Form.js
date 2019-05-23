import { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.func,
};

const defaultProps = {
  fields: [],
  children: () => {},
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        ...props.fields.reduce((acc, curr) => (
          {
            ...acc,
            [curr.key]: {
              value: curr.defaultValue !== undefined ? curr.defaultValue : '',
              validators: curr.validators || [],
              isDirty: false,
              onChange: this.makeOnChangeHandler(curr.key),
              relatedFields: curr.relatedFields || [],
              errorMessage: '',
            },
          }
        ), {}),
      },
    };
    this.constructValidatedFieldsFromFieldsArray = this.constructValidatedFieldsFromFieldsArray.bind(this);
    this.validate = this.validate.bind(this);
    this.submit = this.submit.bind(this);
  }
  makeOnChangeHandler(key) {
    return (value) => {
      let trimmedValue = value;

      if (typeof value === 'string') {
        // if value is string, trim it
        trimmedValue = value.trim();
      }

      // VALUE CHANGED
      const { isValid, invalidIdx } = this.validateField(key, trimmedValue);
      // OWN VALUE VALIDATED
      this.updateFieldInState(key, trimmedValue, isValid, true, invalidIdx, () => {
        // VALIDATE RELATED FIELDS
        this.accessField(key).relatedFields.forEach((relatedKey) => {
          const { isValid: relatedIsValid, invalidIdx: relatedInvalidIdx } = this.validateField(relatedKey);
          this.updateFieldInState(relatedKey, this.accessField(relatedKey).value, relatedIsValid, false, relatedInvalidIdx);
        });
      });
    };
  }
  updateFieldInState(key, value, isValid, forceDirty, invalidIdx, cb) {
    this.setState(state => ({
      fields: {
        ...state.fields,
        [key]: {
          ...this.accessField(key),
          value: (value instanceof Event) ? value.target.value : value, // Type check for event object
          isValid,
          ...(forceDirty && { isDirty: true }),
          errorMessage: isValid ? '' : this.accessField(key).validators[invalidIdx].errorMessage,
        },
      },
    }), cb);
  }
  validateField(key, value) {
    const val = (value === undefined) ? this.accessField(key).value : value;
    return this.accessField(key).validators.reduce((acc, curr, idx) => {
      // console.log('reducing', acc, curr, idx, val);
      let vals = [];
      vals.push(val);
      vals = this.accessField(key)
        .relatedFields
        .reduce((iAcc, iCurr) => {
          iAcc.push(this.accessField(iCurr).value);
          return iAcc;
        }, vals);
      const isValid = curr.validate.apply(null, vals);
      const isFirstInvalid = (acc.invalidIdx === null) && !isValid;
      const invalidIdx = isFirstInvalid ? idx : acc.invalidIdx;
      return { isValid: acc.isValid && isValid, invalidIdx };
    }, { isValid: true, invalidIdx: null });
  }
  // accepts an array of field keys to construct validated fields object
  constructValidatedFieldsFromFieldsArray(fieldsArray) {
    let isFormValid = true;
    const invalidFields = [];

    const validatedFields = {
      ...fieldsArray.reduce((acc, curr) => {
        const { isValid, invalidIdx } = this.validateField(curr);
        isFormValid = isFormValid && isValid;
        !isValid && invalidFields.push(curr);
        return ({
          ...acc,
          [curr]: {
            ...this.accessField(curr),
            isDirty: true,
            isValid,
            errorMessage: isValid ? '' : this.accessField(curr).validators[invalidIdx].errorMessage,
          },
        });
      }, this.state.fields),
    };

    this.setState({
      fields: validatedFields,
    });

    return { fields: validatedFields, isValid: isFormValid, invalidFields };
  }
  validate(fieldsArray) {
    if (fieldsArray && fieldsArray.length) {
      return this.constructValidatedFieldsFromFieldsArray(fieldsArray);
    }
    return this.constructValidatedFieldsFromFieldsArray(Object.keys(this.state.fields));
  }
  submit() {
    const finalFields = {
      ...Object.keys(this.state.fields).reduce((acc, curr) =>
        ({
          ...acc,
          [curr]: this.state.fields[curr].value,
        }), {}),
    };

    return finalFields;
  }
  accessField(key) {
    return this.state.fields[key];
  }
  render() {
    const {
      fields,
    } = this.state;

    return (this.props.children({
      fields, validate: this.validate, submit: this.submit,
    }));
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
