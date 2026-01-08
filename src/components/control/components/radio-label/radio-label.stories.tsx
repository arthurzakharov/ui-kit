import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import type { State } from '../../types';
import { RadioLabel, type RadioLabelChild } from './radio-label.component';

const focused = (value: boolean) => 'Focused: ' + value;
const hovered = (value: boolean) => 'Hovered: ' + value;
const checked = (value: boolean) => 'Checked: ' + value;
const state = (value: State) => 'State: ' + value;

const ChildrenRenderer = (props: RadioLabelChild) => (
  <div
    data-testid="children-renderer"
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 16,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#d4d4d4',
      borderRadius: 10,
      minWidth: '200px',
    }}
  >
    <div>Focused: {String(props.focused)}</div>
    <div>Hovered: {String(props.hovered)}</div>
    <div>Checked: {String(props.checked)}</div>
    <div>State: {props.state}</div>
  </div>
);

const meta: Meta<typeof RadioLabel> = {
  title: 'Components/Control/RadioLabel',
  component: RadioLabel,
  tags: ['autodocs'],
  args: {
    id: 'radio',
    value: 'banana',
    choice: { label: 'Apple', value: 'apple' },
    choices: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
    state: 'idle',
    children: (props) => <ChildrenRenderer {...props} />,
  },
  argTypes: {
    id: {
      control: 'text',
    },
    value: { control: 'object' },
    choice: { control: 'object' },
    choices: { control: 'object' },
    state: {
      control: 'select',
      options: ['idle', 'error', 'success'],
    },
    children: {
      type: {
        name: 'function',
        required: true,
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioLabel>;

export const DefaultValue: Story = {
  args: {
    choices: undefined,
    state: undefined,
  },
};

export const CheckedValueIsString: Story = {
  args: {
    value: 'apple',
  },
  play: async ({ canvas }) => {
    const children = canvas.getByTestId('children-renderer');
    await expect(children).toHaveTextContent(checked(true));
  },
};

export const CheckedValueIsArray: Story = {
  args: {
    value: ['apple', 'lemon'],
  },
  play: async ({ canvas }) => {
    const children = canvas.getByTestId('children-renderer');
    await expect(children).toHaveTextContent(checked(true));
  },
};

export const NotCheckedValueIsString: Story = {
  args: {
    value: 'pineapple',
  },
  play: async ({ canvas }) => {
    const children = canvas.getByTestId('children-renderer');
    await expect(children).toHaveTextContent(checked(false));
  },
};

export const NotCheckedValueIsArray: Story = {
  args: {
    value: ['pineapple', 'lemon'],
  },
  play: async ({ canvas }) => {
    const children = canvas.getByTestId('children-renderer');
    await expect(children).toHaveTextContent(checked(false));
  },
};

export const Focused: Story = {
  play: async ({ canvas, step, userEvent }) => {
    const radioLabel = canvas.getByTestId('radio-label');
    const children = canvas.getByTestId('children-renderer');

    await step('Initial state: not focused', async () => {
      await expect(children).toHaveTextContent(focused(false));
    });

    await step('Focus the label', async () => {
      radioLabel.setAttribute('tabindex', '0');
      await userEvent.tab();
      await expect(radioLabel).toHaveFocus();
      await expect(children).toHaveTextContent(focused(true));
    });

    await step('Blur the label', async () => {
      await userEvent.tab();
      await expect(radioLabel).not.toHaveFocus();
      await expect(children).toHaveTextContent(focused(false));
    });
  },
};

export const Hovered: Story = {
  play: async ({ canvas, step, userEvent }) => {
    const radioLabel = canvas.getByTestId('radio-label');
    const children = canvas.getByTestId('children-renderer');

    await step('Initial state: not hovered', async () => {
      await expect(children).toHaveTextContent(hovered(false));
    });

    await step('Hover over the label', async () => {
      await userEvent.hover(radioLabel);
      await expect(children).toHaveTextContent(hovered(true));
    });

    await step('Unhover from the label', async () => {
      await userEvent.unhover(radioLabel);
      await expect(children).toHaveTextContent(hovered(false));
    });
  },
};

export const StateIdle: Story = {
  args: {
    state: 'idle',
  },
  play: async ({ canvas }) => {
    const childrenRenderer = canvas.getByTestId('children-renderer');
    await expect(childrenRenderer).toHaveTextContent(state('idle'));
  },
};

export const StateSuccess: Story = {
  args: {
    state: 'success',
  },
  play: async ({ canvas }) => {
    const childrenRenderer = canvas.getByTestId('children-renderer');
    await expect(childrenRenderer).toHaveTextContent(state('idle'));
  },
};

export const StateErrorCheckedSingleChoice: Story = {
  args: {
    value: 'apple',
    choice: { label: 'Apple', value: 'apple' },
    choices: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
    state: 'error',
  },
  play: async ({ canvas }) => {
    const childrenRenderer = canvas.getByTestId('children-renderer');
    await expect(childrenRenderer).toHaveTextContent(state('error'));
    await expect(childrenRenderer).toHaveTextContent(checked(true));
  },
};

export const StateErrorNotCheckedIdleSingleChoice: Story = {
  args: {
    value: 'banana',
    choice: { label: 'Apple', value: 'apple' },
    choices: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
    state: 'error',
  },
  play: async ({ canvas }) => {
    const childrenRenderer = canvas.getByTestId('children-renderer');
    await expect(childrenRenderer).toHaveTextContent(state('idle'));
    await expect(childrenRenderer).toHaveTextContent(checked(false));
  },
};

export const StateErrorNotCheckedError: Story = {
  args: {
    value: 'pineapple',
    choice: { label: 'Apple', value: 'apple' },
    choices: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
    state: 'error',
  },
  play: async ({ canvas }) => {
    const childrenRenderer = canvas.getByTestId('children-renderer');
    await expect(childrenRenderer).toHaveTextContent(state('error'));
    await expect(childrenRenderer).toHaveTextContent(checked(false));
  },
};

export const MultiChoiceErrorState: Story = {
  name: 'Multi-Choice: Error State (Implementation Detail)',
  args: {
    value: ['apple'],
    choice: { label: 'Apple', value: 'apple' },
    choices: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
    state: 'error',
  },
  play: async ({ canvas, step }) => {
    const childrenRenderer = canvas.getByTestId('children-renderer');

    await step('Verify state is error', async () => {
      // TODO: The component's error logic does not correctly handle array values.
      // It compares `c.value === value`, which is always false if `value` is an array.
      // This results in an 'error' state for all items when `state` is 'error' and `value` is an array.
      await expect(childrenRenderer).toHaveTextContent('State: error');
      await expect(childrenRenderer).toHaveTextContent('Checked: true');
    });
  },
};
