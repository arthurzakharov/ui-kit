import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotFound } from '@components/not-found/not-found.component';

const meta = {
  title: 'Components/NotFound',
  component: NotFound,
  tags: ['autodocs'],
  args: {
    title: 'Entschuldigung, da ist wohl etwas schief gelaufen!',
    subtitle: 'Fehler 404',
    tableTitle: 'Bitte kontaktieren Sie uns doch per:',
    tableRows: [
      {
        key: 'E-Mail:',
        value: 'info@rightmart.de',
      },
      {
        key: 'Telefon:',
        value: '+49 (0)421 / 33 100 311',
      },
      {
        key: 'Fax:',
        value: '+49 (0)421 / 33 100 380',
      },
      {
        key: 'Post:',
        value: 'rightmart Rechtsanwaltsgesellschaft mbH<br />Clara-Jaschke-Straße 1<br />28199 Bremen',
      },
    ],
  },
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof NotFound>;

export const Default: Story = {
  name: 'Not Found',
};
