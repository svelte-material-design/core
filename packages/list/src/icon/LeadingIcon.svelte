<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/LeadingIcon:${count++}`;

	export let dom: HTMLSpanElement = undefined;

	import { BaseProps } from "../../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Graphic
	import { Icon } from ".";
	import { GraphicType } from "../../../../packages/common/components";

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
		[type === 'icon' && className == undefined, 'material-icons'],
	])}
	{style}
	{type}
	{role}
	{ariaLabel}>
	<slot />
</Icon>
