import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Loader } from '@components/loader/loader.component';
import { LoaderColorArgType, SizeArgType } from '@story/arg-types';
import cn from '@components/loader/loader.module.css';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  args: {
    color: 'accent-primary',
    size: 'lg',
    padding: 'sm',
  },
  argTypes: {
    color: LoaderColorArgType(),
    size: SizeArgType(),
    padding: SizeArgType({
      description: 'The padding around the loader. If not provided, no padding will be applied.',
    }),
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CustomSize: Story = {
  args: {
    size: 'lg',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const loaderIcon = canvas.getByTestId('loader-icon');

    await step('Loader has the custom size', async () => {
      await expect(loaderIcon).toHaveAttribute('width', '48');
      await expect(loaderIcon).toHaveAttribute('height', '48');
    });
  },
};

export const CustomColor: Story = {
  args: {
    color: 'accent-secondary',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const loaderIcon = canvas.getByTestId('loader-icon');

    await step('Loader has the custom color', async () => {
      await expect(loaderIcon).toHaveClass(cn.AccentSecondary);
    });
  },
};

export const WithPadding: Story = {
  args: { padding: 'md' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const loader = canvas.getByTestId('loader');

    await step('Loader has padding since padding is defined', async () => {
      await expect(loader).toHaveClass(cn.Padding);
      await expect(loader).toHaveClass(cn.MD);
    });
  },
};

export const WithBaseBehavior: Story = {
  args: { padding: undefined, className: 'stroke-grey-500', 'data-testid': 'custom-test-id' },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const loader = canvas.getByTestId('custom-test-id');

    await step('Loader has no padding since padding is undefined', async () => {
      await expect(loader).not.toHaveClass(cn.Padding);
    });

    await step('Then the loader has the custom test id', async () => {
      await expect(loader).toBeInTheDocument();
    });

    await step('Then the loader has the custom class name', async () => {
      await expect(loader).toHaveClass(String(args.className));
    });
  },
};
