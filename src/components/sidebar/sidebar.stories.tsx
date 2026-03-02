import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Sidebar } from '@components/sidebar/sidebar.component';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  args: {
    isButtonVisible: false,
    isUserOpen: false,
    title: 'Ihre Übersicht',
    steps: [
      { state: 'success', text: 'Persönliche Daten' },
      { state: 'error', text: 'Vertragsdetails' },
      { state: 'idle', text: 'Bestätigung' },
    ],
    info: [
      ['Laufzeit', '24 Monate'],
      ['Monatsrate', '39,99 €'],
    ],
    user: {
      title: 'Max Mustermann',
      button: 'Bearbeiten',
      data: ['max@example.com', '+49 123 456789'],
      onClick: () => undefined,
    },
    certifications: ['free', 'gdpr', 'ssl'],
  },
  argTypes: {
    title: { control: 'text', description: 'Sidebar title text.' },
    isButtonVisible: { control: 'boolean', description: 'Toggles visibility of the action area.' },
    isUserOpen: { control: 'boolean', description: 'Toggles visibility of the user panel area.' },
    steps: { control: false, description: 'Step list to render in the progress section.' },
    info: { control: false, description: 'Key-value rows to render in the info section.' },
    user: { control: false, description: 'Props passed to UserPanel.' },
    certifications: { control: false, description: 'Certification icon keys.' },
    children: { control: false, description: 'Content rendered in the action area.' },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Sidebar',
  render: (args) => (
    <Sidebar {...args}>
      <button data-testid="sidebar-action" type="button">
        Weiter
      </button>
    </Sidebar>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Then the sidebar title and static sections are rendered', async () => {
      await expect(canvas.getByText(String(args.title))).toBeInTheDocument();
      await expect(canvas.getAllByTestId('sidebar-step')).toHaveLength(args.steps.length);
      await expect(canvas.getAllByTestId('sidebar-info-row')).toHaveLength(args.info.length);
      await expect(canvas.getAllByTestId('certifications-icon')).toHaveLength(args.certifications.length);
    });

    await step('Then the optional user panel and action area are hidden by default', async () => {
      await expect(canvas.queryByTestId('user-panel')).toBeNull();
      await expect(canvas.queryByTestId('sidebar-action')).toBeNull();
    });
  },
};

export const WithUserPanel: Story = {
  args: {
    isUserOpen: true,
  },
  render: (args) => (
    <Sidebar {...args}>
      <button data-testid="sidebar-action" type="button">
        Weiter
      </button>
    </Sidebar>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Then the user panel is rendered when isUserOpen is true', async () => {
      await expect(canvas.getByTestId('user-panel')).toBeInTheDocument();
      await expect(canvas.getByTestId('user-panel-title')).toBeInTheDocument();
    });
  },
};

export const WithActionArea: Story = {
  args: {
    isButtonVisible: true,
  },
  render: (args) => (
    <Sidebar {...args}>
      <button data-testid="sidebar-action" type="button">
        Weiter
      </button>
    </Sidebar>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Then the action area content is rendered when isButtonVisible is true', async () => {
      await expect(canvas.getByTestId('sidebar-action')).toBeInTheDocument();
    });
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'bg-color-grey-300',
    'data-testid': 'custom-test-id',
  },
  render: (args) => (
    <Sidebar {...args}>
      <button data-testid="sidebar-action" type="button">
        Weiter
      </button>
    </Sidebar>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByTestId('custom-test-id');

    await step('Then the sidebar has the custom test id', async () => {
      await expect(sidebar).toBeInTheDocument();
    });

    await step('Then the sidebar has the custom class name', async () => {
      await expect(sidebar).toHaveClass(String(args.className));
    });
  },
};
