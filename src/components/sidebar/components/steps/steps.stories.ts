import type { Meta, StoryObj } from '@storybook/react-vite';
import { Steps } from '@components/sidebar/components/steps/steps.component';

const meta = {
  title: 'Components/Sidebar/Steps',
  component: Steps,
  tags: ['autodocs'],
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStates: Story = {
  args: {
    data: [
      {
        state: 'success',
        text: 'Step One state with some content',
      },
      {
        state: 'error',
        text: 'Step Two state with some content',
      },
      {
        state: 'idle',
        text: 'Step Three state with some content',
      },
    ],
  },
};

export const AllInIdleState: Story = {
  args: {
    data: [
      {
        state: 'idle',
        text: 'Step One state with some content',
      },
      {
        state: 'idle',
        text: 'Step Two state with some content',
      },
      {
        state: 'idle',
        text: 'Step Three state with some content',
      },
    ],
  },
};

export const AllInSuccessState: Story = {
  args: {
    data: [
      {
        state: 'success',
        text: 'Step One state with some content',
      },
      {
        state: 'success',
        text: 'Step Two state with some content',
      },
      {
        state: 'success',
        text: 'Step Three state with some content',
      },
    ],
  },
};

export const AllInErrorState: Story = {
  args: {
    data: [
      {
        state: 'error',
        text: 'Step One state with some content',
      },
      {
        state: 'error',
        text: 'Step Two state with some content',
      },
      {
        state: 'error',
        text: 'Step Three state with some content',
      },
    ],
  },
};
