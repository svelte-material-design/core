<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region imports
	import { MDCIconButtonToggle } from "@material/icon-button";
	import { onDestroy, onMount } from "svelte";
	import IconButton from "./IconButton.svelte";
	import { setIconButtonToggleContext } from ".";
	import type { IconButtonDOM, SwitchableString } from ".";
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
	export let title: SwitchableString = undefined;
	export let ariaLabel: SwitchableString = undefined;
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
		if (toggleButton && toggleButton.on !== active) {
			toggleButton.on = active;
		}
	}

	onDestroy(() => {
		toggleButton && toggleButton.destroy();
	});

	function getOnOffData(data: SwitchableString, active: boolean) {
		if (!data || typeof data === "string") {
			return data;
		} else {
			if (active) {
				return data.on;
			} else {
				return data.off;
			}
		}
	}
	//#endregion
</script>

<svelte:options immutable={true} />

<IconButton
	bind:dom
	{...$$restProps}
	{id}
	class={className}
	{style}
	{disabled}
	ripple={false}
	title={getOnOffData(title, active)}
	data-aria-label-on={getOnOffData(ariaLabel, true) || getOnOffData(title, true)}
	data-aria-label-off={getOnOffData(ariaLabel, false) || getOnOffData(title, false)}>
	<slot />
</IconButton>
