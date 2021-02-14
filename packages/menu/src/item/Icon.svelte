<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import type { IconDOM, IconType } from "./types";
	import { Icon } from "../../../list/src/item";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: IconDOM = undefined;
	//#endregion

	export let type: IconType = "icon";
	//#endregion
</script>

<Icon bind:dom {id} class={className} {style} {type}>
	<slot />
</Icon>
