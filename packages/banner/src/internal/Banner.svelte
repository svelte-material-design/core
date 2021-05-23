<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import {
		CloseReason as MDCCloseReason,
		MDCBanner,
		MDCBannerCloseEventDetail,
	} from "@material/banner";
	import { UseState } from "@raythurnevoid/svelte-hooks/ts";
	import { createEventDispatcher, onMount, tick } from "svelte";
	import { Banner } from "../dom";
	import type {
		CloseReason,
		OnBannerClosed,
		OnBannerClosing,
		OnBannerOpened,
		OnBannerOpening,
	} from "../types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let stackedOnMobile: boolean = true;
	export let fixed: boolean = false;
	export let centered: boolean = false;
	export let open: boolean = false;

	export let disableMDCInstance: boolean = false;
	//#endregion

	//#region implementation
	const dispatch =
		createEventDispatcher<{
			closing: OnBannerClosing;
			closed: OnBannerClosed;
			opening: OnBannerOpening;
			opened: OnBannerOpened;
		}>();

	let banner: MDCBanner;

	$: if (banner) {
		if (banner.isOpen !== open) {
			open ? banner.open() : banner.close(MDCCloseReason.UNSPECIFIED);
		}
	}

	onMount(() => {
		istantiate();

		return () => {
			banner?.destroy();
		};
	});

	function istantiate() {
		if (disableMDCInstance !== true) {
			banner?.destroy();
			banner = new MDCBanner(dom);
			banner.listen("MDCBanner:closing", handleClosing);
			banner.listen("MDCBanner:closed", handleClosed);
			banner.listen("MDCBanner:opening", handleOpening);
			banner.listen("MDCBanner:opened", handleOpened);
		}
	}

	function handleClosing(event: CustomEvent<MDCBannerCloseEventDetail>) {
		dispatch("closing", {
			dom,
			reason: convertMdcReasonToSvmdReason(event.detail.reason),
		});
	}

	async function handleClosed(event: CustomEvent<MDCBannerCloseEventDetail>) {
		open = false;

		await tick();

		dispatch("closed", {
			dom,
			reason: convertMdcReasonToSvmdReason(event.detail.reason),
		});
	}

	function handleOpening() {
		dispatch("opening", {
			dom,
		});
	}

	async function handleOpened() {
		open = true;

		await tick();

		dispatch("opened", {
			dom,
		});
	}

	function convertMdcReasonToSvmdReason(mdcReson: MDCCloseReason): CloseReason {
		switch (mdcReson) {
			case MDCCloseReason.PRIMARY:
				return "primary";
			case MDCCloseReason.SECONDARY:
				return "secondary";
			case MDCCloseReason.UNSPECIFIED:
				return undefined;
		}
	}
	//#endregion
</script>

<UseState value={[stackedOnMobile, fixed, centered]} onUpdate={istantiate} />

<Banner
	bind:dom
	{id}
	class={className}
	{style}
	{stackedOnMobile}
	{fixed}
	{centered}
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:focusin
	on:focusout
>
	<slot />
</Banner>
