import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { AccordionTable } from '@components/accordion-table';

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

const meta = {
  title: 'Components/AccordionTable',
  component: AccordionTable,
  args: {
    table: TABLE,
  },
  argTypes: {
    table: {
      control: false,
      description: 'The table data, including the header and body sections.',
    },
    active: {
      control: 'number',
      description:
        'The index of the section that should be open by default. If not provided, the first section will be open by default.',
    },
  },
} satisfies Meta<typeof AccordionTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'AccordionTable',
  args: {
    active: undefined,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Then the table is rendered with the correct structure', async () => {
      await expect(canvas.getByTestId('accordion-table')).toBeInTheDocument();
      await expect(canvas.getByTestId('accordion-table-head')).toBeInTheDocument();
      await expect(canvas.getAllByTestId(/accordion-table-head-cell-/)).toHaveLength(args.table.head.length);
    });

    await step('Then the table is rendered with the first section open by default', async () => {
      await expect(canvas.getByTestId('accordion-table-section-content-0')).toBeInTheDocument();
      await expect(canvas.queryByTestId('accordion-table-section-content-1')).toBeNull();
      await expect(canvas.queryByTestId('accordion-table-section-content-2')).toBeNull();
    });
  },
};

export const StartsWithSecondSectionOpen: Story = {
  args: {
    active: 1,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'Then only section "5-9 Forderungen" content is rendered when active prop is set to 1 (second section)',
      async () => {
        await expect(canvas.queryByTestId('accordion-table-section-content-0')).toBeNull();
        await expect(canvas.getByTestId('accordion-table-section-content-1')).toBeInTheDocument();
        await expect(canvas.queryByTestId('accordion-table-section-content-2')).toBeNull();
      },
    );
  },
};

export const StartsWithAllSectionsClosedWhenActiveIsInvalid: Story = {
  args: {
    active: -1,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('When the active prop is set to an invalid value, all sections should be closed', async () => {
      await expect(canvas.queryByTestId('accordion-table-section-content-0')).toBeNull();
      await expect(canvas.queryByTestId('accordion-table-section-content-1')).toBeNull();
      await expect(canvas.queryByTestId('accordion-table-section-content-2')).toBeNull();
    });
  },
};

export const ToggleCurrentSection: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Section "1-4 Forderungen" is open', async () => {
      await expect(canvas.queryByTestId('accordion-table-section-content-0')).toBeInTheDocument();
    });

    await step('When the user clicks on section "1-4 Forderungen" header', async () => {
      await userEvent.click(canvas.getByTestId('accordion-table-button-0'));
    });

    await step('Then section "1-4 Forderungen" is closed', async () => {
      await waitFor(function firstSectionToUnmout() {
        expect(canvas.queryByTestId('accordion-table-section-content-0')).not.toBeInTheDocument();
      });
    });

    await step('When the user clicks on section "1-4 Forderungen" header again', async () => {
      await userEvent.click(canvas.getByTestId('accordion-table-button-0'));
    });

    await step('Then section "1-4 Forderungen" is open again', async () => {
      await waitFor(function firstSectionToMount() {
        expect(canvas.queryByTestId('accordion-table-section-content-0')).toBeInTheDocument();
      });
    });
  },
};

export const SwitchSections: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('When the user opens section "5-9 Forderungen"', async () => {
      await userEvent.click(canvas.getByTestId('accordion-table-button-1'));
    });

    await step('Then only section "5-9 Forderungen" content is rendered', async () => {
      await waitFor(function firstSectionUnmount() {
        expect(canvas.queryByTestId('accordion-table-section-content-0')).toBeNull();
      });
      await waitFor(function secondSectionMount() {
        expect(canvas.getByTestId('accordion-table-section-content-1')).toBeInTheDocument();
      });
      await waitFor(function secondSectionMount() {
        expect(canvas.queryByTestId('accordion-table-section-content-2')).toBeNull();
      });
    });

    await step('When the user opens section "10-14 Forderungen"', async () => {
      await userEvent.click(canvas.getByTestId('accordion-table-button-2'));
    });

    await step('Then section "10-14 Forderungen" is visible with all expected rows', async () => {
      await waitFor(function firstSectionUnmount() {
        expect(canvas.queryByTestId('accordion-table-section-content-0')).toBeNull();
      });
      await waitFor(function secondSectionUnmount() {
        expect(canvas.queryByTestId('accordion-table-section-content-1')).toBeNull();
      });
      await waitFor(function thirdSectionMount() {
        expect(canvas.getByTestId('accordion-table-section-content-2')).toBeInTheDocument();
      });
      await expect(canvas.getAllByTestId(/accordion-table-data-row-2-/)).toHaveLength(TABLE.body[2].rows.length);
    });
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'color-grey-950',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByTestId('custom-test-id');

    await step('Then the table has the custom test id', async () => {
      await expect(table).toBeInTheDocument();
    });

    await step('Then the table has the custom class name', async () => {
      await expect(table).toHaveClass(String(args.className));
    });
  },
};
