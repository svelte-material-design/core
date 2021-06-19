export type MenuSurfaceVariant = "fixed" | "fullwidth";
export type AbsoluteMenuSurfacePosition = { x: number; y: number };
export type MenuSurfaceAnchorCorner =
	| "top-start"
	| "top-end"
	| "bottom-start"
	| "bottom-end";
export type MenuSurfaceAnchor = HTMLElement | MenuSurfaceAbsolutePosition;
export type MenuSurfaceAbsolutePosition = {
	x: number;
	y: number;
};
export interface MenuSurfaceAnchorMargin {
	top: number;
	left: number;
}
