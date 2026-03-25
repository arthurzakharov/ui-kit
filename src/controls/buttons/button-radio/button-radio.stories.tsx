import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
import { ButtonRadio } from '@controls/buttons/button-radio/button-radio.component';

const meta = {
  title: 'Controls/Buttons/ButtonRadio',
  component: ButtonRadio,
  args: {
    text: 'Tarif wählen',
    textSize: 'body',
    active: false,
    disabled: false,
    info: {
      text: '19,90 EUR',
      hintLeft: 'Monatlich',
      hintRight: 'inkl. MwSt.',
    },
    preventDefault: false,
    blurAfterClick: false,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
    // Base props
    className: '',
    'data-testid': '',
  },
} satisfies Meta<typeof ButtonRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ButtonRadio',
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