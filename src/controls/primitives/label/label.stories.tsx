import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Label } from '@controls/primitives';
import cn from '@controls/primitives/label/label.module.css';

const meta = {
  title: 'Controls/Primitives/Label',
  component: Label,
  args: {
    text: 'This <u>field</u> is label &trade;.',
    state: 'idle',
    position: 'idle',
    // Base props
    className: '',
    'data-testid': '',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Label',
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByTestId('label');

    await step('Label is rendered with correct content and classes', async () => {
      await expect(label).toBeInTheDocument();
      await expect(label).toContainHTML(args.text);

      switch (args.position) {
        case 'idle':
          await expect(label).toHaveClass(cn.Idle);
          break;
        case 'active':
          await expect(label).toHaveClass(cn.Active);
          break;
      }

      switch (args.state) {
        case 'idle':
          await expect(label).toHaveClass(cn.Idle);
          break;
        case 'error':
          await expect(label).toHaveClass(cn.Error);
          break;
        case 'success':
          await expect(label).toHaveClass(cn.Success);
          break;
      }
    });
  },
};

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
