import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlDropdown } from '@controls/control-dropdown';

const meta = {
  title: 'Controls/ControlDropdown',
  component: ControlDropdown,
  args: {
    label: 'Versicherung',
    placeholder: 'Bitte wählen',
    className: '',
    choices: [
      { value: 'aok', label: 'AOK' },
      { value: 'tk', label: 'Techniker Krankenkasse' },
      { value: 'barmer', label: 'BARMER' },
    ],
    value: [{ value: 'aok', label: 'AOK' }],
    onChange: () => {},
  },
} satisfies Meta<typeof ControlDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
