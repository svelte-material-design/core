<script lang="ts">
	import { Button } from "..";
	import type { ButtonColor, ButtonVariant } from "..";
	import { parseClassList, parseStylesList } from "../../../common/functions";
	import { themeColor } from "../../../common/theme";

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLButtonElement | HTMLAnchorElement = undefined;
	//#endregion

	export let ripple: boolean = undefined;
	export let color: ButtonColor = undefined;
	export let variant: ButtonVariant = undefined;
	export let disabled: boolean = undefined;
	export let href: string = undefined;

	//#region theming
	export let containerFillColor: string = undefined;
	export let disabledContainerFillColor: string = undefined;
	export let iconColor: string = undefined;
	export let disabledIconColor: string = undefined;
	export let inkColor: string = undefined;
	export let disabledInkColor: string = undefined;

	export let density: number = undefined;
	/** eg: "3em" | "24px" | "10%" */
	export let height: string = undefined;
	/** eg: "3em" | "24px" | "rounded" */
	export let shapeRadius: string = undefined;
	/** eg: "3em" | "24px" | "10%" */
	export let horizontalPadding: string = undefined;

	export let outlineColor: string = undefined;
	export let disabledOutlineColor: string = undefined;
	//#endregion
	//#endregion

	$: {
		// Check and fix density
		if (density > 3) density = 3;
		else if (density < 0) density = 0;
	}
</script>

<Button
	bind:dom
	{id}
	class={parseClassList([
		className,
		[density != null, `smui-button--dense--${density}`],
		[
			/* density == null &&  */ shapeRadius === "rounded",
			`smui-button--shape-rounded`,
		],
		/* [
			density != null && shapeRadius === 'rounded',
			`smui-button--dense-${density}--shape-rounded`,
		], */
	])}
	style={parseStylesList([
		[
			containerFillColor,
			`--smui-button--container-fill-color: ${themeColor(containerFillColor)}`,
		],
		[
			disabledContainerFillColor,
			`--smui-button--disabled-container-fill-color: ${themeColor(
				disabledContainerFillColor
			)}`,
		],
		[iconColor, `--smui-button--icon-color: ${themeColor(iconColor)}`],
		[
			disabledIconColor,
			`--smui-button--disabled-icon-color: ${themeColor(disabledIconColor)}`,
		],
		[inkColor, `--smui-button--ink-color: ${themeColor(inkColor)}`],
		[
			disabledInkColor,
			`--smui-button--disabled-ink-color: ${themeColor(disabledInkColor)}`,
		],
		[height, `--smui-button--height: ${height}`],
		[
			shapeRadius && shapeRadius !== "rounded",
			`--smui-button--shape-radius: ${shapeRadius}`,
		],
		[
			horizontalPadding,
			`--smui-button--horizontal-padding: ${horizontalPadding}`,
		],
		[outlineColor, `--smui-button--outline-color: ${outlineColor}`],
		[
			disabledOutlineColor,
			`--smui-button--disabled-outline-color: ${disabledOutlineColor}`,
		],
		style,
	])}
	{ripple}
	{color}
	{variant}
	{disabled}
	{href}
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
>
	<slot />
</Button>
