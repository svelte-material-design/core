<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { MDCRadio } from "@material/radio";
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { getCreateRadioMDCIstance, RadioContext } from "./RadioContext";
	import { getFormFieldContext } from "../../form-field";
	import { Selectable } from "../../common/hoc";
	import type { RadioChangeEvent } from "./";
	import { Use, UseState } from "@raythurnevoid/svelte-hooks";
	import { Radio } from "./dom";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/radio/Radio:${count++}`;
	export let dom: HTMLInputElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let checked: boolean = false;
	export let ripple: boolean = true;
	export let expandedTouchTarget: boolean = true;
	export let density: number = undefined;

	export let name: string = undefined;
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let readonly: boolean = undefined;

	$: if (density != undefined) {
		if (density < -3) {
			density = -3;
		} else if (density > 0) {
			density = 0;
		}
	}
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		change: RadioChangeEvent;
	}>();

	let inputElement: HTMLInputElement;
	let inputId: string;

	$: $formFieldContext$?.setInputId(inputId);

	//#region Init contexts
	let createMDCInstance = getCreateRadioMDCIstance();
	let formFieldContext$ = getFormFieldContext();

	$: $formFieldContext$?.setInputId(inputId);

	const context = {
		setSelected(selected) {
			checked = selected;
		},
	} as RadioContext;
	$: Object.assign(context, {
		value,
	} as RadioContext);
	//#endregion

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
		if (createMDCInstance !== false) {
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

	function handleChange() {
		checked = inputElement.checked;

		dispatch("change", {
			dom,
			checked,
		});
	}
	//#endregion
</script>

<Use effect hook={() => setFormFieldInput(radio)} when={!!radio} />
<UseState value={ripple} onUpdate={istantiate} />

<Selectable bind:value bind:selected={checked}>
	<Radio
		bind:dom
		bind:inputElement
		bind:inputId
		{className}
		{style}
		{id}
		{value}
		{checked}
		{expandedTouchTarget}
		{density}
		{name}
		{disabled}
		{required}
		{readonly}
		on:change={handleChange}
	/>
</Selectable>
