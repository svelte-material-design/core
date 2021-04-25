<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import type { GroupBindings } from "@raythurnevoid/svelte-group-components/ts";
	import {
		Selectable,
		SelectionGroupBinding,
	} from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { Chip } from "./internal";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/chips/Chip:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let accessibleTouch: boolean = false;
	export let removeOnTrailingIconClick: boolean = false;
	export let hideLeadingIconOnSelect: boolean = true;
	export let selectionGroup: SelectionGroupBinding = undefined;
	export let group: GroupBindings = undefined;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Selectable bind:selected {value} group={selectionGroup} {dom}>
	<Chip
		bind:dom
		{id}
		class={className}
		{style}
		bind:selected
		{value}
		{ripple}
		{accessibleTouch}
		{removeOnTrailingIconClick}
		{hideLeadingIconOnSelect}
		{group}
		{...$$restProps}
		on:remove
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
	</Chip>
</Selectable>
