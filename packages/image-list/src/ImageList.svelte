<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;

	interface AspectWidthHeight {
		width: number;
		height: number;
	}
</script>

<script lang="ts">
	//#region Base
	import { classList } from "@raythurnevoid/strings-filter";
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/image-list/ImageList:${count++}`;

	export let dom: HTMLUListElement = undefined;
	import type { BaseProps } from "../../common/dom/Props";
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
	export let textProtection: boolean = false;
	export let columns: number = defaultColumns;
	/**
	 * Eg: "12px" | "1em"
	 */
	export let gap: string = defaultStandardGap;
	/**
	 * Eg: "1:1" | "16:9" | "4:3"
	 */
	export let aspect: string = "1:1";

	$: if (!variant) variant = "standard";

	$: if (!gap == null)
		gap = variant === "standard" ? defaultStandardGap : defaultMasonryGap;

	$: if (columns < 0) columns = columns = 0;
	$: if (columns == null) columns = defaultColumns;

	$: aspectObj = getAspectWidthHeight(aspect);
	$: aspectRatio = aspectObj.width / aspectObj.height;

	function getAspectWidthHeight(aspectValue: typeof aspect): AspectWidthHeight {
		const [widthString, heightString] = aspectValue?.split(":") ?? "";
		const width = Number(widthString);
		const height = Number(heightString);
		let res: AspectWidthHeight;

		if (!width || !height) {
			res = {
				width: 1,
				height: 1,
			};
		} else {
			res = { width, height };
		}

		aspect = `${res.width}:${res.height}`;

		return res;
	}
</script>

<ul
	bind:this={dom}
	{...props}
	{id}
	class={classList([
		className,
		"smui-image-list",
		"mdc-image-list",
		[variant === "standard", "smui-image-list--standard-columns"],
		[variant === "masonry", "smui-image-list--masonry-columns"],
		[variant === "masonry", "mdc-image-list--masonry"],
		[textProtection, "mdc-image-list--with-text-protection"],
	])}
	style={classList([
		style,
		`--smui-image-list--columns: ${columns};`,
		[gap, `--smui-image-list--gap: ${gap};`],
		[aspectRatio !== 1, `--smui-image-list--aspect-ratio: ${aspectRatio};`],
	])}
	use:forwardDOMEvents
>
	<slot />
</ul>
