import type { Meta, StoryObj } from '@storybook/react-vite';
import { SizeBox } from '@story/placeholders/size-box.component';
import { ControlBox } from '@controls/control-box';
import { ClassNameArgType, StateArgType } from '@story/arg-types';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Controls/ControlBox',
  component: ControlBox,
  args: {
    state: 'idle',
    focused: false,
    checked: false,
    className: '',
  },
  argTypes: {
    state: StateArgType(),
    focused: { control: 'boolean', description: 'Whether the control is focused' },
    checked: { control: 'boolean', description: 'Whether the control is checked' },
    className: ClassNameArgType({ defaultValue: '' }),
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
  },
};

export const Error: Story = {
  args: {
    state: 'error',
    focused: false,
    checked: false,
  },
};

export const Success: Story = {
  args: {
    state: 'success',
    focused: false,
    checked: false,
  },
};

export const Focused: Story = {
  args: {
    state: 'idle',
    focused: true,
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    state: 'idle',
    focused: false,
    checked: true,
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'color-grey-950',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const box = canvas.getByTestId(String(args['data-testid']));

    await step('Then the control box component has the custom test id', async () => {
      await expect(box).toBeInTheDocument();
    });

    await step('Then the control box component has the custom class name', async () => {
      await expect(box).toHaveClass(String(args.className));
    });
  },
};
