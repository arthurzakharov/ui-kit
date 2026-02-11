import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Content } from '@utils/content/content.component';

const meta = {
  title: 'Utils/Content',
  component: Content,
  args: {
    id: 'content',
    tag: 'div',
    alwaysRender: false,
    children: 'Inline content',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HtmlString: Story = {
  args: {
    id: 'content-html',
    children: '<b>Bold</b> and <i>italic</i> text',
  },
  play: async ({ args, canvasElement }) => {
    const el = canvasElement.querySelector(`#${args.id}`);
    await expect(el).toBeInTheDocument();
    await expect(el).toContainHTML(String(args.children));
  },
};

export const PlainString: Story = {
  args: {
    id: 'content-html',
    children: 'Bold and italic text',
  },
  play: async ({ args, canvasElement }) => {
    const el = canvasElement.querySelector(`#${args.id}`);
    await expect(el).toBeInTheDocument();
    await expect(el).toContainHTML(String(args.children));
  },
};

export const ReactNode: Story = {
  args: {
    id: 'content-html',
    children: (
      <span>
        <b>Bold</b> and <i>italic</i> text
      </span>
    ),
  },
  play: async ({ args, canvasElement }) => {
    const el = canvasElement.querySelector(`#${args.id}`);
    await expect(el).toBeInTheDocument();
    await expect(el).toContainHTML('<span><b>Bold</b> and <i>italic</i> text</span>');
  },
};

export const EmptyStringAlwaysRender: Story = {
  args: {
    id: 'content-html',
    alwaysRender: true,
    children: '',
  },
  play: async ({ args, canvasElement }) => {
    const el = canvasElement.querySelector(`#${args.id}`);
    await expect(el).toBeEmptyDOMElement();
  },
};

export const EmptyString: Story = {
  args: {
    children: '',
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstChild).toBeNull();
  },
};
