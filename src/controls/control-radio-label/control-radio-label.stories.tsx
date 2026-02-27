import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ControlBox } from '@controls/control-box';
import { ControlChoice } from '@controls/control-choice';
import { ControlHiddenInput } from '@controls/control-hidden-input';
import { ControlRadioLabel } from '@controls/control-radio-label';
import { ControlRadioText } from '@controls/control-radio-text';
import type { State } from '@controls/utils/types';
import { StateArgType } from '@story/arg-types';

type DemoArgs = {
  state?: State;
};

const meta: Meta<DemoArgs> = {
  title: 'Controls/ControlRadioLabel',
  argTypes: {
    state: {
      control: StateArgType({ defaultValue: 'idle' }),
    },
  },
};

export default meta;
type Story = StoryObj<DemoArgs>;

const choices = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

const choice = { label: 'Option A', value: 'a' };

const RadioExample = ({ state = 'idle' }: DemoArgs) => {
  const [value, setValue] = useState('a');

  return (
    <ControlRadioLabel id="radio-single-a" value={value} choice={choice} choices={choices} state={state}>
      {({ focused, hovered, checked, state }) => (
        <ControlBox
          state={state}
          checked={checked}
          focused={focused}
          onClick={() => setValue((prev) => (prev === choice.value ? '' : choice.value))}
        >
          <div className="d-flex align-items-center gap-1 px-3 py-3">
            <ControlHiddenInput
              type="radio"
              id="radio-single-a"
              name="single-value-demo"
              value={choice.value}
              checked={checked}
              onChange={() => setValue((prev) => (prev === choice.value ? '' : choice.value))}
            />
            <ControlChoice type="radio" checked={checked} state={state} focused={focused} hovered={hovered} />
            <ControlRadioText checked={checked}>Option A</ControlRadioText>
          </div>
        </ControlBox>
      )}
    </ControlRadioLabel>
  );
};

const CheckboxExample = ({ state = 'idle' }: DemoArgs) => {
  const [value, setValue] = useState(['a', 'b']);

  return (
    <ControlRadioLabel id="radio-multi-a" value={value} choice={choice} choices={choices} state={state}>
      {({ focused, hovered, checked, state }) => (
        <ControlBox state={state} checked={checked} focused={focused}>
          <div className="d-flex align-items-center gap-1 px-3 py-3">
            <ControlHiddenInput
              type="checkbox"
              id="radio-multi-a"
              name="multiple-value-demo"
              value={choice.value}
              checked={checked}
              onChange={() =>
                setValue((prev) =>
                  prev.includes(choice.value) ? prev.filter((item) => item !== choice.value) : [...prev, choice.value],
                )
              }
            />
            <ControlChoice type="checkbox" checked={checked} state={state} focused={focused} hovered={hovered} />
            <ControlRadioText checked={checked}>Option A</ControlRadioText>
          </div>
        </ControlBox>
      )}
    </ControlRadioLabel>
  );
};

export const RadioIdle: Story = {
  args: {
    state: 'idle',
  },
  render: (args) => <RadioExample {...args} />,
};

export const RadioError: Story = {
  args: {
    state: 'error',
  },
  render: (args) => <RadioExample {...args} />,
};

export const RadioSuccess: Story = {
  args: {
    state: 'success',
  },
  render: (args) => <RadioExample {...args} />,
};

export const CheckboxIdle: Story = {
  args: {
    state: 'idle',
  },
  render: (args) => <CheckboxExample {...args} />,
};

export const CheckboxError: Story = {
  args: {
    state: 'error',
  },
  render: (args) => <CheckboxExample {...args} />,
};

export const CheckboxSuccess: Story = {
  args: {
    state: 'success',
  },
  render: (args) => <CheckboxExample {...args} />,
};
