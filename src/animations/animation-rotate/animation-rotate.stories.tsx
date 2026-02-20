import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { AnimationRotate } from '@animations/animation-rotate';
import { Text } from '@components/text/text.component';

const meta = {
  title: 'Animations/AnimationRotate',
  component: AnimationRotate,
  tags: ['autodocs'],
  args: {
    name: 'animation-rotate',
    condition: true,
    from: 'left',
    to: 'top',
    ease: 'easeInOut',
    type: 'tween',
    duration: 0.15,
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
    <AnimationRotate {...args}>
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
          Rotate
        </Text.Tag>
      </div>
    </AnimationRotate>
  ),
} satisfies Meta<typeof AnimationRotate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
