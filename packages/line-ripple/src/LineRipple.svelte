<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../common/functions";
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/line-ripple/LineRipple:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// LineRipple
	import { MDCLineRipple } from "@material/line-ripple";
	import { onMount, onDestroy } from "svelte";
	import { getCSSVariable } from "../../common/theme";
	import defaults from "./line-ripple.module.scss";

	export let active = false;
	/**
	 * Eg: "primary" | "secondary" | "red" | "#ff0000"
	 */
	export let color: string = defaults.activeColor;

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
</script>

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		"mdc-line-ripple",
		[active, "mdc-line-ripple--active"],
	])}
	style={parseClassList([
		[
			color,
			`--smui-line-ripple--active-color: ${getActiveColorCSSValue(color)};`,
		],
		style,
	])}
	use:forwardDOMEvents
/>
