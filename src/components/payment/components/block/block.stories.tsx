import type { Meta, StoryObj } from '@storybook/react-vite';
import { Block } from '@components/payment/components/block/block.component';

const Content = () => (
  <div
    style={{
      height: 120,
      background: '#FF9800',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      fontSize: 18,
      textAlign: 'center',
    }}
  >
    CONTENT
  </div>
);

const meta = {
  title: 'Components/Payment/Block',
  component: Block,
  tags: ['autodocs'],
  args: {
    title: 'Wählen Sie Ihre bevorzugte Zahlungsweise',
  },
  render: (args) => (
    <Block {...args}>
      <Content />
    </Block>
  ),
} satisfies Meta<typeof Block>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Block',
};
