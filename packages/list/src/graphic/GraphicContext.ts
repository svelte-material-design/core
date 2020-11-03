import { createContextPropBuilder } from "../../../../packages/common";

export const [
	setIsSelectionGroupIcon,
	getIsSelectionGroupIcon,
] = createContextPropBuilder<boolean>();
