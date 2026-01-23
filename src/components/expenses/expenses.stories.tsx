import type { Meta, StoryObj } from '@storybook/react-vite';
import { MaxWidth } from '@story/decorators/max-width';
import { Expenses } from '@components/expenses/expenses.component';

const meta = {
  component: Expenses,
  title: 'Components/Expenses',
  tags: ['autodocs'],
  decorators: [MaxWidth(590)],
  args: {
    title: () => <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et ex id ut!</>,
    content: () => (
      <>
        Lorem ipsum dolor sit amet, <span data-color="accent">consectetur adipisicing elit</span>. Est impedit inventore
        odio quasi quo sed unde vel! Autem, id sit! Ducimus facere ipsa laboriosam laudantium molestiae, nesciunt quae
        repellendus tempora voluptas? Aliquid assumenda atque, <strong>deserunt distinctio</strong> dolores eum facilis
        illo <button>illum</button> maiores molestias nostrum odio officiis provident quae quasi quidem ratione
        reiciendis, rem veritatis voluptatem! Cumque eveniet facere harum <b>maxime voluptate</b>? Blanditiis dolorum
        libero modi nostrum. Asperiores <span role="button">cupiditate deleni</span> dolorum eveniet odit quaerat quia
        velit veniam. Consequatur deleniti fugit iure sapiente sint? Aut, repellendus veniam? Assumenda commodi illum
        mollitia quam quisquam reprehenderit tempora. Beatae iste natus porro sunt? Amet, corporis!
      </>
    ),
    subContent: () => (
      <>
        Lorem amet, <span data-color="accent">consectetur adipisicing elit</span>. Est impedit inventore voluptas?
        Aliquid assumenda atque, <strong>deserunt distinctio</strong> dolores eum facilis illo <button>illum</button>{' '}
        maiores molestia quasi ratione reiciendis, rem veritatis voluptatem! Cumque harum <b>maxime voluptate</b>?
        Blanditiis dolorum libero nostrum. Asperiores <span role="button">cupiditate deleni</span> dolorum
      </>
    ),
    amountTitle: () => 'EUR',
    amountNumber: () => ['12', ' %'],
  },
} satisfies Meta<typeof Expenses>;

export default meta;
type Story = StoryObj<typeof Expenses>;

export const Default: Story = {
  name: 'Expenses',
};
