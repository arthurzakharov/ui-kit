import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout } from '@components/layout/layout.component';

const Header = () => (
  <div
    style={{
      height: 40,
      background: '#7B1FA2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      fontSize: 18,
      textAlign: 'center',
    }}
  >
    HEADER
  </div>
);

const Main = () => (
  <div
    style={{
      height: 524,
      background: '#8BC34A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      fontSize: 18,
      textAlign: 'center',
    }}
  >
    MAIN
  </div>
);

const Aside = () => (
  <div
    style={{
      height: 412,
      background: '#448AFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      fontSize: 18,
      textAlign: 'center',
    }}
  >
    ASIDE
  </div>
);

const Footer = () => (
  <div
    style={{
      height: 30,
      background: '#FF9800',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      fontSize: 18,
      textAlign: 'center',
    }}
  >
    FOOTER
  </div>
);

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

export const WithSidebarOnBigScreens: Story = {
  args: {
    sidebarAlwaysVisible: false,
    header: <Header />,
    main: <Main />,
    aside: <Aside />,
    footer: <Footer />,
  },
};

export const WithSidebarOnAllScreens: Story = {
  args: {
    sidebarAlwaysVisible: true,
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
