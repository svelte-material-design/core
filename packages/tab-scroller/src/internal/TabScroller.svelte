<script lang="ts">
	//#region imports
	import { parseClassList } from "../../../../packages/common/functions";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion
	//#endregion
</script>

<div
	bind:this={dom}
	{...$$restProps}
	{id}
	class={parseClassList([className, 'mdc-tab-scroller'])}
	{style}>
	<div class="mdc-tab-scroller__scroll-area">
		<div class="mdc-tab-scroller__scroll-content">
			<slot />
		</div>
	</div>
</div>
