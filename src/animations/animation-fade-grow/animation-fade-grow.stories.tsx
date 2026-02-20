import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { animationArgTypes } from '@story/arg-types';
import { GreyBox } from '@story/placeholders/grey-box.component';
import { AnimationFadeGrow } from '@animations/animation-fade-grow';

const meta = {
  title: 'Animations/AnimationFadeGrow',
  component: AnimationFadeGrow,
  tags: ['autodocs'],
  args: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.2,
    delay: 0,
    name: 'animation-fade-grow',
    condition: true,
    flex: false,
    className: '',
  },
  argTypes: animationArgTypes,
  render: (args) => (
    <AnimationFadeGrow {...args}>
      <GreyBox id="animation-content">Fade grow</GreyBox>
    </AnimationFadeGrow>
  ),
} satisfies Meta<typeof AnimationFadeGrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VisibleWhenConditionTrue: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('animation-content')).toBeInTheDocument();
  },
};

export const HiddenWhenConditionFalse: Story = {
  args: {
    condition: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByTestId('animation-content')).toBeNull();
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
