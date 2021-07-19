<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { MDCCheckbox } from "@material/checkbox";
	import { onMount, onDestroy, tick } from "svelte";
	import { getFormFieldContext } from "../../../form-field/index.js";
	import { createEventDispatcher } from "svelte";
	import type { OnCheckboxChangeEvent } from "../types.js";
	import { Use, UseState } from "@raythurnevoid/svelte-hooks";
	import { Checkbox } from "../dom/index.js";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let checked: boolean = false;
	export let value: string = undefined;
	export let allowIndeterminated: boolean = false;
	export let ripple: boolean = true;
	export let accessibleTouch: boolean = true;
	export let density: number = undefined;

	export let disabled: boolean = false;
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
	const dispatch =
		createEventDispatcher<{
			change: OnCheckboxChangeEvent;
		}>();

	let inputElement: HTMLInputElement;
	let inputId: string;

	$: $formFieldContext$?.setInputId(inputId);
	$: if (!allowIndeterminated && checked == null)
		tick().then(() => (checked ??= false)); // is tick needed?

	const formFieldContext$ = getFormFieldContext();

	let checkbox: MDCCheckbox;
	onMount(async () => {
		reistantiate();
	});

	$: if (checkbox) {
		if (checkbox.value !== value) {
			checkbox.value = value;
		}

		if (checkbox.disabled !== disabled) {
			checkbox.disabled = disabled;
		}
	}

	onDestroy(() => {
		checkbox && checkbox.destroy();
	});

	function reistantiate() {
		if (disableMDCInstance !== true) {
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

	function updateMDCValue() {
		if (checkbox) {
			if (allowIndeterminated && checked === null) {
				if (!checkbox.indeterminate) {
					checkbox.indeterminate = true;
					if (checkbox.checked) {
						checkbox.checked = false;
					}
				}
			} else if (checkbox.indeterminate) {
				checkbox.indeterminate = false;
			}

			if (checkbox.checked !== checked && checked != null) {
				checkbox.checked = checked;
			}
		}
	}

	function handleCheckedChange() {
		if (!allowIndeterminated && checked == null) {
			tick().then(() => (checked = false));
		} else {
			updateMDCValue();

			tick().then(() => {
				inputElement.disabled = isInputDisabled();
			});
		}
	}

	function cycleChecked() {
		if (allowIndeterminated && checked === false && inputElement.checked) {
			checked = null;
		} else if (checked) {
			checked = false;
		} else {
			checked = true;
		}
	}

	async function handleKeyPress(event: KeyboardEvent) {
		if (event.key === " " || event.key === "Enter") {
			cycleChecked();
		}

		await tick();

		dispatch("change", {
			checked,
			dom,
		});
	}

	async function handleChange() {
		cycleChecked();

		await tick();

		dispatch("change", {
			checked,
			dom,
		});
	}
	//#endregion
</script>

<Use effect hook={() => setFormFieldInput(checkbox)} when={!!checkbox} />
<UseState value={checked} onUpdate={handleCheckedChange} />
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
	{ripple}
	{accessibleTouch}
	{density}
	{disabled}
	{readonly}
	{...$$restProps}
	on:change={handleChange}
	on:keyup={handleKeyPress}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
/>
