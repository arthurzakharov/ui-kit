import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { animationArgTypes } from '@story/arg-types';
import { SizeBox } from '@story/placeholders/size-box.component';
import { GreyBox } from '@story/placeholders/grey-box.component';
import { AnimationRotate } from '@animations/animation-rotate';

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
    duration: 0.2,
    delay: 0,
    className: '',
  },
  argTypes: animationArgTypes,
  render: (args) => (
    <SizeBox size={300}>
      <AnimationRotate {...args}>
        <GreyBox size={300} id="animation-content">
          Rotate
        </GreyBox>
      </AnimationRotate>
    </SizeBox>
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
