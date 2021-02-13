import { CornerBit } from "@material/menu-surface";
import type { MenuSurfaceAnchorCorner } from "..";

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
