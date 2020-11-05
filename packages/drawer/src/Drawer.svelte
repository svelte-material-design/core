<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../packages/common/functions";
	import { DOMEventsForwarder } from "../../../packages/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/drawer/Drawer:${count++}`;

	export let dom: HTMLDivElement = null;
	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Drawer
	import { MDCDrawer } from "@material/drawer";
	import { onMount, onDestroy, tick } from "svelte";
	import { createDrawerContext } from "./DrawerContext";
	import { DrawerVariant } from "./types";
	import { Use } from "../../../packages/common/hooks";
	import Scrim from "./Scrim.svelte";

	export let variant: DrawerVariant = "permanent";
	export let open: boolean = false;
	export let belowTopAppBar: boolean = undefined;

	let opened = false;
	let siblingTopAppBarFound = false;

	$: if (!variant) variant = "permanent";

	const context$ = createDrawerContext({
		variant,
	});
	$: $context$ = { ...$context$, variant };

	$: if (drawer && drawer.open !== open) {
		drawer.open = open;
		tick().then(() => {
			// Sometimes when rerendered with #key block, it will stuck in opening state. This will unlock it.
			if (!drawer.open && open && !dom.classList.contains("mdc-drawer--open")) {
				dom.classList.remove("mdc-drawer--opening");
				drawer.open = open;
			}
		});
	}

	let drawer: MDCDrawer;

	onDestroy(() => {
		drawer && drawer.destroy();
	});

	function init(_variant?: typeof variant) {
		drawer?.list?.destroy();
		drawer?.destroy();

		if (variant === "dismissible" || variant === "modal") {
			drawer = new MDCDrawer(dom);
			drawer.listen("MDCDrawer:opened", handleOpen);
			drawer.listen("MDCDrawer:closed", handleClose);
		}

		siblingTopAppBarFound = !!dom.parentElement.querySelector(
			":scope > .mdc-top-app-bar"
		);
	}

	function handleOpen() {
		opened = true;
		handleUpdateOpen();
	}

	function handleClose() {
		opened = false;
		handleUpdateOpen();
	}

	function handleUpdateOpen() {
		open = drawer.open;
	}

	export function setOpen(value) {
		open = value;
	}
</script>

<style>
	:global(.smui-drawer) {
		position: absolute;
	}
</style>

<svelte:options immutable={true} />

<Use effect hook={() => init(variant)} />

<aside
	{...props}
	bind:this={dom}
	use:forwardDOMEvents
	{id}
	class={parseClassList([
		className,
		'smui-drawer',
		'mdc-drawer',
		[variant === 'dismissible', 'mdc-drawer--dismissible'],
		[variant === 'modal', 'mdc-drawer--modal'],
		[
			belowTopAppBar === undefined ? siblingTopAppBarFound : belowTopAppBar,
			'mdc-top-app-bar--fixed-adjust',
		],
		[opened || variant === 'permanent', 'mdc-drawer--open'],
	])}
	{style}>
	<slot />
</aside>

{#if variant === 'modal'}
	<Scrim />
{/if}
