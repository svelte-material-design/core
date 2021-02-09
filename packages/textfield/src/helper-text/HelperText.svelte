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
	export let id: string = `@smui/input-field/helper-text/HelperText:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// HelperText
	import { MDCTextFieldHelperText } from "@material/textfield/helper-text";
	import { onMount, onDestroy } from "svelte";
	import { getInputFieldContext } from "../TextFieldContext";

	export let persistent: boolean = false;
	export let validationMsg: boolean = false;

	const inputFieldContext$ = getInputFieldContext();
	$: $inputFieldContext$?.setHelperTextId(id);

	let helperText: MDCTextFieldHelperText;
	onMount(() => {
		if (!inputFieldContext$) helperText = new MDCTextFieldHelperText(dom);
	});

	onDestroy(() => {
		$inputFieldContext$?.setHelperTextId(undefined);
		helperText?.destroy();
	});
</script>

<div
	{...props}
	{id}
	class="mdc-text-field-helper-line"
	{style}
	use:forwardDOMEvents
>
	<div
		bind:this={dom}
		class={parseClassList([
			className,
			"mdc-text-field-helper-text",
			[persistent, "mdc-text-field-helper-text--persistent"],
			[validationMsg, "mdc-text-field-helper-text--validation-msg"],
		])}
		aria-hidden="true"
	>
		<slot name="label" />
	</div>
	<slot />
</div>
