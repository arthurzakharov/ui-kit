import { PhoneCall } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Svg } from '@utils/svg/svg.component';

const meta = {
  title: 'Utils/Svg',
  component: Svg,
  render: (args) => <Svg data-testid="svg" {...args} />,
  tags: ['autodocs'],
} satisfies Meta<typeof Svg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SvgWithClassName: Story = {
  args: {
    icon: <PhoneCall className="stroke-grey-500" />,
    className: 'test-class',
  },
  play: async ({ canvasElement }) => {
    const icon = within(canvasElement).getByTestId('svg');
    await expect(Array.from(icon.classList)).toEqual(['lucide', 'lucide-phone-call', 'test-class', 'stroke-grey-500']);
  },
};

export const SvgWithoutClassName: Story = {
  args: {
    icon: <PhoneCall />,
    className: 'test-class',
  },
  play: async ({ canvasElement }) => {
    const icon = within(canvasElement).getByTestId('svg');
    await expect(Array.from(icon.classList)).toEqual(['lucide', 'lucide-phone-call', 'test-class']);
  },
};

export const WithAdditionalClassName: Story = {
  args: {
    icon: <PhoneCall />,
    className: 'stroke-success',
  },
  play: async ({ args, canvasElement }) => {
    const icon = within(canvasElement).getByTestId('svg');
    await expect(Array.from(icon.classList)).toEqual(['lucide', 'lucide-phone-call', String(args.className)]);
  },
};

export const SvgIsNotPassed: Story = {
  args: {
    icon: null,
    className: '',
  },
  play: async ({ canvasElement }) => {
    const icon = canvasElement.firstChild;
    await expect(icon).toBeNull();
  },
};
