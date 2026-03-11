import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Caption } from '@controls/caption/caption.component';
import cn from '@controls/caption/caption.module.css';

const meta = {
  title: 'Controls/Primitives/Caption',
  component: Caption,
  args: {
    text: 'This <u>caption</u> is for field &trade;.',
    size: 'body',
    color: 'text-primary',
    checked: false,
    oneLine: false,
    // Base props
    className: '',
    'data-testid': '',
  },
} satisfies Meta<typeof Caption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Caption',
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const caption = canvas.getByTestId('caption');

    await step('Caption is rendered with correct content and class', async () => {
      await expect(caption).toBeInTheDocument();
      await expect(caption).toContainHTML(args.text);
      await expect(caption).toHaveClass(cn.Caption);

      switch (args.color) {
        case 'text-primary':
          await expect(caption).toHaveClass(cn.TextPrimary);
          break;
        case 'text-secondary':
          await expect(caption).toHaveClass(cn.TextSecondary);
          break;
        case 'accent-primary':
          await expect(caption).toHaveClass(cn.AccentPrimary);
          break;
        case 'accent-secondary':
          await expect(caption).toHaveClass(cn.AccentSecondary);
          break;
      }

      switch (args.size) {
        case 'body-extra-small':
          await expect(caption).toHaveClass(cn.BodyExtraSmall);
          break;
        case 'body-small':
          await expect(caption).toHaveClass(cn.BodySmall);
          break;
        case 'body':
          await expect(caption).toHaveClass(cn.Body);
          break;
        case 'body-large':
          await expect(caption).toHaveClass(cn.BodyLarge);
          break;
      }

      if (args.oneLine) {
        await expect(caption).toHaveClass(cn.OneLine);
      } else {
        await expect(caption).not.toHaveClass(cn.OneLine);
      }

      if (args.checked) {
        await expect(caption).toHaveClass(cn.Checked);
      } else {
        await expect(caption).not.toHaveClass(cn.Checked);
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
