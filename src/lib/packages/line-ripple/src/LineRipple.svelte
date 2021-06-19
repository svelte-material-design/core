<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region imports
	import { MDCLineRipple } from "@material/line-ripple";
	import { classList, styleList } from "@raythurnevoid/strings-filter";
	import { onMount, onDestroy } from "svelte";
	import { getCSSVariable } from "../../common/theme";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/line-ripple/LineRipple:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let active = false;
	/**
	 * Eg: "primary" | "secondary" | "red" | "#ff0000"
	 */
	export let color: string = "initial";
	//#endregion

	//#region implementation
	let lineRipple: MDCLineRipple;
	onMount(() => {
		lineRipple = new MDCLineRipple(dom);
	});

	onDestroy(() => {
		lineRipple && lineRipple.destroy();
	});

	function getActiveColorCSSValue(colorValue: typeof color) {
		const themeVar = getCSSVariable(colorValue as any);
		return themeVar ? `var(${themeVar})` : colorValue;
	}

	export function activate() {
		return lineRipple.activate();
	}

	export function deactivate() {
		return lineRipple.deactivate();
	}

	export function setRippleCenter(xCoordinate: number) {
		return lineRipple.setRippleCenter(xCoordinate);
	}
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-line-ripple",
		[active, "mdc-line-ripple--active"],
	])}
	style={styleList([
		[
			color,
			`--smui-line-ripple--active-color: ${getActiveColorCSSValue(color)};`,
		],
		style,
	])}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:focusin
	on:focusout
/>
