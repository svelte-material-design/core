<script lang="ts">
	//#region imports
	import { Selectable } from "@raythurnevoid/svelte-group-components/esm/selectable";
	import { Tab } from "../../../packages/tab/src/internal";
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

	const tabBarContext$ = getTabBarContext();
	const context$ = setTabContext({
		active,
	});
	$: $context$ = { ...$context$, active };
</script>

<svelte:options immutable={true} />
<Selectable
	{dom}
	bind:value={key}
	bind:selected={active}
	group={$tabBarContext$.group}>
	<Tab
		{...$$restProps}
		bind:dom
		{id}
		class={className}
		{style}
		{active}
		{ripple}
		{key}
		{stacked}
		{useMinWidth}>
		<slot />
	</Tab>
</Selectable>
