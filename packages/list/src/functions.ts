import type { ListImplRole } from "./internal";
import type { SelectionType } from "../../common/hoc";
import type { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";

export function roleToSelectionType(role: ListImplRole): SelectionType {
	if (role === "radiogroup" || role === "menu") {
		return "single";
	} else if (role === "group") {
		return "multi";
	}
}

export function handleSelect({
	selectionType,
	selectionGroup,
	targetIndex,
}: HandleSelectInput) {
	if (selectionType) {
		const selectedIndexes =
			selectionGroup
				.getItems()
				.map((item, index) => [index, item.selected] as const)
				.filter((item) => item[1])
				.map((item) => item[0]) ?? [];

		const item = selectionGroup.getItems()[targetIndex];

		if (!item) return;

		if (
			(selectionType === "single" && selectedIndexes[0] !== targetIndex) ||
			(selectionType === "multi" && !selectedIndexes.includes(targetIndex))
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
	targetIndex: number;
}
