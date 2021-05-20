<svelte:options immutable={true} />

<script context="module" lang="ts">
	import type { ConcurrentSnackbarContext } from "./SnackbarConcurrencyContext";
	import { setSnackbarConcurrencyContext } from "./SnackbarConcurrencyContext";
</script>

<script lang="ts">
	//#region imports
	import { createEventDispatcher, tick } from "svelte";
	import type {
		OnSnackbarConcurrencyOpen,
		OnSnackbarConcurrencyClose,
	} from "./types";
	import type { SnackbarCloseReason } from "../types";
	//#endregion

	//#region exports
	//#region base

	//#endregion

	//#endregion

	//#region implementation
	const dispatch =
		createEventDispatcher<{
			open: OnSnackbarConcurrencyOpen;
			close: OnSnackbarConcurrencyClose;
		}>();

	let awaitingSnackbar: ConcurrentSnackbarContext = undefined;
	let currentOpenSnackbar: ConcurrentSnackbarContext = undefined;

	setSnackbarConcurrencyContext({
		requestOpen(snackbar: ConcurrentSnackbarContext) {
			if (currentOpenSnackbar) {
				awaitingSnackbar = snackbar;
				currentOpenSnackbar.close();
			} else {
				open(snackbar);
			}
		},
		notifyClosed(
			snackbar: ConcurrentSnackbarContext,
			reason?: SnackbarCloseReason
		) {
			if (snackbar === currentOpenSnackbar) {
				currentOpenSnackbar = null;
				if (awaitingSnackbar) {
					open(awaitingSnackbar);
					awaitingSnackbar = null;
				}

				dispatch("close", {
					dom: snackbar.dom,
					value: snackbar.value,
					reason,
				});
			}
		},
	});

	async function open(snackbar: ConcurrentSnackbarContext) {
		currentOpenSnackbar = snackbar;
		currentOpenSnackbar.open();
		await tick();
		dispatch("open", {
			dom: snackbar.dom,
			value: snackbar.value,
		});
	}
	//#endregion
</script>

<slot />
