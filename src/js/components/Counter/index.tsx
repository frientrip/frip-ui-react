import * as React from 'react';
import styled from 'styled-components';
import '../../../css/reset.css';
import MinusIcon from '../../assets/svgs/minus-black.svg';
import PlusIcon from '../../assets/svgs/plus-black.svg';
import colors from '../Color';
import MessageWrapper from '../MessageWrapper';

interface CounterProps {
  value: number|null;
  defaultValue?: number;
  onChange: (value: number|null) => any;
  disableDecrease?: boolean;
  disableIncrease?: boolean;
  className?: string;
  error?: boolean;
  message?: string;
}

interface CounterState {
  isDirty: boolean;
}

const InputWrapper = styled.div<{ error?: boolean}>`
  display: flex;
  align-items: center;
  border: solid 1px #e6e6e6;
  border-radius: 4px;
  color: ${colors.black};
  border-color: ${({ error }) => (error ? colors.red : '#e6e6e6')};
`;

const ControlButton = styled.div<{ disabled?: boolean }>`
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  padding: 12px;
  line-height: 16px;
  cursor: pointer;

  ${({ disabled }) => (disabled ? `
    cursor: not-allowed;

    path {
      fill: #e6e6e6;
    }
  ` : `
    path {
      fill: #4a4a4a;
    }

    &:hover {
      background-color: ${colors.veryLightBlue};
    }
    &:active {
      background-color: ${colors.babyBlue}
    }
  `)}
`;

const Value = styled.input`
  flex: 1 1 auto;
  width: 100%;
  height: 40px;
  border: 0;
  border-left: solid 1px #e6e6e6;
  border-right: solid 1px #e6e6e6;
  padding: 9px 16px;
  font-size: 14px;
  text-align: center;
`;

/**
 * Counter 컴포넌트
 * 값이 null일 때 변경을 시도하면 0으로 초기화
 *
 * @export
 * @class Counter
 * @extends {React.Component<CounterProps>}
 */
export default class Counter extends React.Component<CounterProps, CounterState> {

  state = {
    isDirty: false,
  };

  constructor(props: CounterProps) {
    super(props);

    this.handleMinusButtonClicked = this.handleMinusButtonClicked.bind(this);
    this.handlePlusButtonClicked = this.handlePlusButtonClicked.bind(this);
    this.handleDirectChange = this.handleDirectChange.bind(this);
  }

  static getDerivedStateFromProps(props: CounterProps, state: CounterState) {
    if (props.defaultValue !== undefined && !state.isDirty) {
      props.onChange && props.onChange(props.defaultValue);
      return {
        isDirty: true,
      };
    }
    return state;
  }

  /**
   * 마이너스 버튼 클릭을 처리하는 함수
   *
   * @private
   * @returns
   * @memberof Counter
   */
  private handleMinusButtonClicked() {
    if (this.props.disableDecrease) {
      return;
    }
    if (this.props.value === null) {
      this.props.onChange(0);
      return;
    }
    this.props.onChange(this.props.value - 1);
  }

  /**
   * 플러스 버튼 클릭을 처리하는 함수
   *
   * @private
   * @returns
   * @memberof Counter
   */
  private handlePlusButtonClicked() {
    if (this.props.disableIncrease) {
      return;
    }
    if (this.props.value === null) {
      this.props.onChange(0);
      return;
    }
    this.props.onChange(this.props.value + 1);
  }

  /**
   * 인풋 창에 직접 값을 입력했을 때 처리 함수
   *
   * @private
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * @returns
   * @memberof Counter
   */
  private handleDirectChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === '') {
      this.props.onChange(null);
      return;
    }

    const newValue = Number(event.target.value);

    if (this.props.value === null) {
      this.props.onChange(newValue);
      return;
    }

    if (this.props.disableDecrease && newValue < this.props.value) {
      return;
    }
    if (this.props.disableIncrease && newValue > this.props.value) {
      return;
    }

    this.props.onChange(newValue);
  }

  public render() {
    const { className, error, value, disableDecrease, disableIncrease, message } = this.props;

    return (
      <div className={className}>
        <InputWrapper error={error}>
          <ControlButton
            disabled={disableDecrease}
            dangerouslySetInnerHTML={{ __html: MinusIcon }}
            onClick={this.handleMinusButtonClicked}
          />
          <Value
            type="number"
            value={value !== null ? value : ''}
            onChange={this.handleDirectChange}
            onWheel={e => e.preventDefault()}
          />
          <ControlButton
            disabled={disableIncrease}
            dangerouslySetInnerHTML={{ __html: PlusIcon }}
            onClick={this.handlePlusButtonClicked}
          />
        </InputWrapper>

        {
          message && (
            <MessageWrapper error={error}>
              {message}
            </MessageWrapper>
          )
        }
      </div>
    );
  }
}
