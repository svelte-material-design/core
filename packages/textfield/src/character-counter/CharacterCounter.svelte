<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region imports
	import { MDCTextFieldCharacterCounter } from "@material/textfield/character-counter";
	import { classList } from "@raythurnevoid/strings-filter";
	import { onMount, onDestroy, getContext, tick } from "svelte";
	import { getContentContext, getInputFieldContext } from "../TextFieldContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	const inputFieldContext$ = getInputFieldContext();
	const contentContext$ = getContentContext();
	let isInternalCounter: boolean = false;

	let characterCounter: MDCTextFieldCharacterCounter;
	onMount(async () => {
		await tick();

		if (
			contentContext$ &&
			dom.compareDocumentPosition($contentContext$.dom) &
				document.DOCUMENT_POSITION_CONTAINS
		) {
			isInternalCounter = true;
			$contentContext$.setHasInternalCounter(true);
		}

		if (!inputFieldContext$) {
			characterCounter = new MDCTextFieldCharacterCounter(dom);
		} else {
			$inputFieldContext$.reistantiate();
		}
	});

	onDestroy(() => {
		characterCounter?.destroy();

		if (isInternalCounter) {
			$contentContext$.setHasInternalCounter(false);
		}
	});
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class={classList([className, "mdc-text-field-character-counter"])}
	{style}
	{...$$restProps}
>
	<slot />
</div>
