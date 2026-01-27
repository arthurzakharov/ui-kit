import type { Meta, StoryObj } from '@storybook/react-vite';
import { MaxWidth, SIZE } from '@story/decorators/max-width';
import { Information } from '@components/information/information.component';

const meta = {
  title: 'Components/Information',
  component: Information,
  tags: ['autodocs'],
  decorators: [MaxWidth(SIZE.PC_CONTENT)],
  args: {
    size: 'regular',
    color: 'primary',
    className: undefined,
  },
  argTypes: {
    size: {
      control: 'select',
    },
    color: {
      control: 'select',
    },
  },
  render: (args) => (
    <Information {...args}>
      <p>
        Lorem ipsum dolor sit amet, <b>consectetur adipisicing elit</b>. Aut, debitis earum ex impedit incidunt ipsa,
        labore laborum, nisi optio possimus quisquam sit suscipit totam velit voluptates. Accusantium dolor nisi quia.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci, alias asperiores aut, beatae
        dignissimos dolore doloribus enim esse ex, id illum impedit iusto labore libero mollitia neque nesciunt nobis
        non officia praesentium recusandae sit suscipit tenetur voluptas! Beatae dicta dolor, eligendi eos eum eveniet
        exercitationem expedita fuga fugiat fugit in, nesciunt, odit quasi reiciendis saepe! Ad cum ea eaque incidunt
        ipsum, magnam mollitia nisi! Aspernatur autem dolore enim id nam, quod ratione suscipit veritatis.
      </p>
    </Information>
  ),
} satisfies Meta<typeof Information>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeRegular: Story = {
  args: {
    size: 'regular',
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'small',
  },
};

export const SizeExtraSmall: Story = {
  args: {
    size: 'extra-small',
  },
};

export const ColorPrimary: Story = {
  args: {
    color: 'primary',
  },
};

export const ColorSecondary: Story = {
  args: {
    color: 'secondary',
  },
};

export const ColorAccentPrimary: Story = {
  args: {
    color: 'accent-primary',
  },
};
