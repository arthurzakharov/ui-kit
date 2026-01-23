import type { Meta, StoryObj } from '@storybook/react-vite';
import { MainAttachment } from '../../main';

const meta = {
  title: 'Components/MainAttachment',
  component: MainAttachment,
  tags: ['autodocs'],
  render: (args) => (
    <MainAttachment {...args}>
      <div style={{ height: 300, background: 'var(--rm-ui-grey-300)' }} />
    </MainAttachment>
  ),
} satisfies Meta<typeof MainAttachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Mandat für Bußgeld - und Strafsachen',
    subtitle: 'Lorem ipsum dolor sit amet',
  },
};
