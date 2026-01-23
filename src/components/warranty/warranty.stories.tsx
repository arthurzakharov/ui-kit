import type { Meta, StoryObj } from '@storybook/react-vite';
import { MaxWidth } from '../../storybook/decorators/max-width';
import { Warranty } from '../../main';

const meta = {
  component: Warranty,
  title: 'Components/Warranty',
  tags: ['autodocs'],
  decorators: [MaxWidth(590)],
  args: {
    title: () => <>EINBÜRGERUNGSGARANTIE</>,
    text: () => (
      <>
        Gelingt es uns nicht, Sie zur deutschen Staatsbürgerin zu machen, erhalten&nbsp;
        <span role="button">Sie den vollen Betrag zurück</span>.
      </>
    ),
  },
} satisfies Meta<typeof Warranty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Warranty',
  tags: ['snapshot'],
};
