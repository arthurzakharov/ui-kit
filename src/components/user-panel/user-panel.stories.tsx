import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { UserPanel } from '@components/user-panel/user-panel.component';

const meta = {
  title: 'Components/UserPanel',
  component: UserPanel,
  args: {
    title: 'Profil',
    button: 'Bearbeiten',
    data: ['Max Mustermann', 'max@example.com', '+49 421 000000'],
    onClick: fn(),
  },
  argTypes: {
    title: { control: 'text', description: 'The title displayed at the top of the user panel.' },
    button: { control: 'text', description: 'The text displayed on the action button.' },
    data: { control: false, description: 'The user data items to display in the panel.' },
    onClick: { action: 'button-clicked', description: 'The callback function triggered when the button is clicked.' },
  },
} satisfies Meta<typeof UserPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'UserPanel',
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByTestId('user-panel-title');
    const button = canvas.getByRole('button');

    await step('Then the user panel displays the correct title', async () => {
      await expect(title).toHaveTextContent(args.title);
    });

    await step('Then the user panel displays the correct button text', async () => {
      await expect(button).toHaveTextContent(args.button);
    });

    await step('Then the user panel displays all data items', async () => {
      for (const item of args.data) {
        await expect(canvas.getByText(item)).toBeInTheDocument();
      }
    });

    await step('Then clicking the button triggers the onClick callback', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenNthCalledWith(1);
    });
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'color-theme-primary',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const userPanel = canvas.getByTestId('custom-test-id');

    await step('Then the user panel component has the custom test id', async () => {
      await expect(userPanel).toBeInTheDocument();
    });

    await step('Then the user panel component has the custom class name', async () => {
      await expect(userPanel).toHaveClass(String(args.className));
    });
  },
};
