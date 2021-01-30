<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../common/functions";
	import { DOMEventsForwarder } from "../../../common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/input-field/icon/Icon:${count++}`;

	export let dom: GraphicDOM = undefined;

	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Icon
	import type { GraphicDOM, GraphicType } from "../../../common/components";
	import { Graphic } from "../../../common/components";
	import { MDCTextFieldIcon } from "@material/textfield/icon";
	import { onDestroy, onMount } from "svelte";
	import { getInputFieldContext } from "../";

	export let type: GraphicType = "icon";
	export let role: "button" = undefined;
	export let ariaLabel: string = undefined;

	$: tabindex = role === "button" ? 0 : -1;

	let position: "leading" | "trailing";

	const inputFieldContext$ = getInputFieldContext();

	let icon: MDCTextFieldIcon;
	onMount(() => {
		if (!inputFieldContext$) {
			icon = new MDCTextFieldIcon(dom);
		}

		const slot = dom.parentElement.getAttribute("slot");
		if (slot === "leadingIcon") {
			position = "leading";
		} else if (slot === "trailingIcon") {
			position = "trailing";
		}
	});

	onDestroy(() => {
		icon?.destroy();
	});

	$: props = {
		...props,
		"aria-hidden": tabindex === -1 ? true : false,
		"aria-label": ariaLabel,
		role,
		tabindex,
	};
</script>

<Graphic
	bind:dom
	{props}
	{id}
	class={parseClassList([
		className,
		"mdc-text-field__icon",
		"smui-input-field-icon",
		[position === "leading", "mdc-text-field__icon--leading"],
		[position === "trailing", "mdc-text-field__icon--trailing"],
		[type === "icon" && className == undefined, "material-icons"],
	])}
	{style}
	{type}
	on:domEvent={forwardDOMEvents}
>
	<slot />
</Graphic>
