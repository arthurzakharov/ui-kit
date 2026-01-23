import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from '@components/header/header.component';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    logo: 'passexperten.svg',
    logoCondition: () => '',
    tel: '0421 33 10 03 11',
    descriptions: [{ size: 's', value: 'Kostenlose Erstberatung' }],
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithConditionedLogo: Story = {
  args: {
    logoCondition: () => 'rightmart.svg',
  },
};

export const WithoutLogoCondition: Story = {
  args: {
    logoCondition: undefined,
  },
};

export const WithoutPhoneNumber: Story = {
  args: {
    tel: '',
  },
};

export const SingleDescription: Story = {
  name: 'Single Description (s-size icons)',
  args: {
    descriptions: [
      { size: 's', value: 'Kostenlose Erstberatung' },
      { size: 's', value: 'Mo-Fr von 8-20 Uhr' },
    ],
  },
};

export const MultipleDescription: Story = {
  name: 'Multiple Descriptions (m-size icons)',
  args: {
    descriptions: [{ size: 'm', value: 'Kostenlose Erstberatung' }],
  },
};
