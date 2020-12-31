<script lang="ts">
	//#region imports
	import { MDCSnackbar, MDCSnackbarCloseEvent } from "@material/snackbar";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { OnSnackbarOpen, OnSnackbarClose } from "..";
	import { parseClassList } from "../../../../packages/common/functions";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
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

	const dispatch = createEventDispatcher<{
		opening: OnSnackbarOpen;
		opened: OnSnackbarOpen;
		closing: OnSnackbarClose;
		closed: OnSnackbarClose;
	}>();

	//region implementation
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
			reason: event.detail.reason,
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
			reason: event.detail.reason,
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

<style>
	.smui-snackbar-origin {
		display: none;
	}
</style>

<svelte:options immutable={true} />

<UseState value={[stacked, leading]} onUpdate={initialize} />
<UseState bind:this={openState} value={open} onUpdate={handleOpenUpdate} />

<div class="smui-snackbar-origin" />

<div
	bind:this={dom}
	{...$$restProps}
	{id}
	class={parseClassList([
		className,
		'mdc-snackbar',
		[leading, 'mdc-snackbar--leading'],
		[stacked, 'mdc-snackbar--stacked'],
	])}
	{style}>
	<div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
		<slot />
	</div>
</div>
