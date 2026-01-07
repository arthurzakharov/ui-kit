import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Button } from '@/components/control/components/button';

const meta = {
  title: 'Components/Control/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    color: 'next',
    size: 'md',
    type: 'button',
    disabled: false,
    info: '',
    fullWidth: false,
    children: (
      <>
        Custom button with or without <b>info</b>
      </>
    ),
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    color: {
      control: 'select',
    },
    size: {
      control: 'select',
    },
    type: {
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
    info: {
      control: 'text',
    },
    fullWidth: {
      control: 'boolean',
    },
    children: {
      type: {
        name: 'function',
        required: true,
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: undefined,
    fullWidth: undefined,
    onClick: undefined,
    onFocus: undefined,
    onBlur: undefined,
  },
};

export const CustomColor: Story = {
  args: {
    color: 'previous',
  },
};

export const CustomSize: Story = {
  args: {
    size: 'lg',
  },
};

export const CustomType: Story = {
  args: {
    type: 'reset',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = await canvas.getByTestId('button');
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toBeCalled();
  },
};

export const Enabled: Story = {
  args: {
    disabled: false,
    onFocus: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = await canvas.getByTestId('button');
    await expect(button).not.toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(args.onClick).toHaveBeenNthCalledWith(1);
    await expect(args.onFocus).toHaveBeenNthCalledWith(1);
    await expect(args.onFocus).toHaveBeenNthCalledWith(1);
    await userEvent.click(document.body);
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(args.onFocus).toHaveBeenNthCalledWith(2);
    await userEvent.keyboard('[Space]');
    await expect(args.onClick).toHaveBeenNthCalledWith(2);
    await userEvent.tab();
    await expect(button).not.toHaveFocus();
    await expect(args.onBlur).toHaveBeenNthCalledWith(2);
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const WithInfoAsPlainText: Story = {
  args: {
    info: '100% kostenlos',
  },
};

export const WithInfoAsTagText: Story = {
  args: {
    info: '<i>100%</i> kostenlos',
  },
};
