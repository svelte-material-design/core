<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { MDCCheckbox } from "@material/checkbox";
	import { onMount, onDestroy, tick } from "svelte";
	import type { CheckboxContext } from "../";
	import { getFormFieldContext } from "../../../form-field";
	import { createEventDispatcher } from "svelte";
	import type { CheckboxChangeEvent } from "../types";
	import { Use, UseState } from "@raythurnevoid/svelte-hooks";
	import { Checkbox } from "../dom";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLInputElement = undefined;
	//#endregion

	export let checked: boolean = false;
	export let value: string = undefined;
	export let allowIndeterminated: boolean = false;
	export let ripple: boolean = true;
	export let expandedTouchTarget: boolean = true;
	export let density: number = undefined;

	export let name: string = undefined;
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let readonly: boolean = undefined;

	export let disableMDCInstance: boolean = false;

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
		change: CheckboxChangeEvent;
	}>();

	let inputId: string;
	let inputElement: HTMLInputElement;

	$: $formFieldContext$?.setInputId(inputId);
	$: if (!allowIndeterminated && checked == null)
		tick().then(() => (checked ??= false)); // is tick needed?

	//#region Init contexts
	const formFieldContext$ = getFormFieldContext();

	const context = {} as CheckboxContext;
	$: Object.assign(context, {
		value,
	});
	//#endregion

	let checkbox: MDCCheckbox;
	onMount(async () => {
		reistantiate();
	});

	$: if (checkbox) {
		if (checkbox.checked !== checked) {
			checkbox.checked = checked;
		}

		if (checkbox.disabled !== disabled) {
			checkbox.disabled = disabled;
		}
	}

	onDestroy(() => {
		checkbox && checkbox.destroy();
	});

	function reistantiate() {
		if (disableMDCInstance !== false) {
			checkbox?.destroy();
			checkbox = new MDCCheckbox(dom);

			if (!ripple) {
				checkbox.ripple.destroy();
			}
		}
	}

	function isInputDisabled(
		readonlyValue: typeof readonly = readonly,
		disabledValue: typeof disabled = disabled
	) {
		return readonlyValue ? readonlyValue : disabledValue;
	}

	function setFormFieldInput(checkbox: MDCCheckbox) {
		$formFieldContext$?.setInput(checkbox);
	}

	function setChecked(newValue: boolean) {
		if (checked !== newValue) {
			checked = newValue;
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === " " || event.key === "Enter") {
			setChecked(!checked);
		}
	}

	function updateMDCValue() {
		if (checkbox) {
			if (!checkbox.indeterminate && checked === null) {
				checkbox.indeterminate = true;
			} else if (checkbox.indeterminate && checked !== null) {
				checkbox.indeterminate = false;
			}

			if (checkbox.value !== value) {
				checkbox.value = value;
			}
		}
	}

	function handleValueChange() {
		if (!allowIndeterminated && checked == null) {
			tick().then(() => (checked = false));
		} else {
			updateMDCValue();

			tick().then(() => {
				inputElement.disabled = isInputDisabled();
			});
		}
	}

	function handleChange() {
		if (checkbox) {
			if (allowIndeterminated && checked === false && checkbox.checked) {
				setChecked(null);
			} else {
				setChecked(checkbox.checked);
			}

			dispatch("change", {
				checked,
				dom,
			});
		}
	}
	//#endregion
</script>

<Use effect hook={() => setFormFieldInput(checkbox)} when={!!checkbox} />
<UseState value={checked} onUpdate={handleValueChange} />
<UseState value={ripple} onUpdate={reistantiate} />

<Checkbox
	bind:dom
	bind:inputElement
	bind:inputId
	class={className}
	{style}
	{id}
	{checked}
	{value}
	{expandedTouchTarget}
	{density}
	{name}
	{disabled}
	{required}
	{readonly}
	{...$$restProps}
	on:change={handleChange}
	on:keyup={handleKeyPress}
/>
