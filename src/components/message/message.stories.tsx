import type { Meta, StoryObj } from '@storybook/react-vite';
import { MaxWidth } from '../../storybook/decorators/max-width';
import { Message } from './message.component';

const meta = {
  title: 'Components/Message',
  component: Message,
  tags: ['autodocs'],
  decorators: [MaxWidth(590)],
  args: {
    type: 'info',
    title: () => <>Das ist ein Headline</>,
    text: () => <>Lorem ipsum dolor sit amet, consec tetuer adipiscing elit. </>,
  },
  argTypes: {
    type: {
      control: 'select',
    },
  },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
  },
};

export const Question: Story = {
  args: {
    type: 'question',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
  },
};
