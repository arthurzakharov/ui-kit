import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
import { Button } from '@controls/buttons';

const meta = {
  title: 'Controls/Buttons/Button',
  component: Button,
  args: {
    text: 'Go next step',
    color: 'primary',
    textSize: 'md',
    infoSize: 'md',
    type: 'button',
    disabled: false,
    info: '',
    fullWidth: false,
    loading: false,
    preventDefault: false,
    blurAfterClick: false,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
    // Base props
    className: '',
    'data-testid': '',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBlur: fn(),
    onFocus: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('button');
    await expect(button).toBeInTheDocument();
  },
};

export const WithBlurAfterClick: Story = {
  args: {
    blurAfterClick: true,
    onBlur: fn(),
    onFocus: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('button');
    await expect(button).toBeInTheDocument();
  },
};

export const WithInfo: Story = {
  args: {
    info: 'get <u>more</u> inormation',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('button');
    await expect(button).toBeDisabled();
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('button');
    await expect(button).toBeDisabled();
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'custom-class-name',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByTestId(String(args['data-testid']));

    await step('Component has the custom test id', async () => {
      await expect(component).toBeInTheDocument();
    });

    await step('Component has the custom class name', async () => {
      await expect(component).toHaveClass(String(args.className));
    });
  },
};
