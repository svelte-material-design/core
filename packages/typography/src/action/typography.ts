import { memo } from "../../../common/src/utils";
import { TypographyVariant } from "../types";

export function typography(
	node: HTMLElement,
	variant: TypographyVariant = "body2"
) {
	const variantMemo = memo(variant);

	setClass(variant);
	function setClass(variant: TypographyVariant) {
		if (variantMemo.val) removeClass(variantMemo.val);

		node.classList.add(`mdc-typography--${variant}`);
		variantMemo.val = variant;
	}

	function removeClass(variant: TypographyVariant) {
		node.classList.remove(`mdc-typography--${variant}`);
	}

	return {
		update: function (variant: TypographyVariant) {
			setClass(variant);
		},
		destroy: function () {
			removeClass(variantMemo.val);
		},
	};
}
