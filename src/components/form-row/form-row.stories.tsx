import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { FormRow } from '@components/form-row/form-row.component';
import { GreyBox } from '@utils/story/grey-box/grey-box.component';

const meta = {
  title: 'Components/FormRow',
  component: FormRow,
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        Placeholder
      </GreyBox>
      <GreyBox data-testid="child-1" asText>
        Placeholder
      </GreyBox>
    </FormRow>
  ),
  args: {
    gap: 'sm',
  },
} satisfies Meta<typeof FormRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoChildren: Story = {
  render: (args) => <FormRow {...args} />,
  play: async ({ canvasElement, step }) => {
    await step('No children should be rendered, so the container should be empty', async () => {
      await expect(canvasElement).toBeEmptyDOMElement();
    });
  },
};

export const OneChild: Story = {
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        Placeholder
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All children are rendered correctly', async () => {
      await expect(canvas.getByTestId('child-0')).toBeInTheDocument();
      await expect(canvas.queryByTestId('child-1')).not.toBeInTheDocument();
      await expect(canvas.queryByTestId('child-2')).not.toBeInTheDocument();
    });
  },
};

export const TwoChildren: Story = {
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        Placeholder
      </GreyBox>
      <GreyBox data-testid="child-1" asText>
        Placeholder
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All children are rendered correctly', async () => {
      await expect(canvas.getByTestId('child-0')).toBeInTheDocument();
      await expect(canvas.getByTestId('child-1')).toBeInTheDocument();
      await expect(canvas.queryByTestId('child-2')).not.toBeInTheDocument();
    });
  },
};

export const ThreeChildren: Story = {
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        Placeholder
      </GreyBox>
      <GreyBox data-testid="child-1" asText>
        Placeholder
      </GreyBox>
      <GreyBox data-testid="child-2" asText>
        Placeholder
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All children are rendered correctly', async () => {
      await expect(canvas.getByTestId('child-0')).toBeInTheDocument();
      await expect(canvas.getByTestId('child-1')).toBeInTheDocument();
      await expect(canvas.getByTestId('child-2')).toBeInTheDocument();
    });
  },
};

export const WithBaseBehavior: Story = {
  args: {
    'data-testid': 'custom-test-id',
    className: 'custom-class-name',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Base interface is implemented correctly', async () => {
      await expect(canvas.getByTestId(String(args['data-testid']))).toHaveClass(String(args.className));
    });
  },
};

export const WithWidthsHalfAndHalf: Story = {
  args: {
    widths: ['1/2', '1/2'],
  },
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        Placeholder
      </GreyBox>
      <GreyBox data-testid="child-1" asText>
        Placeholder
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Each child wrapper carries the correct data-width attribute', async () => {
      const wrappers = canvasElement.querySelectorAll('[data-width]');
      await expect(wrappers).toHaveLength(2);
      await expect(wrappers[0]).toHaveAttribute('data-width', '1/2');
      await expect(wrappers[1]).toHaveAttribute('data-width', '1/2');
      await expect(canvas.getByTestId('child-0')).toBeInTheDocument();
      await expect(canvas.getByTestId('child-1')).toBeInTheDocument();
    });
  },
};

export const WithWidthsSingleHalfChild: Story = {
  args: {
    widths: ['1/2'],
  },
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        Placeholder
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('A single child can be forced to half width on desktop', async () => {
      const wrapper = canvasElement.querySelector('[data-width]');
      await expect(wrapper).toHaveAttribute('data-width', '1/2');
      await expect(canvas.getByTestId('child-0')).toBeInTheDocument();
    });
  },
};

export const WithWidthsThirds: Story = {
  args: {
    widths: ['1/3', '1/3', '1/3'],
  },
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        Placeholder
      </GreyBox>
      <GreyBox data-testid="child-1" asText>
        Placeholder
      </GreyBox>
      <GreyBox data-testid="child-2" asText>
        Placeholder
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement }) => {
    const wrappers = canvasElement.querySelectorAll('[data-width]');
    await expect(wrappers).toHaveLength(3);
    wrappers.forEach((w) => expect(w).toHaveAttribute('data-width', '1/3'));
  },
};

export const WithWidthsAsymmetricThirds: Story = {
  args: {
    widths: ['1/3', '2/3'],
  },
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        1/3
      </GreyBox>
      <GreyBox data-testid="child-1" asText>
        2/3
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement }) => {
    const wrappers = canvasElement.querySelectorAll('[data-width]');
    await expect(wrappers).toHaveLength(2);
    await expect(wrappers[0]).toHaveAttribute('data-width', '1/3');
    await expect(wrappers[1]).toHaveAttribute('data-width', '2/3');
  },
};

export const WithWidthsThreeQuartersAndQuarter: Story = {
  args: {
    widths: ['3/4', '1/4'],
  },
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        3/4
      </GreyBox>
      <GreyBox data-testid="child-1" asText>
        1/4
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement }) => {
    const wrappers = canvasElement.querySelectorAll('[data-width]');
    await expect(wrappers).toHaveLength(2);
    await expect(wrappers[0]).toHaveAttribute('data-width', '3/4');
    await expect(wrappers[1]).toHaveAttribute('data-width', '1/4');
  },
};

export const WithWidthsQuartersMixed: Story = {
  args: {
    widths: ['1/4', '2/4', '1/4'],
  },
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        1/4
      </GreyBox>
      <GreyBox data-testid="child-1" asText>
        2/4
      </GreyBox>
      <GreyBox data-testid="child-2" asText>
        1/4
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement }) => {
    const wrappers = canvasElement.querySelectorAll('[data-width]');
    await expect(wrappers).toHaveLength(3);
    await expect(wrappers[0]).toHaveAttribute('data-width', '1/4');
    await expect(wrappers[1]).toHaveAttribute('data-width', '2/4');
    await expect(wrappers[2]).toHaveAttribute('data-width', '1/4');
  },
};

export const WithWidthsTotalExceedsOne: Story = {
  args: {
    widths: ['1/2', '1/2', '1/2'],
  },
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        Placeholder
      </GreyBox>
      <GreyBox data-testid="child-1" asText>
        Placeholder
      </GreyBox>
      <GreyBox data-testid="child-2" asText>
        Placeholder
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'When total width exceeds 1 a warning is logged and `data-width` is omitted (default behaviour)',
      async () => {
        const wrappersWithDataWidth = canvasElement.querySelectorAll('[data-width]');
        await expect(wrappersWithDataWidth).toHaveLength(0);
      },
    );
  },
};

export const WithWidthsLengthMismatch: Story = {
  args: {
    widths: ['1/2'],
  },
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        Placeholder
      </GreyBox>
      <GreyBox data-testid="child-1" asText>
        Placeholder
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'When `widths` length does not match children count a warning is logged and `data-width` is omitted',
      async () => {
        const wrappersWithDataWidth = canvasElement.querySelectorAll('[data-width]');
        await expect(wrappersWithDataWidth).toHaveLength(0);
      },
    );
  },
};

export const WithWidthsUnknownValue: Story = {
  // Cast forces the invalid value through the type-checker so we can exercise
  // the runtime guard. Real consumers can't reach this branch via the public type.
  args: {
    widths: ['1/2', '5/6' as never],
  },
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        Placeholder
      </GreyBox>
      <GreyBox data-testid="child-1" asText>
        Placeholder
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'When `widths` contains a value outside the supported list a warning is logged and `data-width` is omitted',
      async () => {
        const wrappersWithDataWidth = canvasElement.querySelectorAll('[data-width]');
        await expect(wrappersWithDataWidth).toHaveLength(0);
      },
    );
  },
};
