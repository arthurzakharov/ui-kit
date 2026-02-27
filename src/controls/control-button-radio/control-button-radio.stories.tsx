import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlButtonRadio } from '@controls/control-button-radio';

const meta = {
  title: 'Controls/ControlButtonRadio',
  component: ControlButtonRadio,
  args: {
    active: false,
    disabled: false,
    className: '',
    info: {
      text: '19,90 EUR',
      hintLeft: 'Monatlich',
      hintRight: 'inkl. MwSt.',
    },
    children: 'Tarif wählen',
    onClick: () => {},
  },
} satisfies Meta<typeof ControlButtonRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
