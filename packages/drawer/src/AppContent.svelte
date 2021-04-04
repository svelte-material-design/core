<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { afterUpdate } from "svelte";
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

	let belowTopAppBarProp: boolean = undefined;
	export { belowTopAppBarProp as belowTopAppBar };
	//#endregion

	//#region implementation
	let belowTopAppBar: boolean = false;

	afterUpdate(() => {
		if (dom) {
			belowTopAppBar =
				belowTopAppBarProp ||
				!!dom.parentElement.querySelector(":scope > .mdc-top-app-bar") ||
				!!(
					$$slots.topAppBar &&
					dom.firstElementChild.querySelector(":scope > .mdc-top-app-bar")
				);
		}
	});
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class={classList([className, "mdc-drawer-app-content", "smui-app-content"])}
	{style}
>
	<slot name="topAppBar" />
	<main
		class={classList([
			"smui-app-content__main",
			[belowTopAppBar, "mdc-top-app-bar--fixed-adjust"],
		])}
	>
		<div class="smui-app-content__main-content">
			<slot />
		</div>
	</main>
</div>

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
		height: 90%;
		overflow: auto;
	}
</style>
