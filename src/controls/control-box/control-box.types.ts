import type { State } from "@controls/utils";
import type { Base } from "@utils/types";
import type { PropsWithChildren } from "react";

export interface ControlBoxProps extends PropsWithChildren<Base> {
  state?: State;
  focused?: boolean;
  checked?: boolean;
  onClick?: VoidFunction;
}