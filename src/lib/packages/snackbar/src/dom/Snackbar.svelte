<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
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

	export let stacked: boolean = false;
	export let leading: boolean = false;
	//#endregion

	//region implementation
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-snackbar",
		[leading, "mdc-snackbar--leading"],
		[stacked, "mdc-snackbar--stacked"],
	])}
	{style}
	{...$$restProps}
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
	<div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
		<slot />
	</div>
</div>
