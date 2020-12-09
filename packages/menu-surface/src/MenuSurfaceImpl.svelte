<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu-surface/MenuSurface:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// MenuSurface
	import { MDCMenuSurface, CornerBit } from "@material/menu-surface";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import {
		createMenuSurfaceContext,
		getCreateMDCMenuSurfaceInstance,
	} from "./MenuSurfaceContext";
	import { UseState } from "../../common/hooks";
	import { parseClassList } from "../../common/functions";
	import {
		MenuSurfaceVariant,
		MDCMenuDistance,
		MenuSurfaceAnchorCorner,
	} from ".";

	export let open: boolean = false;
	export let quickOpen: boolean = false;
	export let anchorFlipRtl: boolean = true;
	export let anchorCorner: MenuSurfaceAnchorCorner = "bottom-start";
	$: anchorCorner = anchorCorner ? anchorCorner : "bottom-start";
	export let anchorMargin: MDCMenuDistance = undefined;
	export let variant: MenuSurfaceVariant = undefined;

	export let hoisted: boolean;
	export let anchor: HTMLElement;

	const dispatch = createEventDispatcher<{
		open: undefined;
		close: undefined;
	}>();

	const shouldCreateMDCMenuSurfaceInstance = getCreateMDCMenuSurfaceInstance();

	const context$ = createMenuSurfaceContext();
	let _open: boolean = open;

	$: $context$.open = _open;

	let menuSurface: MDCMenuSurface;

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
	}

	$: if (menuSurface) {
		if (variant === "fixed") {
			menuSurface.setFixedPosition(true);
		} else {
			menuSurface.setFixedPosition(false);
		}
	}

	$: if (menuSurface && ~anchorCorner) {
		const horizontalPositionBit = anchorCorner.includes("end")
			? CornerBit.RIGHT
			: 0;
		const verticalPositionBit = anchorCorner.includes("bottom")
			? CornerBit.BOTTOM
			: 0;
		const anchorCornerBit = horizontalPositionBit | verticalPositionBit;
		const finalCorner =
			anchorCornerBit | (anchorFlipRtl ? CornerBit.FLIP_RTL : 0);
		menuSurface.setAnchorCorner(finalCorner);
	}

	$: if (menuSurface && anchorMargin) {
		menuSurface.setAnchorMargin(anchorMargin);
	}

	$: if (menuSurface) {
		menuSurface.setIsHoisted(!!hoisted);
	}

	onMount(async () => {
		await tick();

		initialize();
		if (anchor) {
			handleAnchorChange(null);
		}
	});

	onDestroy(() => {
		anchor?.classList.remove("mdc-menu-surface--anchor");
		menuSurface?.destroy();
	});

	function initialize() {
		if (shouldCreateMDCMenuSurfaceInstance !== false) {
			menuSurface?.destroy();
			menuSurface = new MDCMenuSurface(dom);
			menuSurface.listen("MDCMenuSurface:opened", handleOpen);
			menuSurface.listen("MDCMenuSurface:closed", handleClose);
		}
	}

	function handleAnchorChange(oldAnchor: typeof anchor) {
		oldAnchor?.classList.remove("mdc-menu-surface--anchor");
		if (!anchor?.classList.contains("mdc-menu-surface--anchor")) {
			anchor.classList.add("mdc-menu-surface--anchor");
		}

		if (shouldCreateMDCMenuSurfaceInstance !== false) {
			if (menuSurface.anchorElement !== anchor) {
				menuSurface.anchorElement = anchor;
			}
		}
	}

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

	export function getMDCInstance() {
		return menuSurface;
	}
</script>

<svelte:options immutable={true} />

<UseState value={anchor} onUpdate={handleAnchorChange} />
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
	{style}>
	<slot />
</div>
