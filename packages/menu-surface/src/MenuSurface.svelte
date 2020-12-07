<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../../../packages/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu-surface/MenuSurface:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// MenuSurface
	import { MDCMenuSurface } from "@material/menu-surface";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import {
		createMenuSurfaceContext,
		getCreateMDCMenuSurfaceInstance,
	} from "./MenuSurfaceContext";
	import { UseState } from "../../common/hooks";
	import { parseClassList } from "../../common/functions";
	import { Corner, MenuSurfaceVariant, MDCMenuDistance } from ".";

	export let open: boolean = false;
	export let quickOpen: boolean = false;
	export let anchorCorner: Corner = Corner.BOTTOM_LEFT;
	export let anchorMargin: MDCMenuDistance = undefined;
	export let variant: MenuSurfaceVariant = undefined;

	const dispatch = createEventDispatcher<{
		open: undefined;
		close: undefined;
	}>();

	const shouldCreateMDCMenuSurfaceInstance = getCreateMDCMenuSurfaceInstance();

	const context$ = createMenuSurfaceContext();
	let anchorElement: HTMLElement;
	let _open: boolean = open;

	$: $context$.open = _open;

	let menuSurface: MDCMenuSurface;
	onMount(async () => {
		if (shouldCreateMDCMenuSurfaceInstance !== false) {
			menuSurface = new MDCMenuSurface(dom);
			menuSurface.listen("MDCMenuSurface:opened", handleOpen);
			menuSurface.listen("MDCMenuSurface:closed", handleClose);
		}

		if (!anchorElement) anchorElement = dom.parentElement;
	});

	$: if (menuSurface) {
		if (menuSurface.isOpen() !== _open) {
			if (_open) {
				menuSurface.open();
			} else {
				menuSurface.close();
			}
		}

		if (menuSurface.quickOpen !== quickOpen) {
			menuSurface.quickOpen = quickOpen;
		}

		if (menuSurface.anchorElement !== anchorElement) {
			menuSurface.anchorElement = anchorElement;
		}
	}

	$: if (menuSurface) {
		if (variant === "fixed") {
			menuSurface.setFixedPosition(true);
		} else {
			menuSurface.setFixedPosition(false);
		}
	}

	$: if (menuSurface && ~anchorCorner) {
		menuSurface.setAnchorCorner(anchorCorner);
	}

	$: if (menuSurface && anchorMargin) {
		menuSurface.setAnchorMargin(anchorMargin);
	}

	$: if (
		dom &&
		anchorElement &&
		!anchorElement.classList.contains("mdc-menu-surface--anchor")
	) {
		anchorElement.classList.add("mdc-menu-surface--anchor");
	}

	onDestroy(() => {
		anchorElement?.classList.remove("mdc-menu-surface--anchor");
	});

	async function handleOpen() {
		_open = open = true;
		await tick();
		dispatch("open");
	}

	async function handleClose() {
		_open = open = false;
		await tick();
		dispatch("close");
	}

	function handleOpenValueUpdate() {
		if (menuSurface) {
			if (open) {
				menuSurface.open();
			} else {
				menuSurface.close();
			}
		}
	}
</script>

<svelte:options immutable={true} />

<UseState value={open} onUpdate={handleOpenValueUpdate} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-menu-surface',
		[variant === 'fixed', 'mdc-menu-surface--fixed'],
		[_open, 'mdc-menu-surface--open'],
		[variant === 'fullwidth', 'mdc-menu-surface--fullwidth'],
	])}
	{style}
	use:forwardDOMEvents>
	<slot />
</div>
