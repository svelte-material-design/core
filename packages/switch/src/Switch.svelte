<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { Switch } from "./internal";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/switch/Switch:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	export let value: string = undefined;
	export let group: SelectionGroupBinding;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Switch
	bind:dom
	{id}
	class={className}
	{style}
	bind:checked
	{ripple}
	{disabled}
	{readonly}
	{value}
	{group}
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
</Switch>
