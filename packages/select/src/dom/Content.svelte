<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { parseClassList } from "../../../common/functions";
	import { FloatingLabel } from "../../../floating-label/src/dom";
	import { LineRipple } from "../../../line-ripple";
	import { NotchedOutline } from "../../../notched-outline";
	import { Span } from "../../../common/dom";
	import type { SelectVariant } from "..";
	import { OpenCloseIcon } from ".";
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

	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let invalid: boolean = false;
	export let required: boolean = false;

	export let helperTextId: string;
	export let labelId: string;
	export let selectedTextId: string;

	//#region slots
	export let slots: typeof $$slots;
	//#endregion
	//#endregion

	//#region implementation
	function stopPropagationOnReadOnly(event: Event) {
		if (readonly) event.stopImmediatePropagation();
	}
	//#endregion
</script>

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
		[slots.leadingIcon, "mdc-select--with-leading-icon"],
		[invalid, "mdc-select--invalid"],
		[!slots.label, "mdc-select--no-label"],
	])}
	style={parseClassList([style])}
	{...$$restProps}
>
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
		aria-label={$$restProps["aria-label"]}
		on:click={stopPropagationOnReadOnly}
		on:focus={stopPropagationOnReadOnly}
	>
		{#if ripple && variant === "filled"}
			<span class="mdc-select__ripple" />
		{/if}
		<slot name="leading" />
		{#if variant === "filled"}
			{#if slots.label}
				<FloatingLabel id={labelId} component={Span}>
					<slot name="label" />
				</FloatingLabel>
			{/if}
			{#if lineRipple}
				<LineRipple />
			{/if}
		{:else if variant === "outlined"}
			<NotchedOutline noLabel={!slots.label}>
				{#if slots.label}
					<FloatingLabel id={labelId} component={Span}>
						<slot name="label" />
					</FloatingLabel>
				{/if}
			</NotchedOutline>
		{/if}
		<span class="mdc-select__selected-text-container">
			<span id={selectedTextId} class="mdc-select__selected-text">{value}</span>
		</span>
		<OpenCloseIcon />
	</div>
	<slot />
</div>
