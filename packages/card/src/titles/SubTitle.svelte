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
	export let dom: HTMLHeadingElement = undefined;
	//#endregion
	//#endregion

	//#region implementation
	const variant: TypographyVariant = "subtitle2";
	//#endregion
</script>

<Typography bind:dom {...$$restProps} {id} class={className} {style} {variant}>
	<slot />
</Typography>
