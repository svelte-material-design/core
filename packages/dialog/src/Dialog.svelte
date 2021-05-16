<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { createEventDispatcher, tick } from "svelte";
	import { createDialogContext } from "./DialogContext";
	import { MDCDialog } from "@material/dialog";
	import type { MDCDialogCloseEvent } from "@material/dialog";
	import { classList } from "@raythurnevoid/strings-filter";
	import type {
		OnDialogOpened,
		OnDialogClosed,
		OnDialogOpening,
		OnDialogClosing,
	} from "./types";
	import { UseState } from "@raythurnevoid/svelte-hooks/ts";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/dialog/Dialog:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let escapeKeyAction: string = "close";
	export let scrimClickAction: string = "close";
	export let autoStackButtons: boolean = true;
	export let stackedButtons: boolean = false;
	export let initialFocus: HTMLElement = null;
	export let open: boolean = false;
	export let fullscreen: boolean = false;
	//#endregion

	//#region implementation
	const dispatch =
		createEventDispatcher<{
			opened: OnDialogOpened;
			closed: OnDialogClosed;
			opening: OnDialogOpening;
			closing: OnDialogClosing;
		}>();

	let dialog: MDCDialog;
	let openState: UseState;

	let titleId: string;
	let contentId: string;

	let context$ = createDialogContext({
		isOpen: open,
		setTitleId(value) {
			titleId = value;
		},
		setContentId(value) {
			contentId = value;
		},
	});

	$: $context$ = { ...$context$, isOpen: open };

	$: if (dialog) {
		if (dialog.escapeKeyAction !== escapeKeyAction) {
			dialog.escapeKeyAction = escapeKeyAction;
		}

		if (dialog.scrimClickAction !== scrimClickAction) {
			dialog.scrimClickAction = scrimClickAction;
		}

		if (dialog.autoStackButtons !== autoStackButtons) {
			dialog.autoStackButtons = autoStackButtons;
		}
	}

	function setInitialFocusElement() {
		const currentInitalFocusElement = dom.querySelector(
			"[data-mdc-dialog-initial-focus]"
		);

		if (initialFocus && currentInitalFocusElement !== initialFocus) {
			removeInitialFocusAttr(currentInitalFocusElement);
			setInitialFocusAttr(initialFocus);
		}

		if (
			!initialFocus &&
			(!currentInitalFocusElement || !dom.contains(currentInitalFocusElement))
		) {
			const defaultAction = dom.querySelector(
				"[data-mdc-dialog-button-default]"
			);
			if (defaultAction) {
				removeInitialFocusAttr(currentInitalFocusElement);
				setInitialFocusAttr(defaultAction);
			}
		}
	}

	function setInitialFocusAttr(element: Element) {
		if (element) element.setAttribute("data-mdc-dialog-initial-focus", "");
	}

	function removeInitialFocusAttr(element: Element) {
		if (element) element.removeAttribute("data-mdc-dialog-initial-focus");
	}

	async function handleDialogOpened() {
		if (!open) {
			open = true;
			await tick();
		}

		handleDialogEvent("opened");
	}

	async function handleDialogClosed(event: MDCDialogCloseEvent) {
		dialog.destroy();
		dialog = null;

		if (open) {
			open = false;
			await tick();
		}

		dispatch("closed", {
			dom,
			action: event.detail.action,
		});
	}

	function initialize() {
		if (dom) {
			dialog = new MDCDialog(dom);
			dialog.listen("MDCDialog:opened", handleDialogOpened);
			dialog.listen("MDCDialog:closed", handleDialogClosed);
			dialog.listen("MDCDialog:opening", () => handleDialogEvent("opening"));
			dialog.listen("MDCDialog:closing", () => handleDialogEvent("closing"));
		}
	}

	function handleOpenUpdate() {
		if (open) {
			doOpen();
		} else {
			doClose();
		}
	}

	export function handleDialogEvent(event: "opening" | "closing" | "opened") {
		dispatch(event, {
			dom,
		});
	}

	export function doOpen() {
		if (dialog) return;

		open = true;
		openState.setValue(open);

		setInitialFocusElement();

		// I have to reinit dialog at every open because MDC doesn't listen for initialFocus element change
		initialize();

		dialog.open();
	}

	export function doClose() {
		open = false;
		openState.setValue(open);

		dialog?.close();
	}

	export function isOpen() {
		return dialog?.isOpen;
	}

	export function layout() {
		return dialog?.layout();
	}
	//#endregion
</script>

<UseState bind:this={openState} value={open} onUpdate={handleOpenUpdate} />

<div
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-dialog",
		[open, "mdc-dialog--open"],
		[fullscreen, "mdc-dialog--fullscreen"],
		[stackedButtons, "mdc-dialog--stacked"],
	])}
	{style}
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
	<div class="mdc-dialog__container">
		<div
			class="mdc-dialog__surface"
			role="alertdialog"
			aria-modal="true"
			aria-labelledby={$$restProps["aria-labelledby"] || titleId}
			aria-describedby={$$restProps["aria-describedby"] || contentId}
		>
			<slot />
		</div>
	</div>
	<div class="mdc-dialog__scrim" />
</div>
