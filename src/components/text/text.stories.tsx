import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import {
  FontAlignArgType,
  FontColorArgType,
  FontSizeArgType,
  FontWeightArgType,
  TagArgType,
  TextPresetArgType,
} from '@story/arg-types';
import { Text } from '@components/text/text.component';

const meta = {
  title: 'Components/Text',
  component: Text,
  args: {
    tag: 'p',
    align: 'left',
    weight: 'regular',
    size: 'body',
    color: 'text-primary',
    lined: false,
    preset: undefined,
  },
  argTypes: {
    preset: TextPresetArgType({ description: 'Applies predefined typography settings (tag, weight, size, color).' }),
    tag: TagArgType({ description: 'The HTML tag to render. Ignored when preset is set.' }),
    lined: { control: 'boolean', description: 'Adds line-clamp/truncation styling.' },
    align: FontAlignArgType({ description: 'Horizontal text alignment.' }),
    weight: FontWeightArgType({ description: 'Font weight. Ignored when preset is set.' }),
    size: FontSizeArgType({ description: 'Font size. Ignored when preset is set.' }),
    color: FontColorArgType({ description: 'Font color. Ignored when preset is set.' }),
  },
  render: (args) => <Text {...args}>Sample text content</Text>,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Text',
};

export const WithPreset: Story = {
  args: {
    preset: 'page-title',
    children: 'Title rendered from preset',
  },
};

export const WithBaseBehavior: Story = {
  args: {
    children: 'Text with custom base props',
    className: 'custom-class-name',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByTestId(String(args['data-testid']));

    await step('Then the text has the custom test id', async () => {
      await expect(text).toBeInTheDocument();
    });

    await step('Then the text has the custom class name', async () => {
      await expect(text).toHaveClass(String(args.className));
    });
  },
};
