<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLSpanElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	//#endregion
</script>

<span
	bind:this={dom}
	{id}
	class={classList([className, "mdc-select__dropdown-icon"])}
	{style}
>
	<svg
		class="mdc-select__dropdown-icon-graphic"
		viewBox="7 10 10 5"
		focusable="false"
	>
		<polygon
			class="mdc-select__dropdown-icon-inactive"
			stroke="none"
			fill-rule="evenodd"
			points="7 10 12 15 17 10"
		/>
		<polygon
			class="mdc-select__dropdown-icon-active"
			stroke="none"
			fill-rule="evenodd"
			points="7 15 12 10 17 15"
		/>
	</svg>
</span>
