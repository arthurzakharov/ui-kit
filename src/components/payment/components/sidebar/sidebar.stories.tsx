import type { Meta, StoryObj } from '@storybook/react-vite';
import { MaxWidth } from '@story/decorators/max-width';
import { Sidebar } from '@components/payment/components/sidebar/sidebar.component';

const meta = {
  title: 'Components/Payment/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [MaxWidth(350)],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Sidebar',
  args: {
    whatsapp: 'wa.me/4912345678',
    tel: '0421 22 33 55 66',
    info: [
      {
        title: 'Warum benötigen wir eine Vorauszahlung?',
        text: 'Lorem ipsum <b>dolor sit</b> amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ',
      },
      {
        title: 'Haben Sie Fragen?',
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      },
    ],
  },
};
