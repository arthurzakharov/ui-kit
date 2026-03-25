import { ArrowRight } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
import { ButtonText } from '@controls/buttons';

const meta = {
  title: 'Controls/Buttons/ButtonText',
  component: ButtonText,
  args: {
    text: 'Button Text',
    color: 'text-primary',
    size: 'md',
    type: 'button',
    weight: 'medium',
    icon: <ArrowRight />,
    iconPosition: 'left',
    underlined: false,
    disabled: false,
    preventDefault: false,
    blurAfterClick: false,
    className: '',
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof ButtonText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ButtonText'
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