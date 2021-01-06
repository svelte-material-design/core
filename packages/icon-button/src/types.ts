export type {
	GraphicDOM as IconDOM,
	GraphicType as IconType,
} from "../../common";
export type IconButtonDOM = HTMLButtonElement | HTMLAnchorElement;
export type SwitchableString =
	| string
	| {
			on: string;
			off: string;
	  };
export type IconButtonColor = "inherit" | "primary" | "secondary";
