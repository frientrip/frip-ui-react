import React from 'react';

/**
 * Stepper UI Compoment
 * currentStep은 0부터 시작
 */
interface Props {
  currentStep: number;
  totalSteps: string[];
}
interface State {
  currentStep: number;
  totalSteps: string[];
}
export default class Stepper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentStep: props.currentStep,
      totalSteps: props.totalSteps,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const newState: State = {
      ...this.state,
      ...nextProps,
    };
    this.setState(newState);
  }

  render() {
    const listElements: JSX.Element[] = this.state.totalSteps.map((step: string, index: number) => {
      let className: string = '';

      if (this.state.currentStep === index) {
        className = 'active';
      } else if (this.state.currentStep > index) {
        className = 'resolved';
      }

      return (
        <li
          key={step}
          className={className}
        >
          {step}
        </li>
      );
    });

    return (
      <ol>
        {listElements}
      </ol>
    );
  }
}
