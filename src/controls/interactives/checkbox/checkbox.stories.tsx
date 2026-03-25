import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
import { useState } from 'storybook/internal/preview-api';
import { Checkbox } from '@controls/interactives';

const meta = {
  title: 'Controls/Interactives/Checkbox',
  component: Checkbox,
  args: {
    // Interactive props
    id: 'checkbox',
    value: true,
    disabled: false,
    state: 'idle',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    // Checkbox props
    iconSize: 'md',
    textSize: 'body-small',
    message: '',
    // Base props
    className: '',
    'data-testid': '',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [state, setState] = useState(args.state);

    return (
      <Checkbox
        {...args}
        state={state}
        value={value}
        onChange={(v, i, s) => {
          setValue(v);
          setState(v ? 'idle' : 'error');
          args.onChange(v, i, s);
        }}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur tempora ex animi quia cum. Pariatur
          fugit sit reprehenderit eaque repellat doloribus deserunt magni quis molestiae, reiciendis iste repellendus
          culpa laboriosam rerum voluptatibus modi veritatis error at repudiandae? Illo blanditiis quo totam minus ea
          Laudantium, quis sequi. Culpa non dolor blanditiis optio provident? Totam vero suscipit repellat ipsa
          similique magnam, nisi delectus alias fuga quas ab quia minus ratione molestias cum culpa debitis maxime
          officia minima at est, blanditiis impedit adipisci sequi. Cum similique vel neque veniam nesciunt.
        </p>
      </Checkbox>
    );
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Checkbox',
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
