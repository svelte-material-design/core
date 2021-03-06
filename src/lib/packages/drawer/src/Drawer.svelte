<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { MDCDrawer } from "@material/drawer";
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
	import { createDrawerContext } from "./DrawerContext";
	import type { DrawerVariant, OnOpenEvent, OnCloseEvent } from "./types";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import Scrim from "./Scrim.svelte";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/drawer/Drawer:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let variant: DrawerVariant = "permanent";
	export let open: boolean = false;
	//#endregion

	//#region implementation
	const dispatch =
		createEventDispatcher<{
			open: OnOpenEvent;
			close: OnCloseEvent;
		}>();

	let opened = false;
	let drawer: MDCDrawer;

	onMount(() => {
		initialize();
	});

	$: if (!variant) variant = "permanent";

	const context$ = createDrawerContext({
		variant,
	});
	$: $context$ = { ...$context$, variant };

	$: if (drawer && drawer.open !== open) {
		tick().then(() => (drawer.open = open));
	}

	onDestroy(() => {
		drawer && drawer.destroy();
	});

	function initialize() {
		drawer?.list?.destroy();
		drawer?.destroy();

		if (variant === "dismissible" || variant === "modal") {
			drawer = new MDCDrawer(dom);
			drawer.listen("MDCDrawer:opened", handleOpen);
			drawer.listen("MDCDrawer:closed", handleClose);
		}
	}

	async function handleOpen() {
		opened = true;
		handleUpdateOpen();
		await tick();
		dispatch("open");
	}

	async function handleClose() {
		opened = false;
		handleUpdateOpen();
		await tick();
		dispatch("close");
	}

	function handleUpdateOpen() {
		open = drawer.open;
	}
	//#endregion
</script>

<UseState value={variant} onUpdate={initialize} />

<aside
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-drawer",
		[variant === "dismissible", "mdc-drawer--dismissible"],
		[variant === "modal", "mdc-drawer--modal"],
		[opened || variant === "permanent", "mdc-drawer--open"],
	])}
	{style}
	{...$$restProps}
>
	<slot />
</aside>
<slot name="app-content" />

{#if variant === "modal"}
	<Scrim />
{/if}

<style lang="scss" global>
	@use "smui-theme.scss";
	@use "@material/drawer/mdc-drawer";

	.mdc-drawer {
		position: absolute;
	}
</style>
