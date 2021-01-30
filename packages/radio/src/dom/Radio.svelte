<svelte:options immutable={true} />

<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region  imports
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/radio/Radio:${count++}`;
	export let dom: HTMLInputElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let checked: boolean = false;
	export let accessibleTouch: boolean = true;
	export let density: number = undefined;
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	export let inputElement: HTMLInputElement;
	export let inputId: string = id ? `${id}--input` : undefined;
	//#endregion

	//#region implementation
	function isInputDisabled(
		readonlyValue: typeof readonly = readonly,
		disabledValue: typeof disabled = disabled
	) {
		return readonlyValue ? readonlyValue : disabledValue;
	}
	//#endregion
</script>

<div class={accessibleTouch ? "mdc-touch-target-wrapper" : undefined}>
	<div
		bind:this={dom}
		{id}
		class={classList([
			className,
			"mdc-radio",
			[accessibleTouch, "mdc-radio--touch"],
			[disabled, "mdc-radio--disabled"],
			[density, `smui-radio--dense--${Math.abs(density)}`],
		])}
		{style}
		{...$$restProps}
	>
		<input
			bind:this={inputElement}
			class="mdc-radio__native-control"
			id={inputId}
			type="radio"
			disabled={isInputDisabled(readonly, disabled)}
			{checked}
			{readonly}
			{value}
			{...$$restProps}
			on:change
		/>
		<div class="mdc-radio__background">
			<div class="mdc-radio__outer-circle" />
			<div class="mdc-radio__inner-circle" />
		</div>
		<div class="mdc-radio__ripple" />
	</div>
</div>
