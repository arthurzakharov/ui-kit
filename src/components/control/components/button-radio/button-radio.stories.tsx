import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { MaxWidth } from '@story/decorators/max-width';
import { Control } from '@components/control/control.component';

const meta = {
  title: 'Components/Control/ButtonRadio',
  component: Control.ButtonRadio,
  tags: ['autodocs'],
  decorators: [MaxWidth(320)],
  args: {
    active: false,
    disabled: false,
    preventDefault: false,
    blurAfterClick: false,
    info: {
      text: 'Info text',
      hintLeft: 'Left hint',
      hintRight: 'Right hint',
    },
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  render: (args) => <Control.ButtonRadio {...args}>Select label main</Control.ButtonRadio>,
} satisfies Meta<typeof Control.ButtonRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'With all elements provided',
};

export const WithoutInfoSection: Story = {
  args: {
    info: undefined,
  },
};

export const WithoutLeftBottomInfo: Story = {
  args: {
    info: {
      text: 'Info text',
      hintRight: 'Right hint',
    },
  },
};

export const WithoutRightBottomInfo: Story = {
  args: {
    info: {
      text: 'Info text',
      hintLeft: 'Left hint',
    },
  },
};

export const WithoutTextInfo: Story = {
  args: {
    info: {
      hintLeft: 'Left hint',
      hintRight: 'Right hint',
    },
  },
};
