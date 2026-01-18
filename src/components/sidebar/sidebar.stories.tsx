import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { MaxWidth } from '../../storybook/decorators/max-width';
import { Control } from '../control/control.component';
import { Sidebar } from './sidebar.component';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [MaxWidth(350)],
  args: {
    isButtonVisible: true,
    isUserOpen: true,
    title: 'Sidebar component',
    steps: [
      {
        state: 'success',
        text: 'Step One state with some content',
      },
      {
        state: 'error',
        text: 'Step Two state with some content',
      },
      {
        state: 'idle',
        text: 'Step Three state with some content',
      },
    ],
    info: [
      ['Absicht:', 'Unbefristetes Aufenthaltsrecht / Niederlassungserlaubnis'],
      ['Absicht:', 'Unbefristetes Aufenthaltsrecht'],
    ],
    certifications: ['free', 'gdpr', 'ssl'],
    user: {
      title: 'Ihre Angaben',
      button: 'ändern',
      data: ['Tester Testman', 'Blaustraße 7, 01061 Dresden'],
      onClick: fn(),
    },
  },
  render: (args) => (
    <Sidebar {...args}>
      <Control.Button color="primary" size="md" type="button">
        Submit form
      </Control.Button>
    </Sidebar>
  ),
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Sidebar with all elements',
};
