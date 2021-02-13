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
	import { smuiToMDCCorner } from "../functions";
	import { MenuSurface } from "../dom";
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

	export let hoisted: boolean;
	export let anchor: HTMLElement;

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
		menuSurface.setAnchorMargin(anchorMargin);
	}

	$: if (menuSurface) {
		menuSurface.setIsHoisted(!!hoisted);
	}
	//#endregion

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
		if (!disableMDCInstance) {
			menuSurface?.destroy();
			menuSurface = new MDCMenuSurface(dom);
			menuSurface.listen("MDCMenuSurface:opened", handleOpen);
			menuSurface.listen("MDCMenuSurface:closed", handleClose);
			menuSurface.listen("MDCMenuSurface:closing", handleClosing);
		}
	}

	function handleAnchorChange(oldAnchor: typeof anchor) {
		oldAnchor?.classList.remove("mdc-menu-surface--anchor");
		if (!anchor?.classList.contains("mdc-menu-surface--anchor")) {
			anchor.classList.add("mdc-menu-surface--anchor");
		}

		if (!disableMDCInstance) {
			if (menuSurface.anchorElement !== anchor) {
				menuSurface.anchorElement = anchor;
			}
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

<UseState value={anchor} onUpdate={handleAnchorChange} />
<UseState value={open} onUpdate={handleOpenValueUpdate} />

<MenuSurface
	bind:dom
	{id}
	class={className}
	{style}
	{quickOpen}
	{anchorCorner}
	{anchorFlipRtl}
	{anchorMargin}
	{variant}
	{anchor}><slot /></MenuSurface
>
