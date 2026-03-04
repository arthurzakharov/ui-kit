import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlChoice } from '@controls/control-choice';
import { ChoiceTypeArgType, SizeArgType, StateArgType } from '@utils/story/arg-types';

const meta = {
  title: 'Controls/ControlChoice',
  component: ControlChoice,
  args: {
    type: 'radio',
    checked: false,
    state: 'idle',
    size: 'md',
    className: '',
  },
  argTypes: {
    type: ChoiceTypeArgType(),
    state: StateArgType({ defaultValue: 'idle' }),
    size: SizeArgType({ defaultValue: 'md' }),
  },
} satisfies Meta<typeof ControlChoice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeRadioUnchecked: Story = {
  args: {
    type: 'radio',
    checked: false,
  },
};

export const TypeRadioChecked: Story = {
  args: {
    type: 'radio',
    checked: true,
  },
};

export const TypeCheckboxUnchecked: Story = {
  args: {
    type: 'checkbox',
    checked: false,
  },
};

export const TypeCheckboxChecked: Story = {
  args: {
    type: 'checkbox',
    checked: true,
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'custom-class-name',
  },
};
