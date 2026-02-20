import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { animationArgTypes } from '@story/arg-types';
import { GreyBox } from '@story/placeholders/grey-box.component';
import { AnimationFadeScale } from '@animations/animation-fade-scale';

const meta = {
  title: 'Animations/AnimationFadeScale',
  component: AnimationFadeScale,
  tags: ['autodocs'],
  args: {
    name: 'animation-fade-scale',
    condition: true,
    ease: 'easeInOut',
    type: 'tween',
    duration: 0.15,
    delay: 0,
    className: '',
    children: null,
  },
  argTypes: animationArgTypes,
  render: (args) => (
    <AnimationFadeScale {...args}>
      <GreyBox id="animation-content">Fade scale</GreyBox>
    </AnimationFadeScale>
  ),
} satisfies Meta<typeof AnimationFadeScale>;

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
