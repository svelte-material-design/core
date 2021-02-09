<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { MDCRadio } from "@material/radio";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { getFormFieldContext } from "../../../form-field";
	import type { OnRadioChangeEvent } from "../types";
	import { Use, UseState } from "@raythurnevoid/svelte-hooks";
	import { Radio } from "../dom";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/radio/Radio:${count++}`;
	export let dom: HTMLInputElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let checked: boolean = false;
	export let ripple: boolean = true;
	export let accessibleTouch: boolean = true;
	export let density: number = undefined;
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	export let disableMDCInstance: boolean = false;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: OnRadioChangeEvent;
	}>();

	let inputElement: HTMLInputElement;
	let inputId: string;

	let formFieldContext$ = getFormFieldContext();

	$: $formFieldContext$?.setInputId(inputId);

	let radio: MDCRadio;
	onMount(() => {
		istantiate();
	});

	$: if (radio) {
		if (radio.checked !== checked) {
			radio.checked = checked;
		}

		if (radio.disabled !== disabled) {
			radio.disabled = disabled;
		}

		if (radio.value !== value) {
			radio.value = value;
		}
	}

	$: if (radio && $formFieldContext$?.instance) {
		$formFieldContext$.instance.input = radio;
	}

	onDestroy(() => {
		radio && radio.destroy();
	});

	function istantiate() {
		if (disableMDCInstance !== false) {
			radio?.destroy();

			radio = new MDCRadio(dom);

			if (!ripple) {
				radio.ripple.destroy();
			}
		}
	}

	function setFormFieldInput(radio: MDCRadio) {
		$formFieldContext$?.setInput(radio);
	}

	async function handleChange() {
		checked = inputElement.checked;

		await tick();

		dispatch("change", {
			dom,
			checked,
		});
	}
	//#endregion
</script>

<Use effect hook={() => setFormFieldInput(radio)} when={!!radio} />
<UseState value={ripple} onUpdate={istantiate} />

<Radio
	bind:dom
	bind:inputElement
	bind:inputId
	{className}
	{style}
	{id}
	{value}
	{checked}
	{accessibleTouch}
	{density}
	{disabled}
	{readonly}
	{...$$restProps}
	on:change={handleChange}
/>
