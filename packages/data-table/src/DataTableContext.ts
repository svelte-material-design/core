import { createContextBuilder } from "../../common";

export const [
	createDataTableContext,
	getDataTableContext,
] = createContextBuilder<DataTableContext>();

interface DataTableContext {
	syncDom(): void;
}
