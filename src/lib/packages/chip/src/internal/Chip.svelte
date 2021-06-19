<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { MDCChip } from "@material/chips/chip";
	import type { MDCChipInteractionEventDetail } from "@material/chips/chip/types";
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
	import { createChipContext } from "../ChipContext";
	import type { ChipContext } from "../ChipContext";
	import type {
		OnChipAnimation,
		OnChipChange,
		OnChipInteraction,
		OnChipNavigation,
	} from "../types";
	import { GroupItem } from "@raythurnevoid/svelte-group-components/ts";
	import { Chip } from "../dom";
	import type { GroupBindings } from "@raythurnevoid/svelte-group-components";
	import { ActionType } from "@material/chips/action/constants";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let value: string = undefined;
	export let ripple: boolean = true;
	export let selected: boolean = false;
	export let accessibleTouch: boolean = false;
	/**
	 * @deprecated
	 */
	export let removeOnTrailingIconClick: boolean = false;
	export let hideLeadingIconOnSelect: boolean = true;
	export let group: GroupBindings;
	export let disableMDCInstance: boolean = false;
	//#endregion

	//#region implementation
	const dispatch =
		createEventDispatcher<{
			change: OnChipChange;
			interaction: OnChipInteraction;
			animation: OnChipAnimation;
			navigation: OnChipNavigation;
		}>();

	let chip: MDCChip;

	$: isLeadingIconHidden = hideLeadingIconOnSelect && selected;

	const context: ChipContext = {
		reinitialize() {
			initialize();
		},
		setSelected(newValue: boolean) {
			selected = newValue;
		},
		selected,
		value,
		isLeadingIconHidden,
		removeOnTrailingIconClick,
	} as ChipContext;

	const context$ = createChipContext({ ...context });
	$: $context$ = {
		...Object.assign(context, {
			...context,
			chip,
			dom,
			selected,
			value,
			isLeadingIconHidden,
			removeOnTrailingIconClick,
		}),
	};

	onMount(async () => {
		initialize();
		await tick();

		if (selected && !dom.classList.contains("mdc-evolution-chip--selected")) {
			//MDC removes the selected class when multiple items has it, it happens when switching from filter chips to choice.
			dom.classList.add("mdc-evolution-chip--selected");
		}
	});

	$: if (chip) {
		if (chip.isActionSelected(ActionType.PRIMARY) !== selected) {
			chip.setActionSelected(ActionType.PRIMARY, selected);
		}
	}

	onDestroy(() => {
		chip?.destroy();
	});

	function initialize() {
		if (dom && !disableMDCInstance) {
			chip?.destroy();
			chip = new MDCChip(dom);
			chip.listen("MDCChip:interaction", handleInteraction);
			chip.listen("MDCChip:animation", handleAnimation);
			chip.listen("MDCChip:navigation", handleNavigation);
		}
	}

	function handleAnimation() {
		dispatch("animation", { dom, value });
	}

	async function handleInteraction(
		event: CustomEvent<MDCChipInteractionEventDetail>
	) {
		dispatch("interaction", { dom, value });
		selected = event.detail.isSelected;

		await tick();

		dispatch("change", {
			value,
			selected,
			dom,
		});
	}

	function handleNavigation() {
		dispatch("navigation", { dom, value });
	}
	//#endregion
</script>

<GroupItem {dom} {group} {context}>
	<Chip
		bind:dom
		{id}
		class={className}
		{style}
		{ripple}
		{selected}
		{accessibleTouch}
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
	</Chip>
</GroupItem>
