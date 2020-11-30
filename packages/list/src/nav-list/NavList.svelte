<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/list/nav-list/NavList:${count++}`;

	export let dom: HTMLDivElement = undefined;
	import { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// List
	//#region imports
	import { ListOrientation } from "../";
	import ListImpl from "../ListImpl.svelte";
	//#endregion

	//#region exports
	export let orientation: ListOrientation = "vertical";

	export let dense: boolean = false;
	export let avatarList: boolean = false;
	export let twoLine: boolean = false;
	export let threeLine: boolean = false;
	//#endregion
</script>

<ListImpl
	bind:dom
	{props}
	{id}
	class={className}
	{style}
	role="list"
	{orientation}
	{dense}
	{avatarList}
	{twoLine}
	{threeLine}
	wrapFocus
	isNav>
	<slot />
</ListImpl>
