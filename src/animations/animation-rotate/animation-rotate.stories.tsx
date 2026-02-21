import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { animationArgTypes } from '@story/arg-types';
import { AnimationRotate } from '@animations/animation-rotate';
import { ArrowBigUp } from 'lucide-react';

const meta = {
  title: 'Animations/AnimationRotate',
  component: AnimationRotate,
  tags: ['autodocs'],
  args: {
    from: 'top',
    to: 'bottom',
    animateOnStart: false,
    name: 'animation-rotate',
    condition: true,
    ease: 'easeInOut',
    type: 'tween',
    duration: 0.75,
    delay: 0,
    flex: true,
    className: '',
  },
  argTypes: animationArgTypes,
  render: (args) => (
    <AnimationRotate {...args}>
      <ArrowBigUp data-testid="animation-content" size={64} />
    </AnimationRotate>
  ),
} satisfies Meta<typeof AnimationRotate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DoNotAnimateOnStart: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('animation-content')).toBeInTheDocument();
  },
};

export const AnimateOnStart: Story = {
  args: {
    animateOnStart: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('animation-content')).toBeInTheDocument();
  },
};

export const ConditionFalseStillRenders: Story = {
  args: {
    condition: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('animation-content')).toBeInTheDocument();
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'story-custom-class',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const content = canvas.getByTestId('animation-content');
    await expect(content.parentElement).toHaveClass(String(args.className));
  },
};
