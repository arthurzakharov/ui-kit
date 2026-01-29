import { Box } from '@components/control/components/box/box.component';
import { Button } from '@components/control/components/button/button.component';
import { ButtonCard } from '@components/control/components/button-card/button-card.component';
import { ButtonRadio } from '@components/control/components/button-radio/button-radio.component';
import { ButtonText } from '@components/control/components/button-text/button-text.component';
import { CardImage } from '@components/control/components/card-image/card-image.component';
import { CardText } from '@components/control/components/card-text/card-text.component';
import { Checkbox } from '@components/control/components/checkbox/checkbox.component';
import { Choice } from '@components/control/components/choice/choice.component';
import { Dropdown } from '@components/control/components/dropdown/dropdown.component';
import { HiddenInput } from '@components/control/components/hidden-input/hidden-input.component';
import { Input } from '@components/control/components/input/input.component';
import { Label } from '@components/control/components/label/label.component';
import { Radio } from '@components/control/components/radio/radio.component';
import { RadioLabel } from '@components/control/components/radio-label/radio-label.component';
import { RadioText } from '@components/control/components/radio-text/radio-text.component';
import { Status } from '@components/control/components/status/status.component';
import { Text } from '@components/control/components/text/text.component';
import { Textarea } from '@components/control/components/textarea/textarea.component';

export type { BoxProps } from '@components/control/components/box/box.component';
export type { ButtonProps } from '@components/control/components/button/button.component';
export type { ButtonCardProps } from '@components/control/components/button-card/button-card.component';
export type {
  ButtonRadioProps,
  ButtonRadioInfo,
} from '@components/control/components/button-radio/button-radio.component';
export type { ButtonTextProps } from '@components/control/components/button-text/button-text.component';
export type { CardImageProps } from '@components/control/components/card-image/card-image.component';
export type { CardTextProps } from '@components/control/components/card-text/card-text.component';
export type { CheckboxProps } from '@components/control/components/checkbox/checkbox.component';
export type { ChoiceProps } from '@components/control/components/choice/choice.component';
export type { DropdownProps } from '@components/control/components/dropdown/dropdown.component';
export type { HiddenInputProps } from '@components/control/components/hidden-input/hidden-input.component';
export type { InputProps } from '@components/control/components/input/input.component';
export type { LabelProps } from '@components/control/components/label/label.component';
export type { RadioProps } from '@components/control/components/radio/radio.component';
export type {
  RadioLabelProps,
  RadioLabelChild,
} from '@components/control/components/radio-label/radio-label.component';
export type { RadioTextProps } from '@components/control/components/radio-text/radio-text.component';
export type { StatusProps } from '@components/control/components/status/status.component';
export type { TextProps } from '@components/control/components/text/text.component';
export type { TextareaProps } from '@components/control/components/textarea/textarea.component';

export type {
  InputChangeSource,
  Interactive,
  RadioChoice,
  ChoiceType,
  ChoiceValue,
  State,
  QuestionPath,
  QuestionChoice,
  Size,
} from '@components/control/control.types';

export const Control = {
  Box,
  Button,
  ButtonCard,
  ButtonRadio,
  ButtonText,
  CardImage,
  CardText,
  Checkbox,
  Choice,
  Dropdown,
  HiddenInput,
  Input,
  Label,
  Radio,
  RadioLabel,
  RadioText,
  Status,
  Text,
  Textarea,
};
