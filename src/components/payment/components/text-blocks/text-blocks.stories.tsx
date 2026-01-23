import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextBlocks } from '@components/payment/components/text-blocks/text-blocks.component';

const meta = {
  title: 'Components/Payment/TextBlocks',
  component: TextBlocks,
  tags: ['autodocs'],
} satisfies Meta<typeof TextBlocks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleBlocks: Story = {
  args: {
    blocks: [
      {
        title: 'Warum benötigen wir eine Vorauszahlung?',
        text: 'Lorem ipsum <b>dolor sit</b> amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ',
      },
      {
        title: 'Haben Sie Fragen?',
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      },
    ],
  },
};

export const BlocksWithPlaceholders: Story = {
  args: {
    blocks: [
      {
        title: 'Warum benötigen wir 1-title eine Vorauszahlung?',
        text: 'Lorem ipsum <b>dolor sit</b> amet, consectetuer 1-title adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ',
        placeholders: {
          '1-title': () => '[INSERTED]',
        },
      },
      {
        title: 'Haben Sie 1-text Fragen?',
        text: 'Lorem ipsum 1-text dolor sit amet, consectetuer adipiscing elit.',
        placeholders: {
          '1-text': () => '[INSERTED]',
        },
      },
    ],
  },
};
