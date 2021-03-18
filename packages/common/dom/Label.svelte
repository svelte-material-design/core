<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLLabelElement = null;
	//#endregion

	let forValue: string = undefined;
	export { forValue as for };
	//#endregion

	//#region implementation
	//#endregion
</script>

<label
	bind:this={dom}
	{id}
	class={className}
	{style}
	for={forValue}
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
	<slot />
</label>
