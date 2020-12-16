<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu/Icon:${count++}`;

	export let dom: GraphicElement = undefined;

	import { BaseProps } from "../../../../packages/common/dom/Props";
	export let props: BaseProps = undefined;
	//#endregion

	// Icon
	import { Icon } from "../../../../packages/list";
	import {
		GraphicElement,
		GraphicType,
	} from "../../../../packages/common/components";

	export let type: GraphicType = "icon";
	export let role: "button" = undefined;
	export let ariaLabel: string = undefined;
</script>

<svelte:options immutable={true} />

<Icon
	bind:dom
	{props}
	{id}
	class={parseClassList([className])}
	{style}
	{type}
	{role}
	{ariaLabel}>
	<slot />
</Icon>
