import { CornerBit, MDCMenuDistance } from "@material/menu-surface";
import type {
	MenuSurfaceAnchorCorner,
	MenuSurfaceAnchor,
	MenuSurfaceAnchorMargin,
} from "../types";

export function smuiToMDCCorner(
	anchorCorner: MenuSurfaceAnchorCorner,
	anchorFlipRtl: boolean
) {
	const horizontalPositionBit = anchorCorner.includes("end")
		? CornerBit.RIGHT
		: 0;
	const verticalPositionBit = anchorCorner.includes("bottom")
		? CornerBit.BOTTOM
		: 0;
	const anchorCornerBit = horizontalPositionBit | verticalPositionBit;
	const finalCorner =
		anchorCornerBit | (anchorFlipRtl ? CornerBit.FLIP_RTL : 0);

	return finalCorner;
}

export function svmdToMDCAnchorMargin(
	anchorMargin: MenuSurfaceAnchorMargin,
	anchorCorner: MenuSurfaceAnchorCorner
) {
	let result = {} as MDCMenuDistance;

	if (anchorCorner.includes("start")) {
		result.left = anchorMargin.left;
	} else {
		result.right = -anchorMargin.left;
	}

	if (anchorCorner.includes("top")) {
		result.top = anchorMargin.top;
	} else {
		result.bottom = anchorMargin.top;
	}

	return result;
}

export function isAnchorElement(
	anchor_: MenuSurfaceAnchor
): anchor_ is HTMLElement {
	return anchor_ && !!(anchor_ as HTMLElement).outerHTML;
}
