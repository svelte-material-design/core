<script lang="ts">
	//#region imports
	import { Typography } from "../../../typography";
	import type { TypographyVariant } from "..";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLElement = undefined;
	//#endregion

	export let variant: TypographyVariant = "headline6";
	export let component: any = undefined;
	//#endregion

	//#region implementation
	//#endregion
</script>

<Typography
	bind:dom
	{...$$restProps}
	{id}
	class={className}
	{style}
	{variant}
	{component}>
	<slot />
</Typography>
