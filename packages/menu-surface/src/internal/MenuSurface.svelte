<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { MDCMenuSurface } from "@material/menu-surface";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { createMenuSurfaceContext } from "../MenuSurfaceContext";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import type {
		MenuSurfaceVariant,
		MenuSurfaceAnchorMargin,
		MenuSurfaceAnchorCorner,
	} from "..";
	import {
		smuiToMDCCorner,
		isAnchorElement,
		svmdToMDCAnchorMargin,
	} from "../functions";
	import { MenuSurface } from "../dom";
	import { UseAnchor } from ".";
	import type { MenuSurfaceAnchor } from "../types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let open: boolean = false;
	export let quickOpen: boolean = false;
	export let anchorFlipRtl: boolean = true;
	export let anchorCorner: MenuSurfaceAnchorCorner = "bottom-start";
	$: anchorCorner = anchorCorner ? anchorCorner : "bottom-start";
	export let anchorMargin: MenuSurfaceAnchorMargin = undefined;
	export let variant: MenuSurfaceVariant = undefined;
	export let hoisted: boolean = false;
	export let anchor: MenuSurfaceAnchor;

	export let disableMDCInstance: boolean = false;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		open: undefined;
		close: undefined;
		closing: undefined;
	}>();

	const context$ = createMenuSurfaceContext();
	$: $context$ = { ...$context$, open };

	let menuSurface: MDCMenuSurface;

	//#region keep MDCMenuSurface synchronized
	$: if (menuSurface) {
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

	$: if (menuSurface && anchorCorner) {
		const corner = smuiToMDCCorner(anchorCorner, anchorFlipRtl);
		menuSurface.setAnchorCorner(corner);
	}

	$: if (menuSurface && anchorMargin) {
		const mdcAnchorMargin = svmdToMDCAnchorMargin(anchorMargin, anchorCorner);
		menuSurface.setAnchorMargin(mdcAnchorMargin);
	}

	$: if (menuSurface) {
		menuSurface.setIsHoisted(!!hoisted);
	}
	//#endregion

	onMount(async () => {
		initialize();
	});

	onDestroy(() => {
		menuSurface?.destroy();
	});

	function handleAnchorUpdate() {
		if (!disableMDCInstance) {
			if (isAnchorElement(anchor)) {
				if (menuSurface.anchorElement !== anchor) {
					menuSurface.anchorElement = anchor;
				}
			} else {
				menuSurface.anchorElement = null;
				menuSurface.setAbsolutePosition(anchor.x, anchor.y);
			}
		}
	}

	function initialize() {
		if (!disableMDCInstance) {
			menuSurface?.destroy();
			menuSurface = new MDCMenuSurface(dom);
			menuSurface.listen("MDCMenuSurface:opened", handleOpen);
			menuSurface.listen("MDCMenuSurface:closed", handleClose);
			menuSurface.listen("MDCMenuSurface:closing", handleClosing);
		}
	}

	async function handleOpen() {
		open = true;
		await tick();
		dispatch("open");
	}

	async function handleClose() {
		open = false;
		await tick();
		dispatch("close");
	}

	async function handleClosing() {
		dispatch("closing");
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
	//#endregion
</script>

<UseAnchor {anchor} on:update={handleAnchorUpdate} />
<UseState value={open} onUpdate={handleOpenValueUpdate} />

<MenuSurface
	bind:dom
	{id}
	class={className}
	{style}
	{quickOpen}
	{variant}
	{...$$restProps}
>
	<slot />
</MenuSurface>
