<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { classList } from "@raythurnevoid/strings-filter";
	import { DOMEventsForwarder } from "../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/notched-outlined/NotchedOutlined:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import type { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// NotchedOutline
	import { MDCNotchedOutline } from "@material/notched-outline";
	import { onMount, onDestroy } from "svelte";

	export let notched = false;
	export let noLabel = false;

	let notchedOutline: MDCNotchedOutline;
	onMount(() => {
		notchedOutline = new MDCNotchedOutline(dom);
	});

	onDestroy(() => {
		notchedOutline && notchedOutline.destroy();
	});

	export function notch(notchWidth) {
		return notchedOutline.notch(notchWidth);
	}

	export function closeNotch() {
		return notchedOutline.closeNotch();
	}
</script>

<div
	bind:this={dom}
	{...props}
	{id}
	class={classList([
		className,
		"mdc-notched-outline",
		[notched, "mdc-notched-outline--notched"],
		[noLabel, "mdc-notched-outline--no-label"],
	])}
	{style}
	use:forwardDOMEvents
>
	<div class="mdc-notched-outline__leading" />
	{#if !noLabel}
		<div class="mdc-notched-outline__notch">
			<slot />
		</div>
	{/if}
	<div class="mdc-notched-outline__trailing" />
</div>
