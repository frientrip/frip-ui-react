import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './Input';
import Form from './Form';
import { ButtonPrimary, ButtonDanger } from '../Button';
import CheckboxItem from './CheckboxItem';


const required = {
  validate: value => Boolean(value.length),
  errorMessage: 'Field is required',
};

const longerThan = length => ({
  validate: val => (val.length ? val.length > Number(length) : true),
  errorMessage: `Must be longer than ${length} characters`,
});

const requiredIfNotEmpty = {
  validate: (val, relatedVal) => (relatedVal.length ? val.length > 0 : true),
  errorMessage: 'Required via related field',
};

storiesOf('Form', module)
  .add('Input', () => (
    <Input onChange={action('Input changed')} message="Description" />
  ))
  .add('Input bigLabel', () => (
    <Input bigLabel label="Big Input" onChange={action('Input changed')} message="Description" />
  ))
  .add('Input transparent', () => (
    <div style={{ height: '1000px', padding: '30px', backgroundColor: 'black' }}>
      <Input transparent placeholder="안녕" onChange={action('Input changed')} />
    </div>
  ))
  .add('Input with Error', () => (
    <Input error onChange={action('Input changed')} message="Description" />
  ))
  .add('Input Required', () => (
    <Input onChange={action('Input changed')} label="Name" required message="Description" />
  ))
  .add('Input Number', () => (
    <Input type="number" onChange={action('Input changed')} message="Description" />
  ))
  .add('Input with Label', () => (
    <Input label="Input Label" onChange={action('Input changed')} message="Description" />
  ))
  .add('Short Input with Label', () => (
    <div style={{ width: '150px' }}>
      <Input type="number" label="Number" onChange={action('Input changed')} message="Description" />
    </div>
  ))
  .add('Checkbox item', () => (
    <CheckboxItem
      label="안녕"
      onChange={value => action('Checkbox value changed')(value)}
    />
  ))
  .add('Form', () => (
    <div style={{ width: '150px' }}>
      <Form
        fields={[
          {
            key: 'lastName',
            validators: [required, longerThan(5)],
            relatedFieldKeys: ['firstName'],
          },
          {
            key: 'firstName',
            validators: [longerThan(2), requiredIfNotEmpty],
            relatedFieldKeys: ['lastName'],
          },
        ]}
      >
        {
          ({ fields, onValidate: validate, onSubmit: submit }) =>
            (
              <div>
                <Input
                  type="text"
                  label="Last Name"
                  onChange={fields.lastName.onChange}
                  value={fields.lastName.value}
                  error={!fields.lastName.isValid && fields.lastName.isDirty}
                  message={(!fields.lastName.isValid && fields.lastName.isDirty) ? fields.lastName.errorMessage : ''}
                />
                <Input
                  type="text"
                  label="First Name"
                  onChange={fields.firstName.onChange}
                  value={fields.firstName.value}
                  error={!fields.firstName.isValid && fields.firstName.isDirty}
                  message={(!fields.firstName.isValid && fields.firstName.isDirty) ? fields.firstName.errorMessage : ''}
                />
                <ButtonPrimary labelText="Validate" onClick={() => console.log(validate())} />
                <ButtonDanger labelText="Submit" onClick={submit} />
              </div>
            )
        }
      </Form>
    </div>
  ));
