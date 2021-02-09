<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../common/functions";
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `../../data-table/Row:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Row
	import { Selectable } from "../../common/hoc";

	export let value: any = undefined;
	export let selected: boolean = undefined;
</script>

<Selectable bind:selected bind:value>
	<tr
		bind:this={dom}
		{...props}
		{id}
		class={parseClassList([
			className,
			"mdc-data-table__row",
			[selected, "mdc-data-table__row--selected"],
		])}
		{style}
		aria-selected={selected ? "true" : "false"}
		use:forwardDOMEvents
	>
		<slot />
	</tr>
</Selectable>
