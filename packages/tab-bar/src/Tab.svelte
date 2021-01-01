<script lang="ts">
	//#region imports
	import { Selectable } from "@raythurnevoid/svelte-group-components/esm/selectable";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { createEventDispatcher, tick } from "svelte";
	import type { OnTabChange, TabContext } from ".";
	import { Tab } from "../../tab/src/internal";
	import { getTabBarContext, setTabContext } from "./TabBarContext";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLButtonElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let key: any = undefined;
	export let stacked: boolean = false;
	export let useMinWidth: boolean = false;
	export let active: boolean = false;
	//#endregion

	const dispatch = createEventDispatcher<{
		change: OnTabChange;
	}>();

	let internalActive: boolean = active;
	let activeState: UseState;

	const tabBarContext$ = getTabBarContext();
	const context = {
		key,
		active,
		async setActive(newValue: boolean) {
			internalActive = active = newValue;
			activeState.setValue(active);

			await tick();

			dispatch("change", { dom, key, active });
		},
	} as TabContext;
	const context$ = setTabContext(context);

	$: $context$ = { ...Object.assign(context, { ...$context$, key, active }) };
	$: console.log($context$);

	function handleActiveChange() {
		if (active) {
			$tabBarContext$.setActive(context);
		}
	}
</script>

<svelte:options immutable={true} />

<UseState
	bind:this={activeState}
	value={active}
	onUpdate={handleActiveChange} />

<Selectable
	{dom}
	bind:value={key}
	bind:selected={active}
	group={$tabBarContext$.group}
	{context}>
	<Tab
		{...$$restProps}
		bind:dom
		{id}
		class={className}
		{style}
		active={internalActive}
		{ripple}
		{key}
		{stacked}
		{useMinWidth}>
		<slot />
	</Tab>
</Selectable>
