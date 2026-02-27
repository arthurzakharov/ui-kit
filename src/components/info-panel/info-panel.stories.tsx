import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { InfoPanel } from '@components/info-panel/info-panel.component';

const meta = {
  title: 'Components/InfoPanel',
  component: InfoPanel,
  args: {
    data: [
      ['Material', '100% Baumwolle'],
      ['Passform', 'Regular Fit'],
      ['Pflege', '30 C Schonwaschgang'],
    ],
  },
  argTypes: {
    data: { control: false, description: 'The key-value pairs to display in the info panel.' },
  },
} satisfies Meta<typeof InfoPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'InfoPanel',
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByTestId('info-panel-list');
    const keys = canvas.getAllByTestId('info-panel-key');
    const values = canvas.getAllByTestId('info-panel-value');

    await expect(list.childNodes).toHaveLength(args.data.length);

    for (const [index, [key, value]] of (args.data || []).entries()) {
      await expect(keys[index]).toHaveTextContent(key);
      await expect(values[index]).toHaveTextContent(value);
    }
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'bg-color-grey-300',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const infoPanel = canvas.getByTestId('custom-test-id');

    await step('Then the info panel component has the custom test id', async () => {
      await expect(infoPanel).toBeInTheDocument();
    });

    await step('Then the info panel component has the custom class name', async () => {
      await expect(infoPanel).toHaveClass(String(args.className));
    });
  },
};
