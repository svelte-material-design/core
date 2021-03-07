<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { FloatingLabel } from "../../floating-label";
	import { LineRipple } from "../../line-ripple";
	import { NotchedOutline } from "../../notched-outline";
	import { Span } from "../../common/dom";
	import { classList } from "@raythurnevoid/strings-filter";
	import { getInputFieldContext, setContentContext } from "./TextFieldContext";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/input-field/InputField:${count++}`;
	export let dom: HTMLLabelElement = undefined;
	//#endregion

	//#endregion

	//#region implementation
	let hasLeadingIcon: boolean;
	let hasTrailingIcon: boolean;

	const inputFieldContext$ = getInputFieldContext();
	setContentContext({
		setHasLeadingIcon(value: boolean) {
			hasLeadingIcon = value;
		},
		setHasTrailingIcon(value: boolean) {
			hasTrailingIcon = value;
		},
	});

	$: $inputFieldContext$.setHasLabel($$slots.label);
	$: $inputFieldContext$.setContentElement(dom);
	//#endregion
</script>

<label
	bind:this={dom}
	{id}
	class={classList([
		className,
		...$inputFieldContext$.inputFieldClassList,
		[hasLeadingIcon, "mdc-text-field--with-leading-icon"],
		[hasTrailingIcon, "mdc-text-field--with-trailing-icon"],
	])}
	{style}
	for={id}
	{...$$restProps}
>
	{#if $inputFieldContext$.ripple}
		<span class="mdc-text-field__ripple" />
	{/if}
	<slot />
	{#if $inputFieldContext$.variant === "filled"}
		{#if $$slots.label}
			<FloatingLabel component={Span}>
				<slot name="label" />
			</FloatingLabel>
		{/if}
		{#if $inputFieldContext$.lineRipple}
			<LineRipple />
		{/if}
	{:else if $inputFieldContext$.variant === "outlined"}
		<NotchedOutline noLabel={!$$slots.label}>
			{#if $$slots.label}
				<FloatingLabel component={Span}>
					<slot name="label" />
				</FloatingLabel>
			{/if}
		</NotchedOutline>
	{/if}
</label>
