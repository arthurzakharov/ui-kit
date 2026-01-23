import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Footer } from '../../main';

const dataPrivacyFn = fn();

const imprintFn = fn();

const meta = {
  component: Footer,
  title: 'Components/Footer',
  args: {
    name: 'passexperten.de',
    links: () => [
      { text: 'Data Privacy', onClick: dataPrivacyFn },
      { text: 'Imprint', onClick: imprintFn },
    ],
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

export const DefaultView: Story = {
  play: async ({ canvas, userEvent }) => {
    const dataPrivacy = canvas.getByText('Data Privacy');
    const imprint = canvas.getByText('Imprint');
    await userEvent.click(dataPrivacy);
    await expect(dataPrivacyFn).toHaveBeenCalledOnce();
    await expect(dataPrivacyFn).toHaveBeenNthCalledWith(1);
    await expect(dataPrivacy).not.toHaveFocus();
    await userEvent.click(imprint);
    await expect(imprintFn).toHaveBeenCalledOnce();
    await expect(imprintFn).toHaveBeenNthCalledWith(1);
    await expect(imprint).not.toHaveFocus();
  },
};

export const WithoutName: Story = {
  args: {
    name: '',
  },
};

export const WithoutLinks: Story = {
  args: {
    links: () => [],
  },
};
