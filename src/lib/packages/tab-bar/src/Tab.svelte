<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { Selectable } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { createEventDispatcher, tick } from "svelte";
	import type { OnSelectableChangeEvent } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { Tab } from "../../tab/src/internal";
	import { getTabBarContext, setTabContext } from "./TabBarContext";
	import type { TabContext } from "./TabBarContext";
	import type { TabElement, OnTabChange } from "./types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: TabElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let value: string = undefined;
	export let stacked: boolean = false;
	export let useMinWidth: boolean = false;
	export let selected: boolean = false;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnTabChange;
	}>();

	const tabBarContext$ = getTabBarContext();
	const context = {
		value,
		selected,
	} as TabContext;
	const context$ = setTabContext(context);
	$: $context$ = {
		...Object.assign(context, { ...$context$, value, selected }),
	};

	async function handleChange(event: CustomEvent<OnSelectableChangeEvent>) {
		if (selected !== event.detail.selected) {
			selected = event.detail.selected;
			await tick();
		}
		dispatch("change", { dom, selected });
	}
	//#endregion
</script>

<Selectable
	{dom}
	bind:value
	bind:selected
	group={$tabBarContext$.group}
	on:change={handleChange}
>
	<Tab
		bind:dom
		{id}
		class={className}
		{style}
		{selected}
		{ripple}
		{value}
		{stacked}
		{useMinWidth}
		{...$$restProps}
		on:click
		on:mousedown
		on:mouseup
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:focusin
		on:focusout
	>
		<slot />
	</Tab>
</Selectable>
