import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Loader } from './loader.component';

const meta = {
  title: 'Loader',
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

const getSvg = (canvasElement: HTMLElement) => canvasElement.querySelector('svg');

export const ColorPrimary: Story = {
  play: async ({ canvasElement }) => {
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
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
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
  },
};

export const ColorSecondary: Story = {
  args: {
    color: 'secondary',
  },
  play: async ({ canvasElement }) => {
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
  },
};

export const SizeXXS: Story = {
  args: {
    size: 'xxs',
  },
  play: async ({ canvasElement }) => {
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('width', '16');
    await expect(svg).toHaveAttribute('height', '16');
  },
};

export const SizeXS: Story = {
  args: {
    size: 'xs',
  },
  play: async ({ canvasElement }) => {
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('width', '24');
    await expect(svg).toHaveAttribute('height', '24');
  },
};

export const SizeSM: Story = {
  args: {
    size: 'sm',
  },
  play: async ({ canvasElement }) => {
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('width', '32');
    await expect(svg).toHaveAttribute('height', '32');
  },
};

export const SizeMD: Story = {
  args: {
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('width', '40');
    await expect(svg).toHaveAttribute('height', '40');
  },
};

export const SizeLG: Story = {
  args: {
    size: 'lg',
  },
  play: async ({ canvasElement }) => {
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('width', '48');
    await expect(svg).toHaveAttribute('height', '48');
  },
};

export const SizeXL: Story = {
  args: {
    size: 'xl',
  },
  play: async ({ canvasElement }) => {
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('width', '56');
    await expect(svg).toHaveAttribute('height', '56');
  },
};

export const SizeXXL: Story = {
  args: {
    size: 'xxl',
  },
  play: async ({ canvasElement }) => {
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('width', '64');
    await expect(svg).toHaveAttribute('height', '64');
  },
};

export const SizeXXXL: Story = {
  args: {
    size: 'xxxl',
  },
  play: async ({ canvasElement }) => {
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute('width', '72');
    await expect(svg).toHaveAttribute('height', '72');
  },
};

export const WithAdditionalClassName: Story = {
  args: {
    className: 'stroke-grey-500',
  },
  play: async ({ args, canvasElement }) => {
    const svg = getSvg(canvasElement);
    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveClass(String(args.className));
  },
};
