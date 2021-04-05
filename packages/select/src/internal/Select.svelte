<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { MDCSelect } from "@material/select";
	import type { MDCSelectEvent } from "@material/select";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { Select } from "../dom";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { createSelectContext } from "..";
	import type { SelectVariant, OnSelectChange } from "../types";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let lineRipple: boolean = true;
	export let variant: SelectVariant = "filled";
	export let value: string = null;

	export let customValidation: (value: string) => boolean = undefined;

	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let invalid: boolean = false;
	export let required: boolean = false;

	$: invalid = customValidation ? !customValidation(value) : invalid;

	export let group: SelectionGroupBinding;
	//#endregion

	//#region implementation
	let helperTextId: string;
	let inputElement: HTMLInputElement;

	const context$ = createSelectContext({
		id,
		group,
		readonly,
		disabled,
		required,
		ripple,
		lineRipple,
		variant,
		value,
		invalid,
		setInputElement(element: HTMLInputElement) {
			inputElement = element;
		},
		setHelperTextId(value: string) {
			helperTextId = value;
		},
	});

	$: $context$ = {
		...$context$,
		group,
		helperTextId,
		readonly,
		disabled,
		required,
		ripple,
		lineRipple,
		variant,
		value,
		invalid,
	};

	const dispatch = createEventDispatcher<{
		change: OnSelectChange;
	}>();

	let select: MDCSelect;
	onMount(async () => {
		istantiate();
	});

	$: if (select) {
		if (select.disabled !== disabled) {
			select.disabled = disabled;
		}

		if (select.required !== required) {
			select.required = required;
		}

		if (select.valid === invalid) {
			select.valid = !invalid;
		}
	}

	onDestroy(() => {
		select?.destroy();
	});

	function istantiate(...args: any) {
		if (dom && inputElement) {
			select?.destroy();
			select = new MDCSelect(dom);

			select.listen("MDCSelect:change", handleChange);

			value = inputElement.value;

			setSelectValue(value);
		}
	}

	function handleChange(event: MDCSelectEvent) {
		setValue(event.detail.value);

		dispatch("change", {
			value,
			dom,
		});
	}

	function setSelectValue(newValue: string) {
		newValue ??= "";
		if (select && select.value !== newValue) {
			select.value = newValue; // For MDC null, undefined get always translated to "".
		}
	}

	function setValue(newValue: string) {
		if (!value && !newValue) return; // For MDC null, undefined get always translated to "".
		value = newValue;
	}

	function onValueChange(oldValue: any) {
		setSelectValue(value);

		if (value !== oldValue && customValidation) {
			invalid = !customValidation(value);
		}
	}

	export async function updateOptions() {
		const oldValue = value;

		istantiate();

		await tick();

		if (oldValue !== value) {
			dispatch("change", {
				value,
				dom,
			});
		}
	}
	//#endregion
</script>

<UseState {value} onUpdate={onValueChange} />
<UseState
	value={[variant, ripple, lineRipple, dom, inputElement]}
	onUpdate={istantiate}
/>

<Select
	bind:dom
	{id}
	class={classList([className, "smui-select"])}
	{style}
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
</Select>
