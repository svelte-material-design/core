<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region imports
	import { MDCTextFieldHelperText } from "@material/textfield/helper-text";
	import { onMount, onDestroy } from "svelte";
	import { getInputFieldContext } from "../TextFieldContext";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/input-field/HelperText:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let persistent: boolean = false;
	export let validationMsg: boolean = false;
	//#endregion

	//#region implementation
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
	//#endregion
</script>

<div {id} class="mdc-text-field-helper-line" {style} {...$$restProps}>
	<div
		bind:this={dom}
		class={classList([
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
