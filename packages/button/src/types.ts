import type { A, Button } from "../../common/dom";

export type { GraphicType as IconType } from "../../common/components";
export type { GraphicDOM as IconDOM } from "../../common/components";

export type ButtonComponent = typeof Button | typeof A;
export type ButtonVariant = "text" | "raised" | "unelevated" | "outlined";
export type ButtonColor = "primary" | "secondary";
