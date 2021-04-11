<svelte:options immutable={true} />

<script lang="ts">
	// Base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: GraphicDOM = undefined;
	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};

	// Icon
	import type { GraphicDOM } from "../../common/components";
	import { parseClassList } from "../../common/functions";
</script>

<span class={parseClassList(["mdc-chip__checkmark", className])} on:click>
	<svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
		{#if !$$slots.default}
			<path
				class="mdc-chip__checkmark-path"
				fill="none"
				stroke="black"
				d="M1.73,12.91 8.1,19.28 22.79,4.59"
			/>
		{:else}
			<slot class="mdc-chip__checkmark-path" />
		{/if}
	</svg>
</span>
