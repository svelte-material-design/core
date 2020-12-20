import { BaseProps } from "../../../packages/common/dom/Props";

export interface RippleProps extends BaseProps {
	unbounded?: boolean;
	color?: "surface" | "primary" | "secondary";
	classForward?: (classList: string[]) => void;
	keyboardEvents?: boolean;
	rippleElement?: string;
	component: any;
}
