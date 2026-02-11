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
    className: '',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'UserPanel',
  play: async ({ args, canvasElement }) => {
    const title = within(canvasElement).getByTestId('user-panel-title');
    const button = within(canvasElement).getByRole('button');
    await expect(button).toHaveTextContent(args.button);
    await expect(title).toHaveTextContent(args.title);

    for (const item of args.data) {
      await expect(within(canvasElement).getByText(item)).toBeInTheDocument();
    }

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenNthCalledWith(1);
  },
};

export const WithAdditionalClassName: Story = {
  args: {
    className: 'color-theme-primary',
  },
  play: async ({ args, canvasElement }) => {
    const userPanel = within(canvasElement).getByTestId('user-panel');
    await expect(userPanel).toHaveClass(String(args.className));
  },
};
