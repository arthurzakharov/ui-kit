import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
import { CakeIcon } from 'lucide-react';
import { ButtonCard } from '@controls/buttons';

const meta = {
  title: 'Controls/Buttons/ButtonCard',
  component: ButtonCard,
  args: {
    text: 'Option A',
    textSize: 'body',
    icon: <CakeIcon />,
    iconPosition: 'top',
    active: false,
    disabled: false,
    preventDefault: false,
    blurAfterClick: false,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
    // Base props
    className: '',
    'data-testid': '',
  },
} satisfies Meta<typeof ButtonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ButtonCard',
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
