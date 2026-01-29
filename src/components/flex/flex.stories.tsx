import { MaxWidth, SIZE } from '@story/decorators/max-width';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '@components/flex/flex.component';

interface ChildProps {
  className: string;
}

const Child1 = ({ className }: ChildProps) => (
  <div
    style={{
      height: 100,
      background: '#7B1FA2',
      fontSize: 18,
      textAlign: 'center',
    }}
    className={className}
  >
    Child1
  </div>
);

const Child2 = ({ className }: ChildProps) => (
  <div
    style={{
      height: 100,
      background: '#8BC34A',
      fontSize: 18,
      textAlign: 'center',
    }}
    className={className}
  >
    Child2
  </div>
);

const Child3 = ({ className }: ChildProps) => (
  <div
    style={{
      height: 100,
      background: '#448AFF',
      fontSize: 18,
      textAlign: 'center',
    }}
    className={className}
  >
    Child3
  </div>
);

const meta = {
  title: 'Components/Flex',
  component: Flex,
  tags: ['autodocs'],
  decorators: [MaxWidth(SIZE.MAX_APP_WIDTH)],
  args: {
    grow: 'content',
    gap: 'md',
    basis: '',
  },
  argTypes: {
    grow: {
      control: 'select',
    },
    direction: {
      control: 'select',
    },
  },
  render: (args) => (
    <Flex {...args}>
      <Child1 className="child1" />
      <Child2 className="child2" />
      <Child3 className="child3" />
    </Flex>
  ),
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DirectionRow: Story = {
  args: {
    direction: 'row',
    changeDirectionAfter: 'laptop',
  },
};

export const DirectionColumn: Story = {
  args: {
    direction: 'column',
    align: 'center',
  },
};
