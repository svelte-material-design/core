<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { MDCIconButtonToggle } from "@material/icon-button";
	import { onDestroy, onMount } from "svelte";
	import IconButton from "./IconButton.svelte";
	import { IconButtonDOM, setIconButtonToggleContext } from ".";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/button/IconButtonToggle:${count++}`;
	export let dom: IconButtonDOM = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let title:
		| string
		| {
				on: string;
				off: string;
		  } = undefined;
	//#endregion

	//#region implementation
	const context$ = setIconButtonToggleContext({ active });
	$: $context$ = { ...$context$, active };

	let toggleButton: MDCIconButtonToggle;
	onMount(() => {
		toggleButton = new MDCIconButtonToggle(dom);
		if (!ripple) {
			toggleButton.ripple.destroy();
		}

		toggleButton.listen(
			"MDCIconButtonToggle:change",
			(event: CustomEvent<{ isOn: boolean }>) => {
				active = event.detail.isOn;
			}
		);
	});

	$: {
		// On active change
		if (toggleButton?.on !== active) {
			toggleButton.on = active;
		}
	}

	onDestroy(() => {
		toggleButton && toggleButton.destroy();
	});

	$: props = {
		...props,
		"data-aria-label-on":
			props["data-aria-label-on"] || typeof title === "string"
				? title
				: title?.on,
		"data-aria-label-off":
			props["data-aria-label-off"] || typeof title === "string"
				? title
				: title?.off,
	};
	//#endregion
</script>

<svelte:options immutable={true} />

<IconButton
	bind:dom
	{...$$restProps}
	{...props}
	{id}
	class={className}
	{style}
	{disabled}
	title={typeof title === 'string' ? title : active ? title && title.on : title && title.off}
	ripple={false}>
	<slot />
</IconButton>
