import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { MessageTypeArgType } from '@story/arg-types';
import { Message } from '@components/message/message.component';

const meta = {
  title: 'Components/Message',
  component: Message,
  argTypes: {
    type: MessageTypeArgType(),
    title: { control: 'text', description: 'The title of the message. Can include `HTML`.' },
    text: { control: 'text', description: 'The content text of the message. Can include `HTML`.' },
  },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    title: (
      <>
        Alles <u>klar!</u>
      </>
    ),
    text: (
      <>
        Ihre Änderungen <b>wurden</b> gespeichert.
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('message-title')).toContainHTML('Alles <u>klar!</u>');
    await expect(canvas.getByTestId('message-text')).toContainHTML('Ihre Änderungen <b>wurden</b> gespeichert.');
    await expect(canvas.getByTestId('success-icon')).toBeInTheDocument();
  },
};

export const Question: Story = {
  args: {
    type: 'question',
    title: 'Eine Frage',
    text: 'Möchten Sie fortfahren?',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('message-title')).toHaveTextContent(String(args.title));
    await expect(canvas.getByTestId('message-text')).toHaveTextContent(String(args.text));
    await expect(canvas.getByTestId('question-icon')).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Fehler',
    text: 'Etwas ist schief gelaufen.',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('message-title')).toHaveTextContent(String(args.title));
    await expect(canvas.getByTestId('message-text')).toHaveTextContent(String(args.text));
    await expect(canvas.getByTestId('error-icon')).toBeInTheDocument();
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Hinweis',
    text: 'Bitte beachten Sie die aktuellen Öffnungszeiten.',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('message-title')).toHaveTextContent(String(args.title));
    await expect(canvas.getByTestId('message-text')).toHaveTextContent(String(args.text));
    await expect(canvas.getByTestId('info-icon')).toBeInTheDocument();
  },
};

export const WithBaseBehavior: Story = {
  args: {
    type: 'info',
    title: 'Hinweis',
    text: 'Bitte beachten Sie die aktuellen Öffnungszeiten.',
    className: 'bg-color-grey-300',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const message = canvas.getByTestId('custom-test-id');

    await step('Then the message component has the custom test id', async () => {
      await expect(message).toBeInTheDocument();
    });

    await step('Then the message component has the custom class name', async () => {
      await expect(message).toHaveClass(String(args.className));
    });
  },
};
