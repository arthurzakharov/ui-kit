import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import type { ChoiceValue } from '../../types';
import { getChoiceId } from '../../utils/utils';
import { expect, fn } from 'storybook/test';
import { Control } from '../../../../main';

const getRadioLabel = (list: HTMLElement[], id: string, radioId: string): HTMLElement => {
  return list.find((listItem, i) => listItem.getAttribute('for') === getChoiceId(id, radioId, i)) as HTMLElement;
};

const meta = {
  title: 'Components/Control/CardImage',
  tags: ['autodocs'],
  component: Control.CardImage,
  args: {
    sprite: './card-sprite.svg',
    state: 'idle',
    choices: [
      {
        label: 'Geschwindig­keitsverstoß',
        value: 'v1',
      },
      {
        label: 'Rotlichtverstoß',
        value: 'v2',
      },
      {
        label: 'Abstandsverstoß',
        value: 'v3',
      },
      {
        label: 'Handyverstoß',
        value: 'v4',
      },
      {
        label: 'Alkoholverstoß',
        value: 'v5',
      },
      {
        label: 'Park- / Halteverstoß',
        value: 'v6',
      },
      {
        label: 'Anderer Tatvorwurf',
        value: 'v7',
      },
    ],
    id: 'card-image',
    disabled: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  render: (args) => {
    const [value, setValue] = useState<ChoiceValue>(args.value);

    useEffect(() => setValue(args.value), [args.value]);

    return (
      <div style={{ width: 500 }}>
        <Control.CardImage
          {...args}
          value={value}
          onChange={(value, id) => {
            setValue(value as ChoiceValue);
            args.onChange(value, id);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof Control.CardImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultValues: Story = {
  args: {
    value: '',
    state: undefined,
    disabled: undefined,
    onFocus: undefined,
    onBlur: undefined,
  },
};

export const Radio: Story = {
  args: {
    value: '',
  },
  play: async ({ args, canvas, step, userEvent }) => {
    const radioLabels = canvas.getAllByTestId('radio-label');
    await step('Select Option 2', async () => {
      await userEvent.click(getRadioLabel(radioLabels, args.id, 'v2'));
      await expect(args.onChange).toHaveBeenNthCalledWith(1, 'v2', args.id);
    });
    await step('Select Option 3', async () => {
      await userEvent.click(getRadioLabel(radioLabels, args.id, 'v3'));
      await expect(args.onChange).toHaveBeenNthCalledWith(2, 'v3', args.id);
    });
    await step('Re-select Option 3', async () => {
      await userEvent.click(getRadioLabel(radioLabels, args.id, 'v3'));
      await expect(args.onChange).toBeCalledTimes(2);
    });
  },
};

export const Checkbox: Story = {
  args: {
    value: [],
  },
  play: async ({ args, canvas, step, userEvent }) => {
    const radioLabels = canvas.getAllByTestId('radio-label');
    await step('Select Option 2', async () => {
      await userEvent.click(getRadioLabel(radioLabels, args.id, 'v2'));
      await expect(args.onChange).toHaveBeenNthCalledWith(1, ['v2'], args.id);
    });
    await step('Select Option 3', async () => {
      await userEvent.click(getRadioLabel(radioLabels, args.id, 'v3'));
      await expect(args.onChange).toHaveBeenNthCalledWith(2, ['v2', 'v3'], args.id);
    });
    await step('Deselect Option 2', async () => {
      await userEvent.click(getRadioLabel(radioLabels, args.id, 'v2'));
      await expect(args.onChange).toHaveBeenNthCalledWith(3, ['v3'], args.id);
      await expect(args.onChange).toBeCalledTimes(3);
      await expect(args.onFocus).not.toBeCalled();
      await expect(args.onBlur).not.toBeCalled();
    });
  },
};
