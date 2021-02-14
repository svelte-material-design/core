<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Content } from "../../../list/src/item";
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

<Content bind:dom {id} class={className} {style} {...$$restProps}>
	<slot />
</Content>
