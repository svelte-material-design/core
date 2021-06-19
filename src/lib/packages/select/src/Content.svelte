<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Content } from "./dom";
	import { getSelectContext } from "./SelectContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	const selectContext$ = getSelectContext();

	let labelId: string;
	$: labelId = $$slots.label ? `${$selectContext$.id}--label` : undefined;
	let selectedTextId: string;
	$: selectedTextId = $selectContext$.value
		? `${$selectContext$.id}--selected-text`
		: undefined;
	//#endregion
</script>

<Content
	bind:dom
	{id}
	class={className}
	{style}
	required={$selectContext$.required}
	disabled={$selectContext$.disabled}
	helperTextId={$selectContext$.helperTextId}
	readonly={$selectContext$.readonly}
	ripple={$selectContext$.ripple}
	lineRipple={$selectContext$.lineRipple}
	value={$selectContext$.value}
	variant={$selectContext$.variant}
	invalid={$selectContext$.invalid}
	slots={$$slots}
	{labelId}
	{selectedTextId}
	{...$$restProps}
>
	<slot name="label" slot="label" />
	<slot name="leading" slot="leading" />
	<slot />
</Content>
