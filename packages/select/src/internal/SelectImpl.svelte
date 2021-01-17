<svelte:options immutable={true} />

<script lang="ts">
	import { parseClassList } from "../../../common/functions";
	import { MDCSelect, MDCSelectEvent } from "@material/select";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { Menu } from "../../../menu/src/internal";
	import { FloatingLabel } from "../../../floating-label";
	import { LineRipple } from "../../../line-ripple";
	import { NotchedOutline } from "../../../notched-outline";
	import { Span } from "../../../common/dom";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import {
		createSelectContext,
		OnSelectChangeEventDetail,
		SelectVariant,
	} from "..";
	import { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let ripple: boolean = true;
	export let lineRipple: boolean = true;
	export let dirty = false;
	export let variant: SelectVariant = "filled";
	export let value: string = null;

	export let customValidation: (value: string) => boolean = undefined;

	export let title: string = undefined;
	export let name: string = undefined;
	export let ariaLabel: string = undefined;
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let invalid: boolean = false;
	export let required: boolean = false;

	$: invalid = customValidation ? !customValidation(value) : invalid;

	//#region theming
	export let shapeRadius: string = undefined;
	export let density: number = undefined;

	$: if (density != undefined) {
		if (density < -4) {
			density = -4;
		} else if (density > 0) {
			density = 0;
		}
	}

	export let group: SelectionGroupBinding;

	//#region slots
	let parentSlots: typeof $$slots;
	export { parentSlots as slots };
	//#endregion
	//#endregion

	let helperTextId: string;
	let labelId: string;
	$: labelId = parentSlots.label ? `${id}--selected-text` : undefined;
	let selectedTextId: string;
	$: selectedTextId = value ? `${id}--selected-text` : undefined;

	const context$ = createSelectContext({
		setHelperTextId(value: string) {
			helperTextId = value;
		},
		group,
	});

	$: $context$ = { ...$context$, group };

	const dispatch = createEventDispatcher<{
		change: OnSelectChangeEventDetail;
	}>();

	let select: MDCSelect;
	onMount(async () => {
		reistantiate();
	});

	$: if (select) {
		if (select.disabled !== disabled) {
			select.disabled = disabled;
		}

		if (select.required !== required) {
			select.required = required;
		}

		if (select.required === invalid) {
			select.valid = !invalid;
		}
	}

	onDestroy(() => {
		select?.destroy();
	});

	function reistantiate(
		_dom?: typeof dom,
		_ripple?: typeof ripple,
		_variant?: typeof variant
	) {
		select?.destroy();
		select = new MDCSelect(dom);

		select.listen("MDCSelect:change", handleChange);

		setSelectValue(value);
	}

	function handleChange(event: MDCSelectEvent) {
		setValue(event.detail.value);
		dirty = true;

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

	function stopPropagationOnReadOnly(event: Event) {
		if (readonly) event.stopImmediatePropagation();
	}

	export async function updateOptions() {
		const oldValue = value;

		select.layoutOptions();
		select.layout();

		await tick();

		if (oldValue !== value) {
			dispatch("change", {
				value,
				dom,
			});
		}
	}
</script>

<UseState {value} onUpdate={onValueChange} />

<UseState value={variant} onUpdate={reistantiate} />
<UseState value={ripple} onUpdate={reistantiate} />
<UseState value={lineRipple} onUpdate={reistantiate} />

<div class={"smui-select"}>
	<div
		bind:this={dom}
		{...$$restProps}
		{id}
		class={parseClassList([
			className,
			"mdc-select",
			[variant === "filled", "mdc-select--filled"],
			[variant === "outlined", "mdc-select--outlined"],
			[disabled, "mdc-select--disabled"],
			[required, "mdc-select--required"],
			[parentSlots.leadingIcon, "mdc-select--with-leading-icon"],
			[invalid, "mdc-select--invalid"],
			[!parentSlots.label, "mdc-select--no-label"],
			[
				variant == "filled" && !parentSlots.leadingIcon && density,
				`smui-input-field--filled--dense--${Math.abs(density)}`,
			],
			[
				variant == "filled" && parentSlots.leadingIcon && density,
				`smui-input-field--filled--with-leading-icon--dense--${Math.abs(
					density
				)}`,
			],
			[
				variant == "outlined" && !parentSlots.leadingIcon && density,
				`smui-input-field--outlined--dense--${Math.abs(density)}`,
			],
			[
				variant == "outlined" && parentSlots.leadingIcon && density,
				`smui-input-field--outlined--with-leading-icon--dense--${Math.abs(
					density
				)}`,
			],
		])}
		style={parseClassList([
			style,
			[shapeRadius, `--smui-select--shape-radius: ${shapeRadius};`],
			[density, `--smui-select--density: ${density};`],
		])}
		{title}
	>
		<input type="hidden" {name} {readonly} {disabled} bind:value />
		<div
			class="mdc-select__anchor"
			role="button"
			aria-haspopup="listbox"
			aria-labelledby={parseClassList([labelId, selectedTextId])}
			aria-required={required || null}
			aria-disabled={disabled || null}
			aria-controls={helperTextId}
			aria-describedby={helperTextId}
			aria-readonly={readonly}
			aria-label={!labelId && !value ? ariaLabel : undefined}
			on:click={stopPropagationOnReadOnly}
			on:focus={stopPropagationOnReadOnly}
		>
			{#if ripple && variant === "filled"}
				<span class="mdc-select__ripple" />
			{/if}
			{#if variant === "filled"}
				{#if parentSlots.label}
					<FloatingLabel component={Span}>
						<slot name="label" />
					</FloatingLabel>
				{/if}
				{#if parentSlots.leadingIcon}
					<slot name="leadingIcon" />
				{/if}
				{#if lineRipple}
					<LineRipple />
				{/if}
			{:else if variant === "outlined"}
				<NotchedOutline noLabel={!parentSlots.label}>
					{#if parentSlots.label}
						<FloatingLabel component={Span}>
							<slot name="label" />
						</FloatingLabel>
					{/if}
				</NotchedOutline>
				{#if parentSlots.leadingIcon}
					<slot name="leadingIcon" />
				{/if}
			{/if}
			<span class="mdc-select__selected-text-container">
				<span id={selectedTextId} class="mdc-select__selected-text"
					>{value}</span
				>
			</span>
			<span class="mdc-select__dropdown-icon">
				<svg
					class="mdc-select__dropdown-icon-graphic"
					viewBox="7 10 10 5"
					focusable="false">
					<polygon
						class="mdc-select__dropdown-icon-inactive"
						stroke="none"
						fill-rule="evenodd"
						points="7 10 12 15 17 10"
					/>
					<polygon
						class="mdc-select__dropdown-icon-active"
						stroke="none"
						fill-rule="evenodd"
						points="7 15 12 10 17 15"
					/>
				</svg>
			</span>
		</div>

		<Menu
			class="mdc-select__menu"
			variant="fullwidth"
			{group}
			disableMDCInstance
		>
			<slot name="options" />
		</Menu>
	</div>
	<slot />
</div>

<style lang="scss">
	.smui-select {
		:global([slot="leadingIcon"], [slot="options"]) {
			display: contents;
		}
	}
</style>
