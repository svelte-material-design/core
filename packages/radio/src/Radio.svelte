<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/radio/Radio:${count++}`;

	export let dom: HTMLInputElement = undefined;

	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Radio
	import { MDCRadio } from "@material/radio";
	import { onMount, onDestroy, createEventDispatcher } from "svelte";
	import { getCreateRadioMDCIstance, RadioContext } from "./RadioContext";
	import { getFormFieldContext } from "../../../packages/form-field";
	import { Selectable } from "../../../packages/common/hoc";
	import { RadioChangeEvent } from "./";
	import { Use, UseState } from "../../common/hooks";

	//#region exports
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

	const dispatch = createEventDispatcher<{
		change: RadioChangeEvent;
	}>();

	let inputElement: HTMLInputElement;
	let inputId: string = `${id}--input`;

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

	function isInputDisabled(
		readonlyValue: typeof readonly = readonly,
		disabledValue: typeof disabled = disabled
	) {
		return readonlyValue ? readonlyValue : disabledValue;
	}
</script>

<svelte:options immutable={true} />

<Use effect hook={() => setFormFieldInput(radio)} when={!!radio} />
<UseState value={ripple} onUpdate={istantiate} />

<Selectable bind:value bind:selected={checked}>
	<div class={expandedTouchTarget ? 'mdc-touch-target-wrapper' : undefined}>
		<div
			bind:this={dom}
			{...props}
			{id}
			class={parseClassList([
				className,
				'mdc-radio',
				[expandedTouchTarget, 'mdc-radio--touch'],
				[disabled, 'mdc-radio--disabled'],
				[density, `smui-radio--dense--${Math.abs(density)}`],
			])}
			{style}>
			<input
				bind:this={inputElement}
				class="mdc-radio__native-control"
				id={inputId}
				type="radio"
				disabled={isInputDisabled(readonly, disabled)}
				{name}
				{checked}
				{readonly}
				{value}
				{required}
				on:change={handleChange} />
			<div class="mdc-radio__background">
				<div class="mdc-radio__outer-circle" />
				<div class="mdc-radio__inner-circle" />
			</div>
			<div class="mdc-radio__ripple" />
		</div>
	</div>
</Selectable>
