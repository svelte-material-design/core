<svelte:options immutable={true} />

<script context="module" lang="ts">
	import { SnackbarContext } from "./";

	let count: number = 0;

	namespace SnackbarModule {
		let awaitingSnackbar: Binding = undefined;
		let currentOpenSnackbar: Binding = undefined;

		export function queueOpen(snackbar: Binding) {
			if (currentOpenSnackbar) {
				awaitingSnackbar = snackbar;
				currentOpenSnackbar.close();
			} else {
				open(snackbar);
			}
		}

		export function open(snackbar: Binding) {
			currentOpenSnackbar = snackbar;
			currentOpenSnackbar.open();
		}

		export function notifyClosed(snackbar: Binding) {
			if (snackbar === currentOpenSnackbar) {
				currentOpenSnackbar = null;
				if (awaitingSnackbar) {
					open(awaitingSnackbar);
					awaitingSnackbar = null;
				}
			}
		}
	}

	interface Binding {
		open: () => void;
		close: () => void;
	}
</script>

<script lang="ts">
	//#region imports
	import { onDestroy, onMount, tick } from "svelte";
	import { createEventDispatcher } from "svelte";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import SnackbarBase from "./internal/SnackbarBase.svelte";
	import { OnSnackbarClose } from ".";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/snackbar/Snackbar:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let stacked: boolean = false;
	export let leading: boolean = false;
	export let timeoutMs: number = 5000;
	export let closeOnEscape: boolean = true;
	export let open: boolean = false;
	//#endregion

	const dispatch = createEventDispatcher<{
		closed: OnSnackbarClose;
	}>();

	//#region implementation
	let internalOpen: boolean = open;

	const binding: Binding = {
		open: () => setOpen(true),
		close: () => setOpen(false),
	};

	const context: SnackbarContext = {
		setOpen: (newValue: boolean) => {
			open = newValue;
		},
		isOpen: open,
	};

	$: Object.assign(context, { ...context, isOpen: open });

	onMount(() => {
		handleOpenUpdate();
	});

	onDestroy(() => {
		SnackbarModule.notifyClosed(binding);
	});

	async function handleClosed(event: OnSnackbarClose) {
		SnackbarModule.notifyClosed(binding);
		open = false;

		await tick();

		dispatch("closed", event);
	}

	function setOpen(newValue: boolean) {
		open = newValue;
		internalOpen = newValue;
	}

	function handleOpenUpdate() {
		if (open) {
			SnackbarModule.queueOpen(binding);
		} else {
			internalOpen = false;
		}
	}
	//#endregion
</script>

<UseState value={open} onUpdate={handleOpenUpdate} />

<SnackbarBase
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
>
	<slot />
</SnackbarBase>
