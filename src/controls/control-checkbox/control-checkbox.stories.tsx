import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlCheckbox } from '@controls/control-checkbox';
import { fn } from 'storybook/test';
import { useState } from 'storybook/internal/preview-api';

const meta = {
  title: 'Controls/ControlCheckbox',
  component: ControlCheckbox,
  args: {
    id: 'checkbox',
    value: false,
    state: 'idle',
    textSize: 'body-small',
    className: '',
    onChange: fn(),
  },
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['idle', 'error', 'disabled'],
    },
    textSize: {
      control: { type: 'select' },
      options: ['body', 'body-small'],
    },
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <ControlCheckbox
        {...args}
        value={value}
        onChange={(v, i, s) => {
          setValue(v);
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
      </ControlCheckbox>
    );
  },
} satisfies Meta<typeof ControlCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StateIdle: Story = {
  args: {
    state: 'idle',
  },
};

export const StateSuccess: Story = {
  args: {
    state: 'success',
  },
};

export const StateError: Story = {
  args: {
    state: 'error',
  },
};

export const StateErrorWithMessage: Story = {
  args: {
    state: 'error',
    message: 'This field is required',
  },
};
