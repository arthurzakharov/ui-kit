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
    name: 'animation-rotate',
    condition: true,
    animateOnStart: false,
    ease: 'easeInOut',
    type: 'tween',
    duration: 0.2,
    delay: 0,
  },
  argTypes: animationArgTypes,
  render: (args) => (
    <SizeBox size={300}>
      <AnimationRotate {...args}>
        <GreyBox size={300} id="animation-content" asText>
          Rotate
        </GreyBox>
      </AnimationRotate>
    </SizeBox>
  ),
} satisfies Meta<typeof AnimationRotate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DoNotAnimateOnStart: Story = {
  play: async ({ canvasElement, step }) => {
    await step('Content is rendered when animateOnStart is false', async () => {
      await expect(within(canvasElement).getByTestId('animation-content')).toBeInTheDocument();
    });
  },
};

export const AnimateOnStart: Story = {
  args: {
    animateOnStart: true,
  },
  play: async ({ canvasElement, step }) => {
    await step('Content is rendered when animateOnStart is true', async () => {
      await expect(within(canvasElement).getByTestId('animation-content')).toBeInTheDocument();
    });
  },
};

export const ConditionFalseStillRenders: Story = {
  args: {
    condition: false,
  },
  play: async ({ canvasElement, step }) => {
    await step('Content is rendered when condition is false', async () => {
      await expect(within(canvasElement).getByTestId('animation-content')).toBeInTheDocument();
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
      await expect(within(canvasElement).getByTestId(String(args['data-testid']))).toBeInTheDocument();
      await expect(within(canvasElement).getByTestId(String(args['data-testid']))).toHaveClass(String(args.className));
    });
  },
};
