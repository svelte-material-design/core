<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu/Content:${count++}`;

	export let dom: HTMLSpanElement = undefined;
	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Content
	import { Content } from "../../../list";
</script>

<Content bind:dom {props} {id} class={className} {style}>
	<slot />
</Content>
