<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../common/functions";
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu/Icon:${count++}`;

	export let dom: GraphicDOM = undefined;

	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = undefined;
	//#endregion

	// Icon
	import { Icon } from "../../../list";
	import type { GraphicDOM, GraphicType } from "../../../common/components";

	export let type: GraphicType = "icon";
	export let role: "button" = undefined;
	export let ariaLabel: string = undefined;
</script>

<Icon
	bind:dom
	{props}
	{id}
	class={parseClassList([className])}
	{style}
	{type}
	{role}
	{ariaLabel}
>
	<slot />
</Icon>
