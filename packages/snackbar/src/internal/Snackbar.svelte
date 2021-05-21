<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { MDCSnackbar } from "@material/snackbar";
	import type { MDCSnackbarCloseEvent } from "@material/snackbar";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import type { OnSnackbarOpen, OnSnackbarClose } from "..";
	import { Snackbar } from "../dom";
	import type { SnackbarCloseReason } from "../types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let stacked: boolean = false;
	export let leading: boolean = false;
	export let timeoutMs: number = 5000;
	export let closeOnEscape: boolean = true;
	export let open: boolean = false;
	//#endregion

	//region implementation
	const dispatch =
		createEventDispatcher<{
			opening: OnSnackbarOpen;
			opened: OnSnackbarOpen;
			closing: OnSnackbarClose;
			closed: OnSnackbarClose;
		}>();

	let openState: UseState;
	let snackbar: MDCSnackbar;

	onMount(() => {
		initialize();
	});

	function initialize() {
		snackbar?.destroy();
		snackbar = null;

		snackbar = new MDCSnackbar(dom);
		snackbar.listen("MDCSnackbar:opening", handleOpening);
		snackbar.listen("MDCSnackbar:closing", handleClosing);
		snackbar.listen("MDCSnackbar:opened", handleOpened);
		snackbar.listen("MDCSnackbar:closed", handleClosed);

		handleOpenUpdate();
	}

	$: if (snackbar) {
		if (snackbar.timeoutMs !== timeoutMs) {
			snackbar.timeoutMs = timeoutMs !== undefined ? timeoutMs ?? -1 : 5000;
		}

		if (snackbar.closeOnEscape !== closeOnEscape) {
			snackbar.closeOnEscape = closeOnEscape;
		}
	}

	onDestroy(() => {
		snackbar?.destroy();
	});

	async function handleOpening() {
		open = true;

		await tick();

		dispatch("opening", {
			dom,
		});
	}

	async function handleClosing(event: MDCSnackbarCloseEvent) {
		open = false;

		await tick();

		dispatch("closing", {
			dom,
			reason: event.detail.reason as SnackbarCloseReason,
		});
	}

	function handleOpened() {
		dispatch("opened", {
			dom,
		});
	}

	function handleClosed(event: MDCSnackbarCloseEvent) {
		dispatch("closed", {
			dom,
			reason: event.detail.reason as SnackbarCloseReason,
		});
	}

	function handleOpenUpdate() {
		if (open) {
			snackbar.open();
		} else {
			snackbar.close();
		}
	}
	//#endregion
</script>

<UseState value={[stacked, leading, timeoutMs]} onUpdate={initialize} />
<UseState bind:this={openState} value={open} onUpdate={handleOpenUpdate} />

<Snackbar
	bind:dom
	{id}
	class={className}
	{style}
	{stacked}
	{leading}
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
</Snackbar>
