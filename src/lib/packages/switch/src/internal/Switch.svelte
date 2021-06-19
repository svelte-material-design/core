<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { getSwitchGroupContext } from "../SwitchContext";
	import { SwitchImpl } from ".";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";
	import { Selectable } from "@raythurnevoid/svelte-group-components/selectable";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	export let value: string = undefined;
	let externalGroup: SelectionGroupBinding;
	export { externalGroup as group };
	//#endregion

	//#region implementation
	const switchGroup$ = getSwitchGroupContext();
	$: group = externalGroup || (switchGroup$ && $switchGroup$.selectionGroup);
	//#endregion
</script>

<Selectable bind:selected={checked} {value} {group} {dom}>
	<SwitchImpl
		bind:dom
		{id}
		class={className}
		{style}
		bind:checked
		{value}
		{ripple}
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
		on:focusin
		on:focusout
	>
		<slot />
	</SwitchImpl>
</Selectable>
