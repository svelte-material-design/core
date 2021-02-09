<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import {
		MDCIconButtonToggle,
		MDCIconButtonToggleEventDetail,
	} from "@material/icon-button";
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
	import { IconButton } from "../../../icon-button/src/internal";
	import type { IconButtonColor, OnIconButtonToggleChange } from "..";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let color: IconButtonColor = undefined;
	export let ariaLabelOn: string = undefined;
	export let ariaLabelOff: string = undefined;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnIconButtonToggleChange;
	}>();

	let toggleButton: MDCIconButtonToggle;

	onMount(() => {
		initialize();
	});

	$: if (toggleButton && toggleButton.on !== active) {
		toggleButton.on = active;
	}

	onDestroy(() => {
		toggleButton && toggleButton.destroy();
	});

	function initialize() {
		toggleButton?.destroy();
		toggleButton = new MDCIconButtonToggle(dom);
		if (!ripple) {
			toggleButton.ripple.destroy();
		}

		toggleButton.listen("MDCIconButtonToggle:change", handleChange);
	}

	async function handleChange(
		event: CustomEvent<MDCIconButtonToggleEventDetail>
	) {
		active = event.detail.isOn;

		await tick();

		dispatch("change", {
			dom,
			active,
		});
	}
	//#endregion
</script>

<UseState value={ripple} onUpdate={initialize} />

<IconButton
	bind:dom
	{id}
	class={className}
	{style}
	{disabled}
	{color}
	ripple={false}
	data-aria-label-on={ariaLabelOn}
	data-aria-label-off={ariaLabelOff}
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
</IconButton>
