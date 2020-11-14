<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/checkbox/Checkbox:${count++}`;

	export let dom: HTMLInputElement = undefined;

	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Checkbox
	//#region  imports
	import { MDCCheckbox } from "@material/checkbox";
	import { onMount, onDestroy, tick } from "svelte";
	import {
		CheckboxContext,
		getCheckboxBehaviour,
		getDisableCheckboxMDCIstance,
	} from "./";
	import { getFormFieldContext } from "../../../packages/form-field";
	import { Selectable } from "../../../packages/common/hoc";
	import { createEventDispatcher } from "svelte";
	import { CheckboxChangeEvent } from "./types";
	import { Use, UseState } from "../../common/hooks";
	//#endregion

	//#region exports
	export let checked: boolean = false;
	export let value: any = undefined;
	export let allowIndeterminated: boolean = false;

	export let name: string = undefined;
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let readonly: boolean = undefined;
	//#endregion

	let inputId: string = `${id}-input`;
	let inputElement: HTMLInputElement;

	$: $formFieldContext$?.setInputId(inputId);
	$: if (!allowIndeterminated) tick().then(() => (checked ??= false));

	const dispatch = createEventDispatcher<{
		change: CheckboxChangeEvent;
	}>();
	const behaviour = getCheckboxBehaviour();

	//#region Init contexts
	//const itemContext$ = getItemContext();
	const formFieldContext$ = getFormFieldContext();
	const disableMDC = getDisableCheckboxMDCIstance();

	const context = {} as CheckboxContext;
	$: Object.assign(context, {
		value,
	});
	//#endregion

	let checkbox: MDCCheckbox;
	onMount(async () => {
		if (!disableMDC) {
			checkbox = new MDCCheckbox(dom);
		}
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

	function isInputDisabled(
		readonlyValue: typeof readonly = readonly,
		disabledValue: typeof disabled = disabled
	) {
		return readonlyValue ? readonlyValue : disabledValue;
	}

	function setFormFieldInput() {
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
		if (!checkbox.indeterminate && checked === null) {
			checkbox.indeterminate = true;
		} else if (checkbox.indeterminate && checked !== null) {
			checkbox.indeterminate = false;
		}

		if (checkbox.value !== value) {
			checkbox.value = value;
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

			dispatch("change", {
				checked,
				dom,
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
		}
	}
</script>

<svelte:options immutable={true} />

<Use effect once hook={setFormFieldInput} when={!!checkbox} />
<UseState value={checked} onUpdate={handleValueChange} />

<Selectable bind:value bind:selected={checked}>
	<div
		bind:this={dom}
		{...props}
		{id}
		class={parseClassList([
			className,
			'mdc-checkbox',
			[disabled, 'mdc-checkbox--disabled'],
			[
				behaviour === 'data-table-header',
				'mdc-data-table__header-row-checkbox',
			],
			[behaviour === 'data-table-row', 'mdc-data-table__row-checkbox'],
		])}
		{style}>
		<input
			bind:this={inputElement}
			id={inputId}
			class="mdc-checkbox__native-control"
			type="checkbox"
			disabled={isInputDisabled(readonly, disabled)}
			{name}
			{checked}
			{readonly}
			{value}
			{required}
			on:change={handleChange}
			on:keyup={handleKeyPress} />
		<div class="mdc-checkbox__background">
			<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
				<path
					class="mdc-checkbox__checkmark-path"
					fill="none"
					d="M1.73,12.91 8.1,19.28 22.79,4.59" />
			</svg>
			<div class="mdc-checkbox__mixedmark" />
		</div>
		<div class="mdc-checkbox__ripple" />
	</div>
</Selectable>
