<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../packages/common/functions";
	import { DOMEventsForwarder } from "../../../packages/common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/image-list/ImageList:${count++}`;

	export let dom: HTMLUListElement = undefined;
	import { BaseProps } from "../../../packages/common/dom/Props";
	import { ImageListVariant } from "./types";
	export let props: BaseProps = {};
	//#endregion

	// IconButton
	import {
		defaultColumns,
		defaultStandardGap,
		defaultMasonryGap,
	} from "./image-list.module.scss";

	export let variant: ImageListVariant = "standard";
	export let withTextProtection: boolean = false;
	export let columns: number = defaultColumns;
	/**
	 * Eg: "12px" or "1em"
	 */
	export let gap: string = defaultStandardGap;

	$: if (!variant) variant = "standard";
	$: if (!gap == null)
		gap = variant === "standard" ? defaultStandardGap : defaultMasonryGap;
	$: if (columns < 0) columns = columns = 0;
	$: if (columns == null) columns = defaultColumns;
</script>

<ul
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-image-list',
		[variant === 'standard', 'smui-image-list--standard-columns'],
		[variant === 'masonry', 'smui-image-list--masonry-columns'],
		[variant === 'masonry', 'mdc-image-list--masonry'],
		[withTextProtection, 'mdc-image-list--with-text-protection'],
	])}
	style={parseClassList([
		style,
		`--smui-image-list--columns: ${columns};`,
		[gap, `--smui-image-list--gap: ${gap};`],
	])}
	use:forwardDOMEvents>
	<slot />
</ul>
