<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region imports
	import { MDCTextFieldCharacterCounter } from "@material/textfield/character-counter";
	import { classList } from "@raythurnevoid/strings-filter";
	import { onMount, onDestroy } from "svelte";
	import { getInputFieldContext } from "../TextFieldContext";
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

	let characterCounter: MDCTextFieldCharacterCounter;
	onMount(() => {
		if (!inputFieldContext$) {
			characterCounter = new MDCTextFieldCharacterCounter(dom);
		} else {
			$inputFieldContext$.reistantiate();
		}
	});

	onDestroy(() => {
		characterCounter?.destroy();
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
