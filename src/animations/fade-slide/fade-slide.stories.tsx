import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { GreyBox } from '@utils/story/grey-box/grey-box.component';
import { FadeSlide } from '@animations/fade-slide';

const meta = {
  title: 'Animations/FadeSlide',
  component: FadeSlide,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    direction: 'ltr',
    name: 'animation-fade-slide',
    animateOnStart: false,
    condition: true,
    ease: 'easeInOut',
    type: 'tween',
    duration: 0.2,
    delay: 0,
  },
  render: (args) => (
    <FadeSlide {...args}>
      <GreyBox size={300} data-testid="animation-content" asText>
        Fade slide
      </GreyBox>
    </FadeSlide>
  ),
} satisfies Meta<typeof FadeSlide>;

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
      await expect(within(canvasElement).getByTestId(String(args['data-testid']))).toHaveClass(String(args.className));
    });
  },
};
