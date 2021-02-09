<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../common/functions";
	import { DOMEventsForwarder } from "../../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/input-field/character-counter/CharacterCounter:${count++}`;

	export let dom: HTMLInputElement = undefined;

	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// CharacterCounter
	import { MDCTextFieldCharacterCounter } from "@material/textfield/character-counter";
	import { onMount, onDestroy } from "svelte";
	import { getInputFieldContext } from "../TextFieldContext";

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
</script>

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([className, "mdc-text-field-character-counter"])}
	{style}
	use:forwardDOMEvents
>
	<slot />
</div>
