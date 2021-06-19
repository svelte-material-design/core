<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { MDCSwitch } from "@material/switch";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { getFormFieldContext } from "../../../form-field";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import type { OnSwitchChange } from "../types";
	import { setSwitchContext } from "../SwitchContext";
	import { isInputDisabled } from "../logic";
	import { Switch } from "../dom";
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
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let value: string = undefined;
	//#endregion

	//#region implementation
	const dispatch =
		createEventDispatcher<{
			change: OnSwitchChange;
		}>();

	let inputElement: HTMLInputElement;
	let inputId: string;
	let mdcSwitch: MDCSwitch;
	const formFieldContext$ = getFormFieldContext();

	const context$ = setSwitchContext({
		id,
		disabled,
		readonly,
		value,
		setInputId(id: string) {
			inputId = id;
			$formFieldContext$?.setInputId(inputId);
		},
		setInput(dom: HTMLInputElement) {
			inputElement = dom;
			$formFieldContext$?.setInput(mdcSwitch);
		},
	});

	$: $context$ = { ...$context$, id, disabled, readonly, value };

	onMount(() => {
		instantiate();
	});

	$: if (mdcSwitch) {
		if (mdcSwitch.checked !== checked) {
			mdcSwitch.checked = checked;
		}

		if (mdcSwitch.disabled !== disabled) {
			mdcSwitch.disabled = disabled;
		}

		if (mdcSwitch.checked !== checked) {
			mdcSwitch.checked = checked;
		}
	}

	onDestroy(() => {
		mdcSwitch?.destroy();
	});

	function instantiate() {
		mdcSwitch?.destroy();

		mdcSwitch = new MDCSwitch(dom);
		mdcSwitch.listen("change", handleChange);

		if (!ripple) mdcSwitch.ripple.destroy();
	}

	async function handleCheckedChange() {
		await tick();
		inputElement.disabled = isInputDisabled(readonly, disabled);
	}

	async function handleChange() {
		checked = inputElement.checked;
		inputElement.disabled = isInputDisabled(readonly, disabled);
		await tick();
		dispatch("change", {
			dom,
			checked,
		});
	}
	//#endregion
</script>

<UseState value={checked} onUpdate={handleCheckedChange} />
<UseState value={ripple} onUpdate={instantiate} />

<Switch
	bind:dom
	{id}
	class={className}
	{style}
	bind:checked
	{...$$restProps}
	on:click
	on:mousedown
	on:mouseup
	on:keydown
	on:keyup
	on:focus
	on:blur
	on:focusin
	on:focusout
>
	<slot />
</Switch>
