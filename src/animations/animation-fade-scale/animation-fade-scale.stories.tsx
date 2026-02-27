import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { animationArgTypes } from '@story/arg-types';
import { GreyBox } from '@story/placeholders/grey-box.component';
import { AnimationFadeScale } from '@animations/animation-fade-scale';

const meta = {
  title: 'Animations/AnimationFadeScale',
  component: AnimationFadeScale,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: 'animation-fade-scale',
    animateOnStart: false,
    condition: true,
    ease: 'easeInOut',
    type: 'tween',
    duration: 0.2,
    delay: 0,
  },
  argTypes: animationArgTypes,
  render: (args) => (
    <AnimationFadeScale {...args}>
      <GreyBox size={300} id="animation-content" asText>
        Fade scale
      </GreyBox>
    </AnimationFadeScale>
  ),
} satisfies Meta<typeof AnimationFadeScale>;

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

export const HiddenButMountedWhenKeepMount: Story = {
  args: {
    condition: false,
    keepMount: true,
  },
  play: async ({ canvasElement, step }) => {
    await step('Content is rendered when keepMount is true', async () => {
      await expect(within(canvasElement).getByTestId('animation-content')).toBeInTheDocument();
    });
  },
};

export const HiddenWhenConditionFalse: Story = {
  args: {
    condition: false,
  },
  play: async ({ canvasElement, step }) => {
    await step('Content is not rendered when condition is false', async () => {
      await expect(within(canvasElement).queryByTestId('animation-content')).toBeNull();
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
