import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@/components/control/components/label';
import { expect } from 'storybook/test';
import cn from '@/components/control/components/label/label.module.css';

const meta = {
  title: 'Components/Control/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The content of the label',
      type: {
        name: 'function',
        required: true,
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    position: {
      control: 'radio',
      options: ['idle', 'active'],
      table: {
        type: { summary: 'string' },
      },
      description: 'Visual position of the label',
    },
    state: {
      control: 'radio',
      options: ['idle', 'error', 'success'],
      table: {
        type: { summary: 'string' },
      },
      description: 'Validation state color',
    },
  },
  args: {
    position: 'idle',
    state: 'idle',
  },
  render: (args) => (
    <Label {...args}>
      <b>Label</b> text
    </Label>
  ),
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: undefined,
    state: undefined,
  },
  play: async ({ canvas }) => {
    const label = canvas.getByTestId('label');
    await expect(label).toHaveClass(cn.Label);
    await expect(label).toHaveClass(cn.LabelPositionIdle);
    await expect(label).toHaveClass(cn.LabelStateIdle);
    await expect(label).not.toHaveClass(cn.LabelPositionActive);
    await expect(label).not.toHaveClass(cn.LabelStateError);
    await expect(label).not.toHaveClass(cn.LabelStateSuccess);
  },
};

export const PositionIdle: Story = {
  args: {
    position: 'idle',
  },
  play: async ({ canvas }) => {
    const label = canvas.getByTestId('label');
    await expect(label).toHaveClass(cn.LabelPositionIdle);
    await expect(label).not.toHaveClass(cn.LabelPositionActive);
  },
};

export const PositionActive: Story = {
  args: {
    position: 'active',
  },
  play: async ({ canvas }) => {
    const label = canvas.getByTestId('label');
    await expect(label).toHaveClass(cn.LabelPositionActive);
    await expect(label).not.toHaveClass(cn.LabelPositionIdle);
  },
};

export const StateIdle: Story = {
  args: {
    state: 'idle',
  },
  play: async ({ canvas }) => {
    const label = canvas.getByTestId('label');
    await expect(label).toHaveClass(cn.LabelStateIdle);
    await expect(label).not.toHaveClass(cn.LabelStateError);
    await expect(label).not.toHaveClass(cn.LabelStateSuccess);
  },
};

export const StateError: Story = {
  args: {
    state: 'error',
  },
  play: async ({ canvas }) => {
    const label = canvas.getByTestId('label');
    await expect(label).toHaveClass(cn.LabelStateError);
    await expect(label).not.toHaveClass(cn.LabelStateIdle);
    await expect(label).not.toHaveClass(cn.LabelStateSuccess);
  },
};

export const StateSuccess: Story = {
  args: {
    state: 'success',
  },
  play: async ({ canvas }) => {
    const label = canvas.getByTestId('label');
    await expect(label).toHaveClass(cn.LabelStateSuccess);
    await expect(label).not.toHaveClass(cn.LabelStateIdle);
    await expect(label).not.toHaveClass(cn.LabelStateError);
  },
};
