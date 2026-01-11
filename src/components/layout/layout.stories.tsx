import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout } from './layout.component';

const Header = () => <div style={{ height: 40, background: 'var(--rm-ui-grey-300)' }} />;

const Main = () => <div style={{ height: 524, background: 'var(--rm-ui-grey-400)' }} />;

const Aside = () => <div style={{ height: 412, background: 'var(--rm-ui-grey-500)' }} />;

const Footer = () => <div style={{ height: 30, background: 'var(--rm-ui-grey-300)' }} />;

const meta = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSidebar: Story = {
  args: {
    header: <Header />,
    main: <Main />,
    aside: <Aside />,
    footer: <Footer />,
  },
};

export const WithoutSidebar: Story = {
  args: {
    header: <Header />,
    main: <Main />,
    footer: <Footer />,
  },
};
