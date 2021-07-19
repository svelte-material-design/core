<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { Selectable } from "@raythurnevoid/svelte-group-components/selectable";
	import { Radio } from "./internal/index";
	import { getRadioGroupContext } from "./RadioContext";
	import { RadioStyles } from "./index";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/radio/Radio:${count++}`;
	export let dom: HTMLInputElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let checked: boolean = false;
	export let ripple: boolean = true;
	export let accessibleTouch: boolean = true;
	export let density: number = undefined;
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	//#endregion

	//#region implementation
	const radioGroupContext$ = getRadioGroupContext();
	//#endregion
</script>

<Selectable
	bind:selected={checked}
	{value}
	group={radioGroupContext$ && $radioGroupContext$.group}
	{dom}
>
	<Radio
		bind:dom
		bind:checked
		{className}
		{style}
		{id}
		{value}
		{accessibleTouch}
		{density}
		{disabled}
		{readonly}
		{ripple}
		{...$$restProps}
		on:change
	/>
</Selectable>

<RadioStyles />
