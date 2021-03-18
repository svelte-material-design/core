<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { Content } from "../dom";
	import { getSelectContext } from "../SelectContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	const selectContext$ = getSelectContext();
	//#endregion
</script>

<Content
	bind:dom
	{id}
	class={className}
	{style}
	required={$selectContext$.required}
	disabled={$selectContext$.disabled}
	helperTextId={$selectContext$.helperTextId}
	readonly={$selectContext$.readonly}
	ripple={$selectContext$.ripple}
	lineRipple={$selectContext$.lineRipple}
	value={$selectContext$.value}
	variant={$selectContext$.variant}
	invalid={$selectContext$.invalid}
	slots={$$slots}
	{...$$restProps}
>
	<slot name="leadingIcon" slot="leadingIcon" />
	<slot name="label" slot="label" />
	<slot />
</Content>
