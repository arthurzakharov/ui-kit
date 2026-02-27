import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { MessageBlock } from '@components/message-block/message-block.component';

const meta = {
  title: 'Components/MessageBlock',
  component: MessageBlock,
  args: {
    emoji: '✨',
    title: 'Welcome',
    subtitle: 'This is a message block component',
    children: 'This is the content of the message block. It can contain any child elements.',
  },
  argTypes: {
    emoji: { control: 'text', description: 'Optional emoji to display at the top.' },
    title: { control: 'text', description: 'Optional title text.' },
    subtitle: { control: 'text', description: 'Optional subtitle text.' },
    children: { control: 'text', description: 'Content to display in the message block.' },
  },
} satisfies Meta<typeof MessageBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'MessageBlock',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByTestId('message-block-title');
    const subtitle = canvas.getByTestId('message-block-subtitle');
    const content = canvas.getByTestId('message-block-content');
    const emoji = canvas.getByTestId('message-block-emoji');
    const messageBlock = canvas.getByTestId('message-block');

    await step('Then the message block component displays the correct content', async () => {
      await expect(messageBlock).toBeInTheDocument();
      await expect(title).toBeInTheDocument();
      await expect(subtitle).toBeInTheDocument();
      await expect(content).toBeInTheDocument();
      await expect(emoji).toBeInTheDocument();
    });
  },
};

export const WithoutTitleAndSubtitle: Story = {
  args: {
    title: undefined,
    subtitle: undefined,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const titles = canvas.queryByTestId('message-block-titles');

    await step('Then the message block displays not titles section', async () => {
      await expect(titles).toBeNull();
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
