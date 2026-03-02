import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SizeArgType } from '@story/arg-types';
import { FormRow } from '@components/form-row/form-row.component';
import { GreyBox } from '@story/placeholders/grey-box.component';

const meta = {
  title: 'Components/FormRow',
  component: FormRow,
  args: {
    gap: 'sm',
  },
  argTypes: {
    gap: SizeArgType({ description: 'The gap between the children elements.', defaultValue: 'sm' }),
  },
} satisfies Meta<typeof FormRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneChild: Story = {
  render: (args) => (
    <FormRow {...args}>
      <GreyBox data-testid="child-0" asText>
        Placeholder
      </GreyBox>
    </FormRow>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('child-0')).toBeInTheDocument();
    await expect(within(canvasElement).queryByTestId('child-1')).not.toBeInTheDocument();
    await expect(within(canvasElement).queryByTestId('child-2')).not.toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('child-0')).toBeInTheDocument();
    await expect(within(canvasElement).getByTestId('child-1')).toBeInTheDocument();
    await expect(within(canvasElement).queryByTestId('child-2')).not.toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('child-0')).toBeInTheDocument();
    await expect(within(canvasElement).getByTestId('child-1')).toBeInTheDocument();
    await expect(within(canvasElement).getByTestId('child-2')).toBeInTheDocument();
  },
};

export const WithBaseBehavior: Story = {
  args: {
    'data-testid': 'custom-test-id',
    className: 'custom-class-name',
  },
  play: async ({ args, canvasElement, step }) => {
    await step('Base interface is implemented correctly', async () => {
      await expect(within(canvasElement).getByTestId(String(args['data-testid']))).toBeInTheDocument();
      await expect(within(canvasElement).getByTestId(String(args['data-testid']))).toHaveClass(String(args.className));
    });
  },
};
