<script lang="ts">
	import { setCheckboxBehaviour } from "../../checkbox/src";

	//#region Base
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = "";
	export { className as class };
	export let style: string = "";

	export let dom: HTMLDivElement = null;

	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	import { setRowBehaviour } from "./RowContext";

	setCheckboxBehaviour("data-table-row");
	setRowBehaviour(null);
</script>

<tbody
	bind:this={dom}
	{...props}
	class="mdc-data-table__content {className}"
	{style}
	use:forwardDOMEvents
>
	<slot />
</tbody>
