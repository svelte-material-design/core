<script context="module" lang="ts">
	let count: number = 0;
</script>

<script lang="ts">
	//#region Base
	import { DOMEventsForwarder } from "../../../packages/common/events";
	const forwardDOMEvents = DOMEventsForwarder();
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `../../../packages/select/Option:${count++}`;

	export let dom: HTMLLIElement = undefined;

	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	import { Item, Content } from "../../../packages/list";

	export let value: string = "";
	export let selected: boolean = undefined;
	export let disabled: boolean = false;

	$: if (value == null) value = "";
</script>

<Item
	bind:dom
	{...props}
	{id}
	class={className}
	{style}
	{value}
	{selected}
	{disabled}
	role="option"
	on:domEvent={forwardDOMEvents}>
	<Content>
		<slot />
	</Content>
</Item>

<!-- {#if enhanced}
  <Item
    use={[forwardEvents, ...use]}
    data-value={value}
    {selected}
    {...props}
  ><slot></slot></Item>
{:else}
  <option
    use:useActions={use}
    use:forwardEvents
    {value}
    {...selectedProp}
    {...props}
  ><slot></slot></option>
{/if} -->
