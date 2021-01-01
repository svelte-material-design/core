<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu/SelectionGroupIcon:${count++}`;

	export let dom: GraphicElement = undefined;

	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = undefined;
	//#endregion

	// Icon
	import { Icon } from "../../../list";
	import { GraphicElement, GraphicType } from "../../../common/components";

	export let type: GraphicType = "icon";
	export let role: "button" = undefined;
	export let ariaLabel: string = undefined;
</script>

<svelte:options immutable={true} />

<Icon
	bind:dom
	{props}
	{id}
	class={parseClassList([
		className,
		'mdc-menu__selection-group-icon',
		[type === 'icon' && className == undefined, 'material-icons'],
	])}
	{style}
	{type}
	{role}
	{ariaLabel}>
	<slot />
</Icon>
