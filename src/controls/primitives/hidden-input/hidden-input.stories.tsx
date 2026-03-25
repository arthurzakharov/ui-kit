import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect, fn, fireEvent } from 'storybook/test';
import { HiddenInput } from '@controls/primitives/hidden-input/hidden-input.component';

const meta = {
  title: 'Controls/Primitives/HiddenInput',
  component: HiddenInput,
  args: {
    type: 'radio',
    id: 'hidden-input',
    name: 'abc-selection',
    value: 'value-a',
    disabled: false,
    checked: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    // Base props
    className: '',
    'data-testid': '',
  },
} satisfies Meta<typeof HiddenInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'HiddenInput',
  play: async ({ args, canvasElement, step, userEvent }) => {
    const canvas = within(canvasElement);
    const hiddenInput = canvas.getByTestId('hidden-input');

    await step('Component is rendered with correct attributes', async () => {
      await expect(hiddenInput).toBeInTheDocument();
      await expect(hiddenInput).toHaveAttribute('type', args.type);
      await expect(hiddenInput).toHaveAttribute('id', args.id);
      await expect(hiddenInput).toHaveAttribute('name', args.name);
      await expect(hiddenInput).toHaveAttribute('value', args.value);
      if (args.disabled) {
        await expect(hiddenInput).toBeDisabled();
      } else {
        await expect(hiddenInput).not.toBeDisabled();
      }
    });

    await step('Focus and blur events are triggered callbacks are called', async () => {
      await userEvent.tab();
      await userEvent.tab();
      await expect(args.onFocus).toHaveBeenCalledTimes(1);
      await expect(args.onBlur).toHaveBeenCalledTimes(1);
    });

    await step('Change event is triggered on keyboard interaction. Blur is not happening ', async () => {
      await userEvent.click(hiddenInput);
      const onChangeEvent = expect.objectContaining({ target: hiddenInput, type: 'change' });
      await expect(args.onChange).toHaveBeenCalledTimes(1);
      await expect(args.onChange).toHaveBeenCalledWith(onChangeEvent, 'keyboard');
      await expect(hiddenInput).toHaveFocus();
      await userEvent.click(canvasElement);
      await expect(args.onFocus).toHaveBeenCalledTimes(2);
      await expect(args.onBlur).toHaveBeenCalledTimes(2);
      await expect(hiddenInput).not.toHaveFocus();
    });

    await step('Change event is triggered on mocked mouse interaction. Focus and blur are not called', async () => {
      await fireEvent.click(hiddenInput, { clientX: 100, clientY: 100 });
      const onChangeEvent = expect.objectContaining({ target: hiddenInput, type: 'change' });
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(args.onChange).toHaveBeenCalledWith(onChangeEvent, 'mouse');
      await expect(args.onBlur).toHaveBeenCalledTimes(2);
      await expect(args.onFocus).toHaveBeenCalledTimes(2);
      await expect(hiddenInput).not.toHaveFocus();
    });
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvasElement, step, userEvent }) => {
    const canvas = within(canvasElement);
    const hiddenInput = canvas.getByTestId('hidden-input');

    await step('Component is disabled, click does not trigger onChange', async () => {
      await userEvent.click(hiddenInput);
      await expect(args.onChange).not.toBeCalled();
      await expect(hiddenInput).toBeDisabled();
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
