import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionTable } from '@components/accordion-table/accordion-table.component';
import { fn } from 'storybook/test';
import { useState } from 'react';

const meta = {
  title: 'Components/AccordionTable',
  tags: ['autodocs'],
  component: AccordionTable,
  args: {
    table: {
      head: ['Gegen&shy;stands&shy;wert bis ein&shy;schließ&shy;lich', 'Grund&shy;gebühr', 'Einigungs&shy;gebühr'],
      body: [
        {
          title: '1-4 Forderungen',
          rows: [
            ['4.000 €', '454 €', '496 €'],
            ['5.000 €', '540 €', '596 €'],
            ['6.000 €', '627 €', '696 €'],
            ['7.000 €', '714 €', '796 €'],
            ['8.000 €', '800 €', '896 €'],
            ['9.000 €', '887 €', '996 €'],
          ],
        },
        {
          title: '5-9 Forderungen',
          rows: [
            ['4.000 €', '520 €', '496 €'],
            ['5.000 €', '620 €', '596 €'],
            ['6.000 €', '720 €', '696 €'],
            ['7.000 €', '820 €', '796 €'],
            ['8.000 €', '920 €', '896 €'],
            ['9.000 €', '1.020 €', '996 €'],
          ],
        },
        {
          title: '10-14 Forderungen',
          rows: [
            ['4.000 €', '619 €', '496 €'],
            ['5.000 €', '739 €', '596 €'],
            ['6.000 €', '859 €', '696 €'],
            ['7.000 €', '979 €', '796 €'],
            ['8.000 €', '1.099 €', '896 €'],
            ['9.000 €', '1.219 €', '996 €'],
          ],
        },
      ],
    },
    active: 0,
    onClick: fn(),
    className: '',
  },
  render: (args) => {
    const [active, setActive] = useState(args.active);
    return (
      <AccordionTable
        {...args}
        active={active}
        onClick={(active) => {
          args.onClick?.call(null, active);
          setActive(active);
        }}
      />
    );
  },
} satisfies Meta<typeof AccordionTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
