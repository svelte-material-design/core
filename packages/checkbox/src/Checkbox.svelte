<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { getCheckboxGroupContext } from "./CheckboxContext";
	import { Checkbox } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/checkbox/Checkbox:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let checked: boolean = false;
	export let value: string = undefined;
	export let allowIndeterminated: boolean = false;
	export let ripple: boolean = true;
	export let accessibleTouch: boolean = true;
	export let density: number = undefined;

	export let disabled: boolean = false;
	export let readonly: boolean = undefined;
	//#endregion

	//#region implementation
	const checkboxGroupContext$ = getCheckboxGroupContext();
	//#endregion
</script>

<Selectable
	bind:selected={checked}
	{value}
	group={checkboxGroupContext$ && $checkboxGroupContext$.group}
	{dom}
>
	<Checkbox
		bind:dom
		bind:checked
		class={className}
		{style}
		{id}
		{value}
		{allowIndeterminated}
		{ripple}
		{accessibleTouch}
		{density}
		{disabled}
		{readonly}
		{...$$restProps}
		on:change
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focus
		on:blur
	/>
</Selectable>
