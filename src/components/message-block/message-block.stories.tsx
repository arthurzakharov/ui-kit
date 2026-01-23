import type { Meta, StoryObj } from '@storybook/react-vite';
import { MessageBlock } from '@components/message-block/message-block.component';

const meta = {
  title: 'Components/MessageBlock',
  component: MessageBlock,
  tags: ['autodocs'],
  args: {
    emoji: '🎉',
    title: 'Vielen Dank, es sieht gut aus',
    subtitle: 'Gleich erhalten Sie Ihr Ergebnis!',
  },
  render: (args) => (
    <MessageBlock {...args}>
      <p>Ihr Anliegen ist uns wichtig, daher werden wir Ihre anfrage umgehend bearbeiten.</p>
      <p>
        Ein Experte wird sich zeitnah telefoisch bei Ihnen melden, Ihnen sagen, ob die Chancen für Sie gut stehen und
        alle weiteren Schritte mit Ihnen besprechen. Und das Beste: <b>Das Gespräch ist völlig kostenlos!</b>
      </p>
      <p>
        Mit freundlichen Grüßen
        <br />
        Ihr Passexperten Team
      </p>
    </MessageBlock>
  ),
} satisfies Meta<typeof MessageBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAllParameters: Story = {};

export const WithoutEmoji: Story = {
  args: {
    emoji: '',
  },
};

export const WithoutEmojiAndTitle: Story = {
  args: {
    emoji: '',
    title: '',
  },
};

export const WithoutEmojiAndSubtitle: Story = {
  args: {
    emoji: '',
    subtitle: '',
  },
};

export const WithoutTitleAndSubtitle: Story = {
  args: {
    title: '',
    subtitle: '',
  },
};
