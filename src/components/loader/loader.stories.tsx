import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Loader } from '@components/loader/loader.component';
import cn from '@components/loader/loader.module.css';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  args: {
    size: 'md',
    color: 'primary',
    className: '',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorPrimary: Story = {
  play: async ({ canvasElement }) => {
    const svg = within(canvasElement).getByTestId('loader-icon');
    await expect(svg).toHaveClass(cn.Primary);
  },
};

export const ColorWhite: Story = {
  args: {
    color: 'white',
  },
  render: (args) => (
    <div
      style={{
        backgroundColor: 'var(--rm-ui-grey-950)',
        padding: 'var(--rm-ui-padding-md)',
        borderRadius: 'var(--rm-ui-border-radius-md)',
        display: 'inline-flex',
      }}
    >
      <Loader {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const svg = within(canvasElement).getByTestId('loader-icon');
    await expect(svg).toHaveClass(cn.White);
  },
};

export const ColorSecondary: Story = {
  args: {
    color: 'secondary',
  },
  play: async ({ canvasElement }) => {
    const svg = within(canvasElement).getByTestId('loader-icon');
    await expect(svg).toHaveClass(cn.Secondary);
  },
};

export const SizeXXS: Story = {
  args: {
    size: 'xxs',
  },
  play: async ({ canvasElement }) => {
    const svg = within(canvasElement).getByTestId('loader-icon');
    await expect(svg).toHaveAttribute('width', '16');
    await expect(svg).toHaveAttribute('height', '16');
  },
};

export const SizeXS: Story = {
  args: {
    size: 'xs',
  },
  play: async ({ canvasElement }) => {
    const svg = within(canvasElement).getByTestId('loader-icon');
    await expect(svg).toHaveAttribute('width', '24');
    await expect(svg).toHaveAttribute('height', '24');
  },
};

export const SizeSM: Story = {
  args: {
    size: 'sm',
  },
  play: async ({ canvasElement }) => {
    const svg = within(canvasElement).getByTestId('loader-icon');
    await expect(svg).toHaveAttribute('width', '32');
    await expect(svg).toHaveAttribute('height', '32');
  },
};

export const SizeMD: Story = {
  args: {
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const svg = within(canvasElement).getByTestId('loader-icon');
    await expect(svg).toHaveAttribute('width', '40');
    await expect(svg).toHaveAttribute('height', '40');
  },
};

export const SizeLG: Story = {
  args: {
    size: 'lg',
  },
  play: async ({ canvasElement }) => {
    const svg = within(canvasElement).getByTestId('loader-icon');
    await expect(svg).toHaveAttribute('width', '48');
    await expect(svg).toHaveAttribute('height', '48');
  },
};

export const SizeXL: Story = {
  args: {
    size: 'xl',
  },
  play: async ({ canvasElement }) => {
    const svg = within(canvasElement).getByTestId('loader-icon');
    await expect(svg).toHaveAttribute('width', '56');
    await expect(svg).toHaveAttribute('height', '56');
  },
};

export const SizeXXL: Story = {
  args: {
    size: 'xxl',
  },
  play: async ({ canvasElement }) => {
    const svg = within(canvasElement).getByTestId('loader-icon');
    await expect(svg).toHaveAttribute('width', '64');
    await expect(svg).toHaveAttribute('height', '64');
  },
};

export const SizeXXXL: Story = {
  args: {
    size: 'xxxl',
  },
  play: async ({ canvasElement }) => {
    const svg = within(canvasElement).getByTestId('loader-icon');
    await expect(svg).toHaveAttribute('width', '72');
    await expect(svg).toHaveAttribute('height', '72');
  },
};

export const PaddingXXS: Story = {
  args: {
    padding: 'xxs',
  },
  play: async ({ canvasElement }) => {
    const loader = within(canvasElement).getByTestId('loader');
    await expect(loader).toHaveClass(cn.Padding);
    await expect(loader).toHaveClass(cn.XXS);
  },
};

export const PaddingXS: Story = {
  args: { padding: 'xs' },
  play: async ({ canvasElement }) => {
    const loader = within(canvasElement).getByTestId('loader');
    await expect(loader).toHaveClass(cn.Padding);
    await expect(loader).toHaveClass(cn.XS);
  },
};

export const PaddingSM: Story = {
  args: { padding: 'sm' },
  play: async ({ canvasElement }) => {
    const loader = within(canvasElement).getByTestId('loader');
    await expect(loader).toHaveClass(cn.Padding);
    await expect(loader).toHaveClass(cn.SM);
  },
};

export const PaddingMD: Story = {
  args: { padding: 'md' },
  play: async ({ canvasElement }) => {
    const loader = within(canvasElement).getByTestId('loader');
    await expect(loader).toHaveClass(cn.Padding);
    await expect(loader).toHaveClass(cn.MD);
  },
};

export const PaddingLG: Story = {
  args: { padding: 'lg' },
  play: async ({ canvasElement }) => {
    const loader = within(canvasElement).getByTestId('loader');
    await expect(loader).toHaveClass(cn.Padding);
    await expect(loader).toHaveClass(cn.LG);
  },
};

export const PaddingXL: Story = {
  args: { padding: 'xl' },
  play: async ({ canvasElement }) => {
    const loader = within(canvasElement).getByTestId('loader');
    await expect(loader).toHaveClass(cn.Padding);
    await expect(loader).toHaveClass(cn.XL);
  },
};

export const PaddingXXL: Story = {
  args: { padding: 'xxl' },
  play: async ({ canvasElement }) => {
    const loader = within(canvasElement).getByTestId('loader');
    await expect(loader).toHaveClass(cn.Padding);
    await expect(loader).toHaveClass(cn.XXL);
  },
};

export const PaddingXXXL: Story = {
  args: { padding: 'xxxl' },
  play: async ({ canvasElement }) => {
    const loader = within(canvasElement).getByTestId('loader');
    await expect(loader).toHaveClass(cn.Padding);
    await expect(loader).toHaveClass(cn.XXXL);
  },
};

export const WithAdditionalClassName: Story = {
  args: { className: 'stroke-grey-500' },
  play: async ({ args, canvasElement }) => {
    const loader = within(canvasElement).getByTestId('loader');
    await expect(loader).not.toHaveClass(cn.Padding);
    await expect(loader).toHaveClass(String(args.className));
  },
};
