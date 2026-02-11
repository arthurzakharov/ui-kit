import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { NotFound } from '@components/not-found/not-found.component';

const meta = {
  title: 'Components/NotFound',
  component: NotFound,
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
    className: '',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'NotFound',
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('not-found-title')).toHaveTextContent(args.title);
    await expect(canvas.getByTestId('not-found-subtitle')).toHaveTextContent(args.subtitle);
    await expect(canvas.getByTestId('not-found-table-title')).toHaveTextContent(args.tableTitle);
    const rows = canvas.getAllByTestId('not-found-row');
    await expect(rows).toHaveLength(args.tableRows.length);
  },
};

export const WithAdditionalClassName: Story = {
  args: {
    className: 'color-grey-950',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const notFound = canvas.getByTestId('not-found');
    await expect(notFound).toHaveClass(String(args.className));
  },
};
