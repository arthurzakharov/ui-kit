import type { Meta, StoryObj } from '@storybook/react-vite';
import { SizeBox } from '@utils/story/size-box/size-box.component';
import { BooleanType, StateArgType } from '@utils/story/arg-types';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ControlBox } from '@controls/control-box';
import cn from '@controls/control-box/control-box.module.css';

const meta = {
  title: 'Controls/ControlBox',
  component: ControlBox,
  args: {
    state: 'idle',
    focused: false,
    checked: false,
  },
  argTypes: {
    state: StateArgType({ description: 'The visual state of the control' }),
    focused: BooleanType({ description: 'Whether the control is focused' }),
    checked: BooleanType({ description: 'Whether the control is checked' }),
    onClick: { control: false, description: 'Click handler for the control' },
  },
  render: (args) => (
    <ControlBox {...args}>
      <SizeBox size={40} />
    </ControlBox>
  ),
} satisfies Meta<typeof ControlBox>;

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
    const controlBox = canvas.getByTestId('control-box');

    await step('ControlBox is clickable', async () => {
      await userEvent.click(controlBox);
      await expect(args.onClick).toHaveBeenCalledOnce();
    });

    await step('ControlBox has correct state classes', async () => {
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
    const controlBox = canvas.getByTestId('control-box');

    await step('ControlBox has error state class', async () => {
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
    const controlBox = canvas.getByTestId('control-box');

    await step('ControlBox has success state class', async () => {
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
    const controlBox = canvas.getByTestId('control-box');

    await step('ControlBox has focused class', async () => {
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
    const controlBox = canvas.getByTestId('control-box');

    await step('ControlBox has checked class', async () => {
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
    'data-testid': 'custom-test-id',
    className: 'custom-class-name',
  },
  play: async ({ args, canvasElement, step }) => {
    await step('Base interface is implemented correctly', async () => {
      await expect(within(canvasElement).getByTestId(String(args['data-testid']))).toHaveClass(String(args.className));
    });
  },
};
