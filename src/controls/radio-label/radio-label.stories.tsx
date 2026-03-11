import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { RadioLabel } from '@controls/radio-label/radio-label.component';

const meta = {
  title: 'Controls/Primitives/RadioLabel',
  parameters: {
    layout: 'centered',
  },
  component: RadioLabel,
  args: {
    id: 'radio-single-a',
    value: 'a',
    choice: { label: 'Option A', value: 'a' },
    choices: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
    ],
    state: 'idle',
    children: ({ checked, focused, hovered, state }) => (
      <div>
        <input id="radio-single-a" type="radio" checked={checked} readOnly />
        <ul>
          <li>
            <b>Checked: </b>
            {checked ? 'Yes' : 'No'}
          </li>
          <li>
            <b>Focused: </b>
            {focused ? 'Yes' : 'No'}
          </li>
          <li>
            <b>Hovered: </b>
            {hovered ? 'Yes' : 'No'}
          </li>
          <li>
            <b>State: </b>
            {state}
          </li>
        </ul>
      </div>
    ),
    // Base props
    className: '',
    'data-testid': '',
  },
} satisfies Meta<typeof RadioLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'RadioLabel',
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'custom-class-name',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByTestId(String(args['data-testid']));

    await step('Component has the custom test id', async () => {
      await expect(component).toBeInTheDocument();
    });

    await step('Component has the custom class name', async () => {
      await expect(component).toHaveClass(String(args.className));
    });
  },
};
