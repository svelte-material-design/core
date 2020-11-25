<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { parseClassList } from "../../../packages/common/functions";
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/select/Select:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "../../../packages/common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Select
	import { MDCSelect, MDCSelectEvent } from "@material/select";
	import {
		onMount,
		onDestroy,
		setContext,
		createEventDispatcher,
		tick,
	} from "svelte";
	import { Menu } from "../../../packages/menu";
	import { List } from "../../../packages/list";
	import { FloatingLabel } from "../../../packages/floating-label";
	import { LineRipple } from "../../../packages/line-ripple";
	import { NotchedOutline } from "../../../packages/notched-outline";
	import { setCreateMDCMenuInstance } from "../../../packages/menu";
	import { Span } from "../../../packages/common/dom";
	import { OnSelectChangeEventDetail, SelectVariant } from "./";
	import { Use, UseState } from "../../../packages/common/hooks";
	import {
		OnSelectableGroupChange,
		SelectableGroup,
	} from "../../../packages/common/hoc";
	import { createSelectContext } from "./";
	import { ExtractNamedSlot } from "../../common";

	//#region exports
	export let ripple: boolean = true;
	export let lineRipple: boolean = true;
	export let dirty = false;
	export let variant: SelectVariant = "filled";
	export let value: string = null;
	export let nullable: boolean = true;

	export let customValidation: (value: string) => boolean = undefined;

	export let title: string = undefined;
	export let name: string = undefined;
	export let ariaLabel: string = undefined;
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let invalid: boolean = false;
	export let required: boolean = false;

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
	//#endregion

	$: invalid = customValidation ? !customValidation(value) : invalid;
	//#endregion

	let helperTextId: string;
	let labelId: string;
	$: labelId = $$slots.label ? `${id}--selected-text` : undefined;
	let selectableGroupInitialized: boolean = false;
	let selectedTextId: string;
	$: selectedTextId = value ? `${id}--selected-text` : undefined;

	const context$ = createSelectContext({
		setHelperTextId(value: string) {
			helperTextId = value;
		},
	});

	$: $context$ = { ...$context$ };

	const dispatch = createEventDispatcher<{
		change: OnSelectChangeEventDetail;
	}>();

	setCreateMDCMenuInstance(false);

	let select: MDCSelect;
	onMount(() => {
		reistantiate();
	});

	$: if (select && selectableGroupInitialized) {
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

		select.listen("MDCSelect:change", (event: MDCSelectEvent) => {
			setValue(event.detail.value);
			dirty = true;
		});

		setSelectValue(value);
	}

	function handleChange(event: CustomEvent<OnSelectableGroupChange>) {
		if (select) {
			setSelectValue(value);
		}

		dispatch("change", {
			value,
			index: event.detail.selectedItemsIndex[0],
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

	function handleOptionsUpdated() {
		select.layoutOptions();
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
</script>

<style lang="scss">
	.smui-select {
		:global([slot="leadingIcon"], [slot="options"]) {
			display: contents;
		}
	}
</style>

<svelte:options immutable={true} />

<UseState {value} onUpdate={onValueChange} />

<UseState value={variant} onUpdate={reistantiate} />
<UseState value={ripple} onUpdate={reistantiate} />
<UseState value={lineRipple} onUpdate={reistantiate} />

<div class={'smui-select'}>
	<SelectableGroup
		bind:value
		selectionType="single"
		on:change={handleChange}
		on:optionsUpdated={handleOptionsUpdated}
		{nullable}
		bind:initialized={selectableGroupInitialized}>
		<div
			bind:this={dom}
			{...props}
			{id}
			class={parseClassList([
				className,
				'mdc-select',
				[variant === 'filled', 'mdc-select--filled'],
				[variant === 'outlined', 'mdc-select--outlined'],
				[disabled, 'mdc-select--disabled'],
				[required, 'mdc-select--required'],
				[$$slots.leadingIcon, 'mdc-select--with-leading-icon'],
				[invalid, 'mdc-select--invalid'],
				[!$$slots.label, 'mdc-select--no-label'],
				[
					variant == 'filled' && !$$slots.leadingIcon && density,
					`smui-input-field--filled--dense--${Math.abs(density)}`,
				],
				[
					variant == 'filled' && $$slots.leadingIcon && density,
					`smui-input-field--filled--with-leading-icon--dense--${Math.abs(
						density
					)}`,
				],
				[
					variant == 'outlined' && !$$slots.leadingIcon && density,
					`smui-input-field--outlined--dense--${Math.abs(density)}`,
				],
				[
					variant == 'outlined' && $$slots.leadingIcon && density,
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
			{title}>
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
				on:focus={stopPropagationOnReadOnly}>
				{#if ripple && variant === 'filled'}
					<span class="mdc-select__ripple" />
				{/if}
				{#if variant === 'filled'}
					{#if $$slots.label}
						<FloatingLabel component={Span}>
							<slot name="label" />
						</FloatingLabel>
					{/if}
					{#if $$slots.leadingIcon}
						<slot name="leadingIcon" />
					{/if}
					{#if lineRipple}
						<LineRipple />
					{/if}
				{:else if variant === 'outlined'}
					<NotchedOutline noLabel={!$$slots.label}>
						{#if $$slots.label}
							<FloatingLabel component={Span}>
								<slot name="label" />
							</FloatingLabel>
						{/if}
					</NotchedOutline>
					{#if $$slots.leadingIcon}
						<slot name="leadingIcon" />
					{/if}
				{/if}
				<span class="mdc-select__selected-text-container">
					<span
						id={selectedTextId}
						class="mdc-select__selected-text">{value}</span>
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
							points="7 10 12 15 17 10" />
						<polygon
							class="mdc-select__dropdown-icon-active"
							stroke="none"
							fill-rule="evenodd"
							points="7 15 12 10 17 15" />
					</svg>
				</span>
			</div>

			<Menu class="mdc-select__menu" fullWidth>
				<List>
					<slot name="options" />
				</List>
			</Menu>
		</div>
	</SelectableGroup>

	<slot />
</div>
