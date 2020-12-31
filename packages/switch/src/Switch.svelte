<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@smui/switch/Switch:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import { BaseProps } from "../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Switch
	import { MDCSwitch } from "@material/switch";
	import { onMount, onDestroy, createEventDispatcher, tick } from "svelte";
	import { Selectable } from "../../../packages/common/hoc";
	import { getFormFieldContext } from "../../../packages/form-field";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import { parseClassList } from "../../common/src/functions";
	import { SwitchChangeEvent } from ".";

	export let ripple: boolean = true;
	export let checked: boolean = false;
	export let dirty: boolean = false;
	export let value: string = undefined;

	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let required: boolean = false;

	export let title: string = undefined;
	export let name: string = undefined;
	export let ariaLabel: string = undefined;

	let inputElement: HTMLInputElement;
	let inputId: string;
	$: inputId = `${id}--input`;

	const dispatch = createEventDispatcher<{
		change: SwitchChangeEvent;
	}>();

	const formFieldContext$ = getFormFieldContext();

	let mdcSwitch: MDCSwitch;
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

		dirty = false;
		mdcSwitch = new MDCSwitch(dom);
		mdcSwitch.listen("change", handleChange);

		if (!ripple) mdcSwitch.ripple.destroy();

		tick().then(() => {
			setFormFieldInput();
		});
	}

	function setFormFieldInput() {
		$formFieldContext$?.setInput(mdcSwitch);
		$formFieldContext$?.setInputId(inputId);
	}

	function isInputDisabled(_readonly = readonly, _disabled = disabled) {
		return readonly || disabled;
	}

	function handleCheckedChange() {
		tick().then(() => {
			inputElement.disabled = isInputDisabled();
		});
	}

	function handleChange() {
		if (!dirty) dirty = true;

		inputElement.disabled = isInputDisabled();

		tick().then(() => {
			dispatch("change", {
				dom,
				checked,
			});
		});
	}
</script>

<svelte:options immutable={true} />

<UseState value={checked} onUpdate={handleCheckedChange} />
<UseState value={ripple} onUpdate={instantiate} />

<Selectable bind:selected={checked} bind:value>
	<div
		bind:this={dom}
		{...props}
		{id}
		class={parseClassList([
			className,
			'mdc-switch',
			[disabled, 'mdc-switch--disabled'],
			[checked, 'mdc-switch--checked'],
		])}
		{style}>
		<div class="mdc-switch__track" />
		<div class="mdc-switch__thumb-underlay">
			<div class="mdc-switch__thumb">
				<input
					bind:this={inputElement}
					class="mdc-switch__native-control"
					bind:checked
					type="checkbox"
					role="switch"
					aria-checked={checked ? 'true' : 'false'}
					aria-label={ariaLabel}
					disabled={isInputDisabled(readonly, disabled)}
					{name}
					{title}
					{value}
					{readonly}
					{required} />
			</div>
		</div>
	</div>
</Selectable>
