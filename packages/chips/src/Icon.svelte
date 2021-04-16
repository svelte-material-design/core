<svelte:options immutable={true} />

<script lang="ts">
	// Base
	import { DOMEventsForwarder } from "../../common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;

	export let dom: GraphicDOM = undefined;
	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};

	// Icon
	import type { GraphicDOM, GraphicType } from "../../common/components";
	import { Graphic } from "../../common/components";
	import { classList } from "@raythurnevoid/strings-filter";
	import { onMount, tick } from "svelte";
	import { getChipContext } from "./ChipContext";
	import { getChipSetContext } from "./ChipSetContext";

	export let type: GraphicType = "icon";

	const chipContext$ = getChipContext();
	const chipSetContext$ = getChipSetContext();

	let leadingHidden: boolean = $chipContext$.selected;
	let leading: boolean = false;
	let trailing: boolean = false;

	onMount(() => {
		const chipElement = dom.parentElement;
		const chipChildren = Array.from(chipElement.children);
		const chipText = chipChildren.find(
			(child) => child.getAttribute("role") === "gridcell"
		);
		const chipTextIndex = chipChildren.indexOf(chipText);
		const selfIndex = chipChildren.indexOf(dom);

		if (selfIndex < chipTextIndex) {
			leading = true;
		} else {
			trailing = true;
		}

		tick().then(() => {
			$chipContext$?.reinitializeMDC();
		});
	});

	$: leadingHidden =
		$chipContext$.selected && $chipSetContext$.variant === "filter";
</script>

<Graphic
	bind:dom
	{props}
	{id}
	class={classList([
		className,
		"mdc-chip__icon",
		[type === "icon" && className == undefined, "material-icons"],
		[leading, "mdc-chip__icon--leading"],
		[leadingHidden, "mdc-chip__icon--leading-hidden"],
		[trailing, "mdc-chip__icon--trailing mdc-chip-trailing-action"],
	])}
	{style}
	{type}
	on:domEvent={forwardDOMEvents}
>
	<slot />
</Graphic>
