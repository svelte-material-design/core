import { SortDirection } from "./";
import { createContextBuilder } from "../../common";

export const [
	createHeadCellContext,
	getHeadCellContext,
] = createContextBuilder<HeadCellContext>();

interface HeadCellContext {
	setSort(enabled: boolean): void;
	setSortDirection(direction: SortDirection): void;
}
