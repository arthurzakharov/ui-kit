import type { Meta, StoryObj } from '@storybook/react-vite';
import { Control } from '@components/control/control.component';

const meta = {
  title: 'Components/Control/Choice',
  component: Control.Choice,
  tags: ['autodocs'],
  args: {
    type: 'radio',
    checked: false,
    focused: false,
    hovered: false,
    state: 'idle',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    type: {
      control: 'select',
    },
    checked: {
      control: 'boolean',
    },
    state: {
      control: 'select',
    },
    size: {
      control: 'select',
    },
    focused: {
      control: 'boolean',
    },
    hovered: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Control.Choice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultValues: Story = {
  args: {
    state: undefined,
    focused: undefined,
    hovered: undefined,
    disabled: undefined,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Focused: Story = {
  args: {
    focused: true,
  },
};

export const Hovered: Story = {
  args: {
    hovered: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const TypeRadio: Story = {
  args: {
    type: 'radio',
  },
};

export const TypeCheckbox: Story = {
  args: {
    type: 'checkbox',
  },
};

export const StateIdle: Story = {
  args: {
    state: 'idle',
  },
};

export const StateError: Story = {
  args: {
    state: 'error',
  },
};

export const StateSuccess: Story = {
  args: {
    state: 'success',
  },
};
