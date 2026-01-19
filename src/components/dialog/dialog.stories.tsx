import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DialogArticle } from '../dialog-article/dialog-article.component';
import { Dialog } from './dialog.component';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    rootSelector: '#storybook-root',
    on: true,
    onClose: fn(),
    position: 'center',
    size: '1/3',
    maxWidth: '',
    minWidth: '',
    doNotCloseOnOutsideClick: false,
    withoutCloseButton: false,
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top-center', 'center'],
    },
    size: {
      control: 'select',
      options: ['1/3', '1/2', '2/3', '1/1'],
    },
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogArticle cancel={{ text: 'Cancel', fn: fn }} confirm={{ text: 'Confirm', fn: fn }}>
        <h1>Lorem ipsum dolor sit.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cumque dignissimos illum ipsum iste libero
          numquam, possimus reprehenderit velit voluptate?
        </p>
        <h3>Lorem ipsum dolor.</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cupiditate error ex ipsa laboriosam
          perspiciatis ratione similique. Adipisci assumenda atque consectetur distinctio eligendi eos ex explicabo
          facere impedit magni, obcaecati officiis possimus ratione recusandae repellendus saepe voluptatum? Beatae
          impedit minus nihil. Accusamus error ipsa minima?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, consectetur cumque, cupiditate dolor est illo
          itaque modi natus officiis quaerat quam quasi sed sequi similique sint tempore ullam voluptates voluptatibus.
        </p>
        <h3>Lorem ipsum dolor sit amet.</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam est et expedita impedit
          omnis quidem ratione ullam! Aperiam aut autem cum cumque deserunt dolorum, hic illum, impedit in iusto, labore
          libero maxime nam nihil nulla odit officiis pariatur perspiciatis quasi qui quod sint vel velit veniam
          voluptates! Quas!
        </p>
      </DialogArticle>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
