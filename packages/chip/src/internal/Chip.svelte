<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import { MDCChip } from "@material/chips";
	import type { MDCChipSelectionEvent } from "@material/chips";
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
	import { createChipContext } from "../ChipContext";
	import type { ChipContext } from "../ChipContext";
	import type { OnChipChange, OnChipInteraction } from "../types";
	import { GroupItem } from "@raythurnevoid/svelte-group-components/ts";
	import { Chip } from "../dom";
	import type { GroupBindings } from "@raythurnevoid/svelte-group-components";
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
	export let removeOnTrailingIconClick: boolean = false;
	export let hideLeadingIconOnSelect: boolean = true;
	export let group: GroupBindings;
	export let disableMDCInstance: boolean = false;
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		remove: OnChipInteraction;
		change: OnChipChange;
		interaction: OnChipInteraction;
		trailingIconInteraction: OnChipInteraction;
		navigation: OnChipInteraction;
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

		if (selected && !dom.classList.contains("mdc-chip--selected")) {
			//MDC removes the selected class when multiple items has it, it happens when switching from filter chips to choice.
			dom.classList.add("mdc-chip--selected");
		}
	});

	$: if (chip) {
		if (chip.selected !== selected) {
			chip.selected = selected;
		}

		if (chip.shouldRemoveOnTrailingIconClick !== removeOnTrailingIconClick) {
			chip.shouldRemoveOnTrailingIconClick = removeOnTrailingIconClick;
		}
	}

	onDestroy(() => {
		chip?.destroy();
	});

	function initialize() {
		if (dom && !disableMDCInstance) {
			chip?.destroy();
			chip = new MDCChip(dom);
			chip.listen("MDCChip:removal", () => handleInteractionEvent("remove"));
			chip.listen("MDCChip:interaction", () =>
				handleInteractionEvent("interaction")
			);
			chip.listen("MDCChip:selection", handleSelection);
			chip.listen("MDCChip:trailingIconInteraction", () =>
				handleInteractionEvent("trailingIconInteraction")
			);
			chip.listen("MDCChip:navigation", () =>
				handleInteractionEvent("navigation")
			);
		}
	}

	async function handleSelection(event: MDCChipSelectionEvent) {
		selected = event.detail.selected;

		await tick();

		dispatch("change", {
			value,
			selected,
			dom,
		});
	}

	function handleInteractionEvent(
		event: "remove" | "interaction" | "trailingIconInteraction" | "navigation"
	) {
		dispatch(event, { dom, value });
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
