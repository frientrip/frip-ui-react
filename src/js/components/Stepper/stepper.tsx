import React from 'react';

/**
 * Stepper에서 사용하는 props interface
 */
interface Props {
  currentStep: number;
  totalSteps: string[];
}

/**
 * Stepper에서 사용하는 state interface
 */
interface State {
  currentStep: number;
  totalSteps: string[];
}

/**
 * Stepper UI Compoment
 */
export default class Stepper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentStep: props.currentStep,
      totalSteps: props.totalSteps,
    };
  }

  render() {
    const listElements: any[] = this.state.totalSteps.map((step: string) => {
      return (<li key={step}>{step}</li>);
    });

    return (
      <ol>
        {listElements}
      </ol>
    );
  }
}
