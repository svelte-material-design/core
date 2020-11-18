<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/select/helper-text/HelperText:${count++}`;

	export let dom: HTMLParagraphElement = undefined;

	import { BaseProps } from "../../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// HelperText
	import { MDCSelectHelperText } from "@material/select/helper-text";
	import { onMount, onDestroy } from "svelte";
	import { getSelectContext } from "../";

	export let validationMsg: boolean = false;
	export let persistentValidationMsg: boolean = false;

	const selectContext$ = getSelectContext();
	$: $selectContext$?.setHelperTextId(id);

	let helperText: MDCSelectHelperText;
	onMount(() => {
		helperText = new MDCSelectHelperText(dom);
	});

	onDestroy(() => {
		helperText && helperText.destroy();
	});
</script>

<p
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-select-helper-text',
		[
			persistentValidationMsg,
			'mdc-select-helper-text--validation-msg-persistent',
		],
		[validationMsg, 'mdc-select-helper-text--validation-msg'],
	])}
	{style}
	aria-hidden="true">
	<slot />
</p>
