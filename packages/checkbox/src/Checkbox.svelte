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
	export let value: string = undefined;
	export let allowIndeterminated: boolean = false;
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

	const dispatch = createEventDispatcher<{
		change: CheckboxChangeEvent;
	}>();

	let inputId: string = `${id}-input`;
	let inputElement: HTMLInputElement;

	$: $formFieldContext$?.setInputId(inputId);
	$: if (!allowIndeterminated && checked == null)
		tick().then(() => (checked ??= false)); // is tick needed?

	const behaviour = getCheckboxBehaviour();

	//#region Init contexts
	const formFieldContext$ = getFormFieldContext();
	const disableMDC = getDisableCheckboxMDCIstance();

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
		if (!disableMDC) {
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
</script>

<svelte:options immutable={true} />

<Use effect hook={() => setFormFieldInput(checkbox)} when={!!checkbox} />
<UseState value={checked} onUpdate={handleValueChange} />
<UseState value={ripple} onUpdate={reistantiate} />

<Selectable bind:value bind:selected={checked}>
	<div class={expandedTouchTarget ? 'mdc-touch-target-wrapper' : undefined}>
		<div
			bind:this={dom}
			{...props}
			{id}
			class={parseClassList([
				className,
				'mdc-checkbox',
				[expandedTouchTarget, 'mdc-checkbox--touch'],
				[disabled, 'mdc-checkbox--disabled'],
				[
					behaviour === 'data-table-header',
					'mdc-data-table__header-row-checkbox',
				],
				[behaviour === 'data-table-row', 'mdc-data-table__row-checkbox'],
				[density, `smui-checkbox--dense--${Math.abs(density)}`],
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
				data-indeterminate={checked == null ? 'true' : undefined}
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
	</div>
</Selectable>
