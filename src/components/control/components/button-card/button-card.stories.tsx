import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreditCard, BanknoteArrowDown } from 'lucide-react';
import { fn } from 'storybook/test';
import { MaxWidth } from '@story/decorators/max-width';
import { Control } from '@components/control/control.component';

const meta = {
  title: 'Components/Control/ButtonCard',
  component: Control.ButtonCard,
  tags: ['autodocs'],
  decorators: [MaxWidth(320)],
  args: {
    iconPosition: 'top',
    active: false,
    disabled: false,
    preventDefault: false,
    blurAfterClick: false,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  render: (args) => <Control.ButtonCard {...args}>Select label main</Control.ButtonCard>,
} satisfies Meta<typeof Control.ButtonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    icon: <CreditCard />,
  },
};

export const Sepa: Story = {
  args: {
    icon: <BanknoteArrowDown />,
  },
};
