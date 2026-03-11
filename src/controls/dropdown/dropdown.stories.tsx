import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Dropdown } from '@controls/dropdown/dropdown.component';

const meta = {
  title: 'Controls/Dropdown',
  component: Dropdown,
  args: {
    label: 'Versicherung',
    placeholder: 'Bitte wählen',
    className: '',
    choices: [
      { value: 'aok', label: 'AOK' },
      { value: 'tk', label: 'Techniker Krankenkasse' },
      { value: 'barmer', label: 'BARMER' },
    ],
    value: [{ value: 'aok', label: 'AOK' }],
    onChange: () => {},
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBaseBehavior: Story = {
  args: {
    className: 'custom-class-name',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByTestId(String(args['data-testid']));

    await step('Component has the custom test id', async () => {
      await expect(component).toBeInTheDocument();
    });

    await step('Component has the custom class name', async () => {
      await expect(component).toHaveClass(String(args.className));
    });
  },
};