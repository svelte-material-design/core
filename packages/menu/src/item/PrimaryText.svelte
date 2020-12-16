<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu/PrimaryText:${count++}`;

	export let dom: HTMLSpanElement = undefined;
	import { BaseProps } from "../../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// PrimaryText
	import { PrimaryText } from "../../../../packages/list";
</script>

<svelte:options immutable={true} />

<PrimaryText bind:dom {props} {id} class={className} {style}>
	<slot />
</PrimaryText>
