import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Choice } from '@controls/primitives';
import cn from '@controls/primitives/choice/choice.module.css';

const meta = {
  title: 'Controls/Primitives/Choice',
  component: Choice,
  args: {
    type: 'radio',
    checked: false,
    state: 'idle',
    size: 'md',
    focused: false,
    hovered: false,
    disabled: false,
    // Base props
    className: '',
    'data-testid': '',
  },
} satisfies Meta<typeof Choice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeRadio: Story = {
  args: {
    type: 'radio',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const choice = canvas.getByTestId('choice');
    const radio = canvas.getByTestId('choice-radio');

    await step('Then the control choice should have the radio class and content', async () => {
      await expect(choice).toBeInTheDocument();
      await expect(radio).toBeInTheDocument();
      await expect(choice).toHaveClass(cn.Radio);
    });

    await step('Check boolean state classes', async () => {
      if (args.focused) {
        await expect(choice).toHaveClass(cn.Focused);
      } else {
        await expect(choice).not.toHaveClass(cn.Focused);
      }

      if (args.hovered) {
        await expect(choice).toHaveClass(cn.Hovered);
      } else {
        await expect(choice).not.toHaveClass(cn.Hovered);
      }

      if (args.disabled) {
        await expect(choice).toHaveClass(cn.Disabled);
      } else {
        await expect(choice).not.toHaveClass(cn.Disabled);
      }
    });

    await step('Check size classes', async () => {
      switch (args.size) {
        case 'xxs':
          await expect(choice).toHaveClass(cn.XXS);
          break;
        case 'xs':
          await expect(choice).toHaveClass(cn.XS);
          break;
        case 'sm':
          await expect(choice).toHaveClass(cn.SM);
          break;
        case 'md':
          await expect(choice).toHaveClass(cn.MD);
          break;
        case 'lg':
          await expect(choice).toHaveClass(cn.LG);
          break;
        case 'xl':
          await expect(choice).toHaveClass(cn.XL);
          break;
        case 'xxl':
          await expect(choice).toHaveClass(cn.XXL);
          break;
        case 'xxxl':
          await expect(choice).toHaveClass(cn.XXXL);
          break;
      }
    });

    await step('Check state classes', async () => {
      switch (args.state) {
        case 'idle':
          await expect(choice).toHaveClass(cn.Idle);
          break;
        case 'error':
          await expect(choice).toHaveClass(cn.Error);
          break;
        case 'success':
          await expect(choice).toHaveClass(cn.Success);
          break;
      }
    });
  },
};

export const TypeCheckbox: Story = {
  args: {
    type: 'checkbox',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const choice = canvas.getByTestId('choice');
    const checkbox = canvas.getByTestId('choice-checkbox');

    await step('Then the control choice should have the checkbox class and content', async () => {
      await expect(choice).toBeInTheDocument();
      await expect(checkbox).toBeInTheDocument();
      await expect(choice).toHaveClass(cn.Checkbox);
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
