import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlRadioText } from '@controls/control-radio-text';
import { ClassNameArgType, ControlRadioTextColorArgType, ControlRadioTextSizeArgType } from '@story/arg-types';

const meta = {
  title: 'Controls/ControlRadioText',
  component: ControlRadioText,
  argTypes: {
    size: ControlRadioTextSizeArgType({ defaultValue: 'body' }),
    color: ControlRadioTextColorArgType({ defaultValue: 'text-primary' }),
    checked: {
      control: 'boolean',
      description: 'Whether the radio is checked or not',
    },
    oneLine: {
      control: 'boolean',
      description: 'Whether the text should be truncated to one line',
    },
    className: ClassNameArgType({ defaultValue: '' }),
  },
  render: (args) => <ControlRadioText {...args}>Lorem ipsum dolor sit amet</ControlRadioText>,
} satisfies Meta<typeof ControlRadioText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeBodyExtraSmall: Story = { args: { size: 'body-extra-small' } };

export const SizeBodySmall: Story = { args: { size: 'body-small' } };

export const SizeBody: Story = { args: { size: 'body' } };

export const SizeBodyLarge: Story = { args: { size: 'body-large' } };

export const ColorPrimary: Story = { args: { color: 'text-primary' } };

export const ColorSecondary: Story = { args: { color: 'text-secondary' } };

export const ColorAccentPrimary: Story = { args: { color: 'accent-primary' } };

export const ColorAccentSecondary: Story = { args: { color: 'accent-secondary' } };

export const Checked: Story = { args: { checked: true } };

export const OneLine: Story = { args: { oneLine: true } };

export const WithCustomClassName: Story = {
  args: { className: 'custom-class-name' },
};
