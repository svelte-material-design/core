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
	export let dom: HTMLLIElement = undefined;
	//#endregion

	//#endregion
</script>

<li bind:this={dom} {id} class={className} {style} {...$$restProps}>
	<ul class="mdc-menu__selection-group">
		<slot />
	</ul>
</li>
