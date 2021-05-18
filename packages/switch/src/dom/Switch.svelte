<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
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

	export let checked: boolean = false;
	export let disabled: boolean = false;
	//#endregion

	//#region implementation
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class={classList([
		className,
		"mdc-switch",
		[disabled, "mdc-switch--disabled"],
		[checked, "mdc-switch--checked"],
	])}
	{style}
	{...$$restProps}
>
	<div class="mdc-switch__track" />
	<div class="mdc-switch__thumb-underlay">
		<div class="mdc-switch__thumb">
			<slot />
		</div>
	</div>
</div>

<!-- <Input
				bind:dom={inputElement}
				id={inputId}
				class="mdc-switch__native-control"
				bind:checked
				type="checkbox"
				role="switch"
				aria-checked={checked ? "true" : "false"}
				disabled={isInputDisabled(readonly, disabled)}
				{value}
				{...$$restProps}
				on:change
				on:click
				on:mousedown
				on:mouseup
				on:keydown
				on:keyup
				on:focus
				on:blur
				on:focusin
				on:focusout
			/> -->
