<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { onDestroy, onMount, tick } from "svelte";
	import { createEventDispatcher } from "svelte";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { Snackbar } from "../internal";
	import type { OnSnackbarClose } from "../types";
	import { getSnackbarConcurrencyContext } from "./SnackbarConcurrencyContext";
	import type { ConcurrentSnackbarContext } from "./SnackbarConcurrencyContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/snackbar/concurrency/Snackbar:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let stacked: boolean = false;
	export let leading: boolean = false;
	export let timeoutMs: number = 5000;
	export let closeOnEscape: boolean = true;
	export let open: boolean = false;
	export let value: string = undefined;
	//#endregion

	//#region implementation
	const dispatch =
		createEventDispatcher<{
			closed: OnSnackbarClose;
		}>();

	let internalOpen: boolean = open;

	const snackbarConcurrencyContext$ = getSnackbarConcurrencyContext();
	const context = {
		open: () => setOpen(true),
		close: () => setOpen(false),
		value,
	} as ConcurrentSnackbarContext;

	$: Object.assign(context, { ...context, value, dom });

	onMount(() => {
		handleOpenUpdate();
	});

	onDestroy(() => {
		$snackbarConcurrencyContext$.notifyClosed(context);
	});

	async function handleClosed(event: OnSnackbarClose) {
		open = false;
		await tick();
		$snackbarConcurrencyContext$.notifyClosed(context, event.reason);
		dispatch("closed", event);
	}

	function setOpen(newValue: boolean) {
		open = newValue;
		internalOpen = newValue;
	}

	function handleOpenUpdate() {
		if (open) {
			$snackbarConcurrencyContext$.requestOpen(context);
		} else {
			internalOpen = false;
		}
	}
	//#endregion
</script>

<UseState value={open} onUpdate={handleOpenUpdate} />

<Snackbar
	bind:dom
	bind:open={internalOpen}
	{...$$restProps}
	{id}
	class={className}
	{style}
	{leading}
	{stacked}
	{timeoutMs}
	{closeOnEscape}
	on:closed={(event) => handleClosed(event.detail)}
	on:closing
	on:opened
	on:opening
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
