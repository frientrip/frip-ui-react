import * as React from 'react';
import styled from 'styled-components';
import iconCheck from '../../assets/svgs/check.svg';
import colors from '../Color/index';

interface CheckboxItemProps {
  label: string;
  defaultValue?: boolean;
  onChange: (checked: boolean) => any;
}

interface CheckboxItemState {
  isOverrided: boolean;
  checked: boolean;
}

const Wrapper = styled.label<{ checked: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: ${colors.primary};

    >div:first-child {
      border-color: ${colors.primary};
      background-color: ${({ checked }) => (checked ? colors.primary : colors.veryLightBlue)};
    }
  }
`;

const Box = styled.div<{ checked: boolean; }>`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border: solid 1px #C0C0C0;
  border-radius: 4px;
  line-height: 20px;
  background-color: ${({ checked }) => (checked ? colors.primary : colors.pureWhite)};

  svg {
    vertical-align: baseline;
  }
`;

const Input = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;

const Label = styled.div`
  line-height: 24px;
`;

class CheckboxItem extends React.Component<CheckboxItemProps, CheckboxItemState> {
  constructor(props: CheckboxItemProps) {
    super(props);

    this.state = {
      isOverrided: props.defaultValue === undefined,
      checked: props.defaultValue || false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps: CheckboxItemProps, prevState: CheckboxItemState): CheckboxItemState {
    if (nextProps.defaultValue !== undefined && !prevState.isOverrided) {
      // defaultValue가 생기는 경우 업데이트
      return {
        isOverrided: true,
        checked: nextProps.defaultValue,
      };
    }

    return prevState;
  }

  /**
   * 클릭했을 때 작동하는 함수
   * state를 업데이트 해주고 onClick함수를 호출한다.
   *
   * @private
   * @memberof CheckboxItem
   */
  private handleClick() {
    this.setState(
      state => ({
        checked: !(state.checked),
      }),
      () => {
        this.props.onChange(this.state.checked);
      });
  }

  public render() {
    const { label } = this.props;
    const { checked } = this.state;

    return (
      <Wrapper checked={checked}>
        <Box checked={checked} dangerouslySetInnerHTML={{
          __html: checked ? iconCheck : undefined,
        }} />
        <Input type="checkbox" checked={checked} onChange={this.handleClick}/>
        <Label>{label}</Label>
      </Wrapper>
    );
  }
}

export default CheckboxItem;
