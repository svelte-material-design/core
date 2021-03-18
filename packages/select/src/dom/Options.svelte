<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Menu, List } from "../../../menu/src/dom";
	import { classList } from "@raythurnevoid/strings-filter";
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
	//#endregion
</script>

<Menu
	bind:dom
	{id}
	class={classList([className, "mdc-select__menu"])}
	{style}
	variant="fullwidth"
	{...$$restProps}
>
	<List>
		<slot />
	</List>
</Menu>
