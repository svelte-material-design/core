<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu/SecondaryText:${count++}`;

	export let dom: HTMLSpanElement = undefined;
	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// SecondaryText
	import { SecondaryText } from "../../../list";
</script>

<svelte:options immutable={true} />

<SecondaryText bind:dom {props} {id} class={className} {style}>
	<slot />
</SecondaryText>
