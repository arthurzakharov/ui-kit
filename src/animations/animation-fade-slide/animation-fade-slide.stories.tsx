import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { AnimationFadeSlide } from '@animations/animation-fade-slide';
import { Text } from '@components/text/text.component';

const meta = {
  title: 'Animations/AnimationFadeSlide',
  component: AnimationFadeSlide,
  tags: ['autodocs'],
  args: {
    name: 'animation-fade-slide',
    condition: true,
    direction: 'ltr',
    ease: 'easeInOut',
    type: 'tween',
    duration: 0.125,
    delay: 0,
    className: '',
    children: null,
  },
  argTypes: {
    ease: {
      control: 'select',
      options: [
        'linear',
        'easeIn',
        'easeOut',
        'easeInOut',
        'circIn',
        'circOut',
        'circInOut',
        'backIn',
        'backOut',
        'backInOut',
        'anticipate',
      ],
    },
    type: { control: 'select', options: ['decay', 'spring', 'keyframes', 'tween', 'inertia'] },
    duration: { control: { type: 'number', min: 0, step: 0.05 } },
    delay: { control: { type: 'number', min: 0, step: 0.05 } },
  },
  render: (args) => (
    <AnimationFadeSlide {...args}>
      <div
        data-testid="animation-content"
        style={{
          height: '400px',
          backgroundColor: 'var(--rm-ui-grey-700)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text.Tag tag="h4" size="hl4" align="center" style={{ color: 'var(--rm-ui-grey-50)' }}>
          Fade slide
        </Text.Tag>
      </div>
    </AnimationFadeSlide>
  ),
} satisfies Meta<typeof AnimationFadeSlide>;

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
