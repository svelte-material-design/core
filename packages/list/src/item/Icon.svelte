<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { isSlot, parseClassList } from "../../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/icon/Icon:${count++}`;

	export let dom: GraphicElement = undefined;

	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Icon
	import {
		Graphic,
		GraphicElement,
		GraphicType,
	} from "../../../common/components";
	import { onMount } from "svelte";

	export let type: GraphicType = "icon";
	export let role: "button" = undefined;
	export let ariaLabel: string = undefined;

	let position: "leading" | "trailing" = "leading";

	$: tabindex = role === "button" ? 0 : -1;

	$: props = {
		...props,
		"aria-hidden": tabindex === -1 ? true : false,
		"aria-label": ariaLabel,
		role,
		tabindex,
	};

	onMount(() => {
		if (isSlot(dom, "trailing")) {
			position = "trailing";
		}
	});
</script>

<svelte:options immutable={true} />

<Graphic
	bind:dom
	{props}
	{id}
	class={parseClassList([
		className,
		[position === 'trailing', 'smui-list__trailing-icon'],
		[type === 'icon' && className == undefined, 'material-icons'],
	])}
	{style}
	{type}>
	<slot />
</Graphic>
