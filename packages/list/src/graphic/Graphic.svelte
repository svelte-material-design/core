<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/graphic/Graphic:${count++}`;

	export let dom: HTMLSpanElement = undefined;

	import { BaseProps } from "../../../../packages/common/dom/Props";
	import { getItemContext } from "../item";
	export let props: BaseProps = {};
	//#endregion

	// Graphic
	import { setCreateCheckboxMDCIstance } from "../../../../packages/checkbox";
	import { setCreateRadioMDCIstance } from "../../../../packages/radio";

	let itemContext$ = getItemContext();

	$: if ($itemContext$.role === "checkbox") {
		setCreateCheckboxMDCIstance(false);
	} else {
		setCreateCheckboxMDCIstance(true);
	}

	$: if ($itemContext$.role === "radio") {
		setCreateRadioMDCIstance(false);
	} else {
		setCreateRadioMDCIstance(true);
	}
</script>

<svelte:options immutable={true} />

<span
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, 'mdc-list-item__graphic'])}
	{style}>
	<slot />
</span>
