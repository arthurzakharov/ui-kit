import type { Meta, StoryObj } from '@storybook/react-vite';
import { Control } from '../../../../main';

const meta = {
  title: 'Components/Control/RadioText',
  component: Control.RadioText,
  tags: ['autodocs'],
  args: {
    children: 'Radio text content',
    size: 'md',
    oneLine: false,
    checked: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg'],
    },
    oneLine: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Control.RadioText>;

export default meta;
type Story = StoryObj<typeof Control.RadioText>;

export const DefaultValues: Story = {
  args: {
    oneLine: undefined,
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const OneLine: Story = {
  args: {
    oneLine: true,
  },
};

export const WithHtmlContent: Story = {
  args: {
    children: 'Text with <b>bold</b> content',
  },
};
