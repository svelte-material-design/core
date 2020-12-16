<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/menu/Group:${count++}`;

	export let dom: HTMLLIElement = undefined;
	import { BaseProps } from "../../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// SelectionGroup
</script>

<li bind:this={dom} {...props} {id} class={className} {style}>
	<ul class="mdc-menu__selection-group">
		<slot />
	</ul>
</li>
