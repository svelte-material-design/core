import { GraphicDOM } from "../../common";

export type IconButtonDOM = HTMLButtonElement | HTMLAnchorElement;
export type IconDOM = GraphicDOM;
export type SwitchableString =
	| string
	| {
			on: string;
			off: string;
	  };
