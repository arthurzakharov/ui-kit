import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { FontAlignArgType } from '@story/arg-types';
import { DataProtectedLabel } from '@components/data-protected-label/data-protected-label.component';

const meta = {
  title: 'Components/DataProtectedLabel',
  component: DataProtectedLabel,
  argTypes: {
    align: FontAlignArgType(),
  },
} satisfies Meta<typeof DataProtectedLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'DataProtectedLabel',
  play: async ({ canvasElement, step }) => {
    await step('Then the data protected label displays the icon in default position', async () => {
      await expect(within(canvasElement).getByTestId('data-protected-label-icon')).toBeInTheDocument();
    });
    await step('Then the data protected label displays the default text', async () => {
      await expect(within(canvasElement).getByTestId('data-protected-label-text')).toHaveTextContent(
        'Höchste Datensicherheit',
      );
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
