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
              value: curr.defaultValue || '',
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
    this.validateAllFields = this.validateAllFields.bind(this);
    this.submit = this.submit.bind(this);
  }
  makeOnChangeHandler(key) {
    return (value) => {
      // VALUE CHANGED
      const { isValid, invalidIdx } = this.validateField(key, value);
      // OWN VALUE VALIDATED
      this.updateFieldInState(key, value, isValid, true, invalidIdx, () => {
        // VALIDATE RELATED FIELDS
        this.accessField(key).relatedFields.forEach((relatedKey) => {
          const { isValid: relatedIsValid, invalidIdx: relatedInvalidIdx } = this.validateField(relatedKey);
          this.updateFieldInState(relatedKey, this.accessField(relatedKey).value, relatedIsValid, false, relatedInvalidIdx);
        });
      });
    };
  }
  updateFieldInState(key, value, isValid, forceDirty, invalidIdx, cb) {
    this.setState({
      fields: {
        ...this.state.fields,
        [key]: {
          ...this.accessField(key),
          value: typeof value === 'object' ? value.target.value : value,
          isValid,
          ...(forceDirty && { isDirty: true }),
          errorMessage: isValid ? '' : this.accessField(key).validators[invalidIdx].errorMessage,
        },
      },
    }, cb);
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
  validateAllFields() {
    let isFormValid = true;

    this.setState({
      fields: {
        ...Object.keys(this.state.fields).reduce((acc, curr) => {
          const { isValid, invalidIdx } = this.validateField(curr);
          isFormValid = isFormValid && isValid;
          return ({
            ...acc,
            [curr]: {
              ...this.accessField(curr),
              isDirty: true,
              isValid,
              errorMessage: isValid ? '' : this.accessField(curr).validators[invalidIdx].errorMessage,
            },
          });
        }, {}),
      },
    });

    return isFormValid;
  }
  submit() {
    return this.validateAllFields() && this.state.fields;
  }
  accessField(key) {
    return this.state.fields[key];
  }
  render() {
    const {
      fields,
    } = this.state;

    return (this.props.children({
      fields, validate: this.validateAllFields, submit: this.submit,
    }));
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
