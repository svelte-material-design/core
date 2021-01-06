export type { IconDOM, IconType, IconButtonColor } from "../../icon-button/src";
export type IconButtonDOM = HTMLButtonElement | HTMLAnchorElement;
export type SwitchableString =
	| string
	| {
			on: string;
			off: string;
	  };
