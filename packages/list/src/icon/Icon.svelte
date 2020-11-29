<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/icon/Icon:${count++}`;

	export let dom: GraphicElement = undefined;

	import { BaseProps } from "../../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Icon
	import {
		Graphic,
		GraphicElement,
		GraphicType,
	} from "../../../../packages/common/components";

	export let type: GraphicType = "icon";
	export let role: "button" = undefined;
	export let ariaLabel: string = undefined;

	$: tabindex = role === "button" ? 0 : -1;

	$: props = {
		...props,
		"aria-hidden": tabindex === -1 ? true : false,
		"aria-label": ariaLabel,
		role,
		tabindex,
	};
</script>

<svelte:options immutable={true} />

<Graphic
	bind:dom
	{props}
	{id}
	class={parseClassList([
		className,
		'mdc-list-item__graphic',
		[type === 'icon' && className == undefined, 'material-icons'],
	])}
	{style}
	{type}>
	<slot />
</Graphic>
