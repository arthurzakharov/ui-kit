import { FONT_ALIGN, FONT_COLOR, FONT_SIZE, FONT_WEIGHT, TEXT_PRESET } from '@utils/types';
import type { InputType } from 'storybook/internal/csf';

export const animationArgTypes = {
  ease: {
    control: 'select',
    options: [
      'linear',
      'easeIn',
      'easeOut',
      'easeInOut',
      'circIn',
      'circOut',
      'circInOut',
      'backIn',
      'backOut',
      'backInOut',
      'anticipate',
    ],
  },
  type: { control: 'select', options: ['decay', 'spring', 'keyframes', 'tween', 'inertia'] },
  duration: { control: { type: 'number', min: 0, step: 0.05 } },
  delay: { control: { type: 'number', min: 0, step: 0.05 } },
  keepMount: { control: 'boolean' },
  className: { control: 'text' },
} as const;

type ArgTypeParams = {
  defaultValue?: string;
  description?: string;
  summary?: string;
  required?: boolean;
};

export const BooleanArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'Toggle the boolean state of the component.',
    defaultValue: params.defaultValue,
    control: 'boolean',
  }) as const;

export const StringArgType = (params: ArgTypeParams = {}): InputType => ({
  description: params.description ?? 'The string value of the component.',
  defaultValue: params.defaultValue,
  control: 'text',
  type: {
    name: 'string',
    required: params.required,
  },
});

export const NumberArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The number value of the component.',
    defaultValue: params.defaultValue,
    control: 'number',
  }) as const;

export const FnArgType = (params: ArgTypeParams = {}): InputType =>
  ({
    description: params.description ?? 'Callback function for the component.',
    defaultValue: params.defaultValue,
    control: false,
    type: {
      name: 'function',
      required: params.required,
    },
    table: params.summary
      ? {
          type: { summary: params.summary },
        }
      : undefined,
  }) as const;

export const SizeArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The size of the component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
  }) as const;

export const FontWeightArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The weight of the **ControlButton** component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: FONT_WEIGHT,
  }) as const;

export const FontSizeArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The size of the **ControlButton** component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: FONT_SIZE,
  }) as const;

export const FontColorArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The color of the **ControlButton** component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: FONT_COLOR,
  }) as const;

export const FontAlignArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The alignment of the component.',
    defaultValue: params.defaultValue,
    control: 'select',
    options: FONT_ALIGN,
  }) as const;

export const TextPresetArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The preset of the text component.',
    defaultValue: params.defaultValue,
    control: 'select',
    options: TEXT_PRESET,
  }) as const;

export const StateArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The state of the component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['idle', 'error', 'success'],
  }) as const;

export const ChoiceTypeArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The shape of the **ControlChoice** component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['radio', 'checkbox'],
  }) as const;

export const ControlLabelPositionArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The position of the **ControlLabel** component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['idle', 'active'],
  }) as const;

export const ControlRadioTextSizeArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The size of the **ControlRadioText** component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['body-extra-small', 'body-small', 'body', 'body-large'],
  }) as const;

export const ControlRadioTextColorArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The color of the **ControlRadioText** component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['text-primary', 'text-secondary', 'accent-primary', 'accent-secondary'],
  }) as const;

export const ControlButtonColorArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The color of the **ControlButton** component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['primary', 'secondary', 'tertiary'],
  }) as const;

export const ControlButtonSizeArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The size of the **ControlButton** component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['sm', 'md', 'lg'],
  }) as const;

export const ControlButtonTypeArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The type of the **ControlButton** component',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['submit', 'reset', 'button'],
  }) as const;

export const LoaderColorArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The color of the loader.',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['white', 'text-primary', 'text-secondary', 'accent-primary', 'accent-secondary'],
    table: {
      type: { summary: 'LoaderColor' },
    },
  }) as const;

export const CertificationsIconsArgType = (params: ArgTypeParams = {}) =>
  ({
    description:
      params.description ?? 'Array of certification icons to display. Possible values: `free`, `gdpr`, `ssl`.',
    defaultValue: params.defaultValue,
    control: false,
  }) as const;

export const MessageTypeArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'The type of the message.',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['success', 'question', 'error', 'info'],
    table: {
      type: { summary: 'MessageType' },
    },
  }) as const;

export const TagArgType = (params: ArgTypeParams = {}) =>
  ({
    description: params.description ?? 'HTML tag rendered.',
    defaultValue: params.defaultValue,
    control: 'select',
    options: ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  }) as const;

export const BaseArgTypes = () => ({
  className: StringArgType({
    required: false,
    description: 'Additional CSS class for the component root tag',
    defaultValue: undefined,
  }),
  'data-testid': StringArgType({
    required: false,
    description: 'Test ID for testing from outside. Will replace test ID hardcoded in the component.',
    defaultValue: undefined,
  }),
});
