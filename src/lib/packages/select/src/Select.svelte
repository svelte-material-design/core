<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region  imports
	import type { SelectVariant } from "./";
	import { SelectionGroup } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { Select } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/select/Select:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let lineRipple: boolean = true;
	export let variant: SelectVariant = "filled";
	export let value: string = null;
	export let nullable: boolean = true;

	export let customValidation: (value: string) => boolean = undefined;

	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let invalid: boolean = false;
	export let required: boolean = false;

	export let group: SelectionGroupBinding = undefined;
	//#endregion

	//#region implementation
	let select: Select;

	async function handleOptionsUpdated() {
		select?.updateOptions();
	}
	//#endregion
</script>

<SelectionGroup
	bind:value
	on:optionsChange={handleOptionsUpdated}
	{nullable}
	selectionType="single"
	{group}
	let:group
>
	<Select
		bind:this={select}
		bind:dom
		{...$$restProps}
		{id}
		class={className}
		{style}
		bind:value
		bind:invalid
		{variant}
		{lineRipple}
		{ripple}
		{disabled}
		{readonly}
		{required}
		{customValidation}
		{group}
		slots={$$slots}
		{...$$restProps}
		on:change
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:focusin
		on:focusout
	>
		<slot />
	</Select>
</SelectionGroup>
