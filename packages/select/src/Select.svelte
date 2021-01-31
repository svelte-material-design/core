<svelte:options immutable={true} />

<script lang="ts">
	import type { SelectVariant } from "./";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { SelectImpl } from "./internal";

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let lineRipple: boolean = true;
	export let dirty = false;
	export let variant: SelectVariant = "filled";
	export let value: string = null;
	export let nullable: boolean = true;

	export let customValidation: (value: string) => boolean = undefined;

	export let title: string = undefined;
	export let name: string = undefined;
	export let ariaLabel: string = undefined;
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let invalid: boolean = false;
	export let required: boolean = false;

	//#region theming
	export let shapeRadius: string = undefined;
	export let density: number = undefined;
	//#endregion

	export let group: SelectionGroupBinding;
	//#endregion

	let selectImpl: SelectImpl;

	async function handleOptionsUpdated() {
		selectImpl?.updateOptions();
	}
</script>

<SelectionGroup
	bind:value
	on:optionsChange={handleOptionsUpdated}
	{nullable}
	selectionType="single"
	{group}
	let:group
>
	<SelectImpl
		bind:this={selectImpl}
		bind:dom
		{...$$restProps}
		{id}
		class={className}
		{style}
		bind:value
		bind:invalid
		{variant}
		{shapeRadius}
		{density}
		{lineRipple}
		{ripple}
		{disabled}
		{dirty}
		{name}
		{readonly}
		{required}
		{ariaLabel}
		{title}
		{customValidation}
		slots={$$slots}
		{group}
		on:change
	>
		<slot name="leadingIcon" slot="leadingIcon" />
		<slot name="label" slot="label" />
		<slot name="options" slot="options" />
		<slot />
	</SelectImpl>
</SelectionGroup>
