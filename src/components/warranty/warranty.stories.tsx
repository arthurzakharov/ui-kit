import type { Meta, StoryObj } from '@storybook/react-vite';
import { MaxWidth, SIZE } from '@story/decorators/max-width';
import { Warranty } from '@components/warranty/warranty.component';

const meta = {
  component: Warranty,
  title: 'Components/Warranty',
  tags: ['autodocs'],
  decorators: [MaxWidth(SIZE.PC_CONTENT)],
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
