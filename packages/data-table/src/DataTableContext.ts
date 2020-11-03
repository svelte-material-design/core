import { createContextBuilder } from "../../../packages/common";

export const [
	createDataTableContext,
	getDataTableContext,
] = createContextBuilder<DataTableContext>();

interface DataTableContext {
	syncDom(): void;
}
