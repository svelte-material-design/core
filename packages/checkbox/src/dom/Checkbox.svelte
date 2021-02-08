<svelte:options immutable={true} />

<script lang="ts">
	//#region  imports
	import { classList } from "@raythurnevoid/strings-filter";
	//#endregion

	//#region exports
	//#region base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let checked: boolean = false;
	export let value: string = undefined;
	export let accessibleTouch: boolean = true;
	export let density: number = undefined;

	export let disabled: boolean = false;
	export let readonly: boolean = undefined;

	export let ripple: boolean = undefined;

	export let inputElement: HTMLInputElement = undefined;
	export let inputId: string = id ? `${id}-input` : undefined;

	$: if (density != undefined) {
		if (density < -3) {
			density = -3;
		} else if (density > 0) {
			density = 0;
		}
	}
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

<!-- TODO:
				[
				behaviour === "data-table-header",
				"mdc-data-table__header-row-checkbox",
			],
			[behaviour === "data-table-row", "mdc-data-table__row-checkbox"],
-->
<div
	bind:this={dom}
	{id}
	class={accessibleTouch ? "mdc-touch-target-wrapper" : undefined}
>
	<div
		class={classList([
			className,
			"mdc-checkbox",
			[accessibleTouch, "mdc-checkbox--touch"],
			[disabled, "mdc-checkbox--disabled"],
			[density, `smui-checkbox--dense--${Math.abs(density)}`],
		])}
		{style}
	>
		<input
			bind:this={inputElement}
			id={inputId}
			class="mdc-checkbox__native-control"
			type="checkbox"
			disabled={isInputDisabled(readonly, disabled)}
			{checked}
			{readonly}
			{value}
			data-indeterminate={checked == null ? "true" : undefined}
			{...$$restProps}
			on:change
			on:click
			on:mousedown
			on:mouseup
			on:keydown
			on:keyup
			on:focus
			on:blur
		/>
		<div class="mdc-checkbox__background">
			<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
				<path
					class="mdc-checkbox__checkmark-path"
					fill="none"
					d="M1.73,12.91 8.1,19.28 22.79,4.59"
				/>
			</svg>
			<div class="mdc-checkbox__mixedmark" />
		</div>
		{#if ripple}
			<div class="mdc-checkbox__ripple" />
		{/if}
	</div>
</div>
