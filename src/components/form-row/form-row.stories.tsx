import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SizeArgType } from '@utils/story/arg-types';
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
  argTypes: {
    gap: SizeArgType({ description: 'The gap between the children elements.', defaultValue: 'sm' }),
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
