import type { Meta, StoryObj } from '@storybook/react-vite';
import { SizeBox } from '@utils/story/size-box';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Box } from '@controls/primitives';
import cn from '@controls/primitives/box/box.module.css';

const meta = {
  title: 'Controls/Primitives/Box',
  component: Box,
  args: {
    state: 'idle',
    focused: false,
    checked: false,
  },
  render: (args) => (
    <Box {...args}>
      <SizeBox size={[58, 58]} />
    </Box>
  ),
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    state: 'idle',
    focused: false,
    checked: false,
    onClick: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const controlBox = canvas.getByTestId('box');

    await step('Box is clickable', async () => {
      await userEvent.click(controlBox);
      await expect(args.onClick).toHaveBeenCalledOnce();
    });

    await step('Box has correct state classes', async () => {
      await expect(controlBox).toHaveClass(cn.Idle);
      await expect(controlBox).not.toHaveClass(cn.Error);
      await expect(controlBox).not.toHaveClass(cn.Success);
      await expect(controlBox).not.toHaveClass(cn.Focused);
      await expect(controlBox).not.toHaveClass(cn.Checked);
    });
  },
};

export const Error: Story = {
  args: {
    state: 'error',
    focused: false,
    checked: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const controlBox = canvas.getByTestId('box');

    await step('Box has error state class', async () => {
      await expect(controlBox).toHaveClass(cn.Error);
      await expect(controlBox).not.toHaveClass(cn.Idle);
      await expect(controlBox).not.toHaveClass(cn.Success);
      await expect(controlBox).not.toHaveClass(cn.Focused);
      await expect(controlBox).not.toHaveClass(cn.Checked);
    });
  },
};

export const Success: Story = {
  args: {
    state: 'success',
    focused: false,
    checked: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const controlBox = canvas.getByTestId('box');

    await step('Box has success state class', async () => {
      await expect(controlBox).toHaveClass(cn.Success);
      await expect(controlBox).not.toHaveClass(cn.Idle);
      await expect(controlBox).not.toHaveClass(cn.Error);
      await expect(controlBox).not.toHaveClass(cn.Focused);
      await expect(controlBox).not.toHaveClass(cn.Checked);
    });
  },
};

export const Focused: Story = {
  args: {
    state: 'idle',
    focused: true,
    checked: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const controlBox = canvas.getByTestId('box');

    await step('Box has focused class', async () => {
      await expect(controlBox).toHaveClass(cn.Focused);
      await expect(controlBox).toHaveClass(cn.Idle);
      await expect(controlBox).not.toHaveClass(cn.Error);
      await expect(controlBox).not.toHaveClass(cn.Success);
      await expect(controlBox).not.toHaveClass(cn.Checked);
    });
  },
};

export const Checked: Story = {
  args: {
    state: 'idle',
    focused: false,
    checked: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const controlBox = canvas.getByTestId('box');

    await step('Box has checked class', async () => {
      await expect(controlBox).toHaveClass(cn.Checked);
      await expect(controlBox).toHaveClass(cn.Idle);
      await expect(controlBox).not.toHaveClass(cn.Error);
      await expect(controlBox).not.toHaveClass(cn.Success);
      await expect(controlBox).not.toHaveClass(cn.Focused);
    });
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
