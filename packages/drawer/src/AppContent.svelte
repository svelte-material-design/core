<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/drawer/AppContent:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// AppContent
	import { afterUpdate } from "svelte";

	export let topAppBar: boolean = undefined;
	let topAppBarFound: boolean = false;

	afterUpdate(() => {
		if (dom) {
			topAppBarFound =
				!!dom.parentElement.querySelector(":scope > .mdc-top-app-bar") ||
				!!(
					$$slots.topAppBar &&
					dom.firstElementChild.querySelector(":scope > .mdc-top-app-bar")
				);
		}
	});
</script>

<style>
	:global(.smui-app-content) {
		height: 100%;
		flex: auto;
	}

	:global(.smui-app-content__main) {
		height: 100%;
		box-sizing: border-box;
	}

	:global(.smui-app-content__main-content) {
		height: 100%;
		overflow: auto;
	}
</style>

<svelte:options immutable={true} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-drawer-app-content',
		'smui-app-content',
	])}
	{style}>
	<slot name="topAppBar" />
	<main
		class={parseClassList([
			'smui-app-content__main',
			[
				topAppBar === undefined ? topAppBarFound : topAppBar,
				'mdc-top-app-bar--fixed-adjust',
			],
		])}>
		<div class="smui-app-content__main-content">
			<slot />
		</div>
	</main>
</div>
