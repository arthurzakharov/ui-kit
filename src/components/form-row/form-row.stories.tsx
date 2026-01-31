import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormRow } from '@components/form-row/form-row.component';

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
  title: 'Components/FormRow',
  component: FormRow,
  tags: ['autodocs'],
} satisfies Meta<typeof FormRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'FormRow',
  render: () => (
    <FormRow>
      <Child1 className="x" />
      <Child2 className="y" />
      <Child3 className="y" />
    </FormRow>
  ),
};
