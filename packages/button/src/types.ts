import { A, Button } from "../../../packages/common/dom";

export type ButtonComponent = typeof Button | typeof A;
export type ButtonVariant = "raised" | "unelevated" | "outlined";
export type ButtonColor = "primary" | "secondary";
