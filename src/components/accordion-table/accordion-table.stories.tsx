import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { AccordionTable } from '@components/accordion-table/accordion-table.component';

const TABLE = {
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
};

const SECTION_TITLES = TABLE.body.map((section) => section.title);

const meta = {
  title: 'Components/AccordionTable',
  tags: ['autodocs'],
  component: AccordionTable,
  args: {
    table: TABLE,
    active: 0,
    className: '',
  },
} satisfies Meta<typeof AccordionTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('accordion-table')).toBeInTheDocument();
    await expect(canvas.getByTestId('accordion-table-head')).toBeInTheDocument();
    await expect(canvas.getAllByTestId(/accordion-table-head-cell-/)).toHaveLength(args.table.head.length);
    await expect(canvas.getByTestId('accordion-table-section-content-0')).toBeInTheDocument();
    await expect(canvas.queryByTestId('accordion-table-section-content-1')).toBeNull();
    await expect(canvas.queryByTestId('accordion-table-section-content-2')).toBeNull();
  },
};

export const StartsWithSecondSectionOpen: Story = {
  args: {
    active: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByTestId('accordion-table-section-content-0')).toBeNull();
    await expect(canvas.getByTestId('accordion-table-section-content-1')).toBeInTheDocument();
    await expect(canvas.queryByTestId('accordion-table-section-content-2')).toBeNull();
  },
};

export const StartsWithAllSectionsClosedWhenActiveIsInvalid: Story = {
  args: {
    active: -1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByTestId('accordion-table-section-content-0')).toBeNull();
    await expect(canvas.queryByTestId('accordion-table-section-content-1')).toBeNull();
    await expect(canvas.queryByTestId('accordion-table-section-content-2')).toBeNull();
  },
};

export const ToggleCurrentSection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstSectionButton = canvas.getByRole('button', { name: SECTION_TITLES[0] });

    await expect(canvas.getByTestId('accordion-table-section-content-0')).toBeInTheDocument();

    await userEvent.click(firstSectionButton);
    await expect(canvas.queryByTestId('accordion-table-section-content-0')).toBeNull();

    await userEvent.click(firstSectionButton);
    await expect(canvas.getByTestId('accordion-table-section-content-0')).toBeInTheDocument();
  },
};

export const SwitchSections: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const secondSectionButton = canvas.getByRole('button', { name: SECTION_TITLES[1] });
    const thirdSectionButton = canvas.getByRole('button', { name: SECTION_TITLES[2] });

    await userEvent.click(secondSectionButton);
    await expect(canvas.queryByTestId('accordion-table-section-content-0')).toBeNull();
    await expect(canvas.getByTestId('accordion-table-section-content-1')).toBeInTheDocument();
    await expect(canvas.queryByTestId('accordion-table-section-content-2')).toBeNull();

    await userEvent.click(thirdSectionButton);
    await expect(canvas.queryByTestId('accordion-table-section-content-0')).toBeNull();
    await expect(canvas.queryByTestId('accordion-table-section-content-1')).toBeNull();
    await expect(canvas.getByTestId('accordion-table-section-content-2')).toBeInTheDocument();
    await expect(canvas.getAllByTestId(/accordion-table-data-row-2-/)).toHaveLength(TABLE.body[2].rows.length);
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'color-grey-950',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByTestId('accordion-table');

    await expect(table).toHaveClass(String(args.className));
  },
};
