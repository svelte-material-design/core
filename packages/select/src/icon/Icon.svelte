<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/select/icon/Icon:${count++}`;

	export let dom: GraphicDOM = undefined;

	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Icon
	import { Graphic } from "../../../common/components";
	import type { GraphicType, GraphicDOM } from "../../../common/components";
	import { onDestroy, onMount } from "svelte";
	import { getSelectContext } from "../";
	import { MDCSelectIcon } from "@material/select/icon";

	export let type: GraphicType = "icon";
	export let role: "button" = undefined;
	export let ariaLabel: string = undefined;

	$: tabindex = role === "button" ? 0 : -1;

	const selectContext$ = getSelectContext();

	let icon: MDCSelectIcon;
	onMount(() => {
		if (!selectContext$) {
			icon = new MDCSelectIcon(dom);
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
		"mdc-select__icon",
		[type === "icon" && className == undefined, "material-icons"],
	])}
	{style}
	{type}
>
	<slot />
</Graphic>
