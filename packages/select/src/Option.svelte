<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../../common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/select/Option:${count++}`;

	export let dom: HTMLLIElement = undefined;

	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	import { Item } from "../../list/src/dom/item";
	import { Content } from "../../list";
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { getSelectContext } from "./SelectContext";

	export let value: string = "";
	export let selected: boolean = undefined;
	export let disabled: boolean = false;

	$: if (value == null) value = "";

	let selectedContext$ = getSelectContext();
</script>

<Selectable bind:selected {value} {dom} group={$selectedContext$.group}>
	<Item
		bind:dom
		{...props}
		{id}
		class={className}
		{style}
		{selected}
		{disabled}
		role="option"
		data-value={value}
		on:domEvent={forwardDOMEvents}
	>
		<Content>
			<slot />
		</Content>
	</Item>
</Selectable>
