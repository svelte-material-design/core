import type { SelectionType } from "../../common/hoc";
import type { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";

export function handleSelect({
	selectionType,
	selectionGroup,
	itemIndex,
}: HandleSelectInput) {
	if (selectionType) {
		const selectedIndexes =
			selectionGroup
				.getItems()
				.map((item, index) => [index, item.selected] as const)
				.filter((item) => item[1])
				.map((item) => item[0]) ?? [];

		const item = selectionGroup.getItems()[itemIndex];

		if (!item) return;

		if (
			(selectionType === "single" && selectedIndexes[0] !== itemIndex) ||
			(selectionType === "multi" && !selectedIndexes.includes(itemIndex))
		) {
			selectionGroup.setSelected(item, true);
		} else {
			selectionGroup.setSelected(item, false);
		}
	}
}

interface HandleSelectInput {
	selectionType: SelectionType;
	selectionGroup: SelectionGroup;
	itemIndex: number;
}
