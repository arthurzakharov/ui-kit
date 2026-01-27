import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@components/text/text.component';

const meta = {
  title: 'Components/Text',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageInfo: Story = {
  render: () => <Text.PageInfo>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Text.PageInfo>,
};

export const PageTitle: Story = {
  render: () => <Text.PageTitle>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Text.PageTitle>,
};

export const Tag: Story = {
  render: () => <Text.Tag tag="div">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Text.Tag>,
};

export const SidebarTitle: Story = {
  render: () => <Text.SidebarTitle>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Text.SidebarTitle>,
};

export const StepTitle: Story = {
  render: () => <Text.StepTitle>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</Text.StepTitle>,
};
