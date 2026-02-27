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
  },
  argTypes: {
    title: { control: 'text', description: 'The main title displayed in the **NotFound** component.' },
    subtitle: { control: 'text', description: 'The subtitle displayed in the **NotFound** component.' },
    tableTitle: { control: 'text', description: 'The title of the contact information table.' },
    tableRows: { control: false, description: 'The rows of the contact information table.' },
  },
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'NotFound',
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByTestId('not-found-title');
    const subtitle = canvas.getByTestId('not-found-subtitle');
    const tableTitle = canvas.getByTestId('not-found-table-title');
    const rows = canvas.getAllByTestId('not-found-row');

    await step('Then the not found component displays the correct content', async () => {
      await expect(title).toHaveTextContent(args.title);
      await expect(subtitle).toHaveTextContent(args.subtitle);
      await expect(tableTitle).toHaveTextContent(args.tableTitle);
      await expect(rows).toHaveLength(args.tableRows.length);
    });
  },
};

export const WithAdditionalClassName: Story = {
  args: {
    className: 'color-grey-950',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const notFound = canvas.getByTestId('custom-test-id');

    await step('Then the not found component has the custom test id', async () => {
      await expect(notFound).toBeInTheDocument();
    });

    await step('Then the not found component has the custom class name', async () => {
      await expect(notFound).toHaveClass(String(args.className));
    });
  },
};
