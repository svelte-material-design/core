<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { Input } from "../dom";
	import { getSwitchContext } from "../SwitchContext";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { tick } from "svelte";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLInputElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	const switchContext$ = getSwitchContext();

	$: inputId = getInputId(id, $switchContext$.id);
	$: $switchContext$.setInputId(inputId);

	async function setSwitchInput() {
		await tick();
		$switchContext$.setInput(dom);
	}

	function getInputId(id: string, switchId: string) {
		return id || `${switchId}__input`;
	}
	//#endregion
</script>

<UseState value={dom} onUpdate={setSwitchInput} />

<Input
	bind:dom
	id={inputId}
	class={className}
	{style}
	checked={$switchContext$.checked}
	disabled={$switchContext$.disabled}
	readonly={$switchContext$.readonly}
	value={$switchContext$.value}
	{...$$restProps}
	on:change
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:focusin
	on:focusout
/>
