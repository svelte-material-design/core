<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import {
		MDCChipNavigationEvent,
		MDCChipSelectionEvent,
		MDCChipSet,
	} from "@material/chips";
	import type { MDCChipInteractionEvent } from "@material/chips";
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
	import { setChipSetContext } from "../ChipSetContext";
	import type { ChipContext } from "../ChipSetContext";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type {
		ChipSetVariant,
		OnChipSetChange,
		OnChipSetChildrenChange,
		OnChipSetInteraction,
		OnChipSetSelection,
	} from "../types";
	import {
		Group,
		GroupItemContext,
	} from "@raythurnevoid/svelte-group-components/ts";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = `@svmd/chips/ChipSet:${count++}`;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let variant: ChipSetVariant = undefined;
	export let entryAnimation: boolean = true;
	let selectionGroup: SelectionGroupBinding = undefined;
	export { selectionGroup as group };
	//#endregion

	//#region implementation
	const dispatch = createEventDispatcher<{
		optionsChange: OnChipSetChildrenChange;
		change: OnChipSetChange;
		interaction: OnChipSetInteraction;
		trailingIconInteraction: OnChipSetInteraction;
		navigation: OnChipSetInteraction;
		selection: OnChipSetSelection;
	}>();

	let chipSet: MDCChipSet;
	let chipSetGroup: Group;

	const context$ = setChipSetContext({
		variant,
		selectionGroup,
		reinitialize,
	});
	$: $context$ = Object.assign($context$, {
		variant,
		selectionGroup,
		mdcInstance: chipSet,
	});

	onMount(() => {
		$context$ = { ...$context$, group: chipSetGroup.getBindings() };
		reinitialize();
	});

	onDestroy(() => {
		destroy();
	});

	function destroy() {
		chipSet?.destroy();
	}

	export function reinitialize() {
		if (dom) {
			destroy();
			chipSet = new MDCChipSet(dom);
			chipSet.listen("MDCChip:interaction", handleInteraction);
			chipSet.listen("MDCChip:selection", handleSelection);
			chipSet.listen(
				"MDCChip:trailingIconInteraction",
				handleTrailingIconInteraction
			);
			chipSet.listen("MDCChip:navigation", handleNavigation);
		}
	}

	function getChipById(id: string): GroupItemContext<ChipContext> {
		const result = chipSetGroup
			.getItems()
			.find((chip) => chip.dom.firstElementChild.id === id);
		return result;
	}

	function handleInteraction(event: MDCChipInteractionEvent) {
		const chip = getChipById(event.detail.chipId);
		dispatch("interaction", {
			dom,
			chipValue: chip.externalContext.value,
			chipDom: chip.dom as HTMLDivElement,
		});
	}

	async function handleSelection(event: MDCChipSelectionEvent) {
		const chip = getChipById(event.detail.chipId);
		chip.externalContext.setSelected(event.detail.selected);

		await tick();

		dispatch("selection", {
			dom,
			chipValue: chip.externalContext.value,
			chipDom: chip.dom as HTMLDivElement,
			selected: event.detail.selected,
		});
	}

	function handleTrailingIconInteraction(event: MDCChipInteractionEvent) {
		const chip = getChipById(event.detail.chipId);
		dispatch("trailingIconInteraction", {
			dom,
			chipValue: chip.externalContext.value,
			chipDom: chip.dom as HTMLDivElement,
		});
	}

	function handleNavigation(event: MDCChipNavigationEvent) {
		const chip = getChipById(event.detail.chipId);
		dispatch("navigation", {
			dom,
			chipValue: chip.externalContext.value,
			chipDom: chip.dom as HTMLDivElement,
		});
	}

	function handleOptionsChange() {
		reinitialize();
		dispatch("optionsChange", {
			dom,
			items: chipSetGroup.getItems().map((item) => item.dom as HTMLDivElement),
		});
	}

	async function handleVariantUpdate() {
		await tick();
		reinitialize();
	}
	//#endregion
</script>

<UseState value={variant} onUpdate={handleVariantUpdate} />

<Group bind:this={chipSetGroup} on:optionsChange={handleOptionsChange}>
	<div
		bind:this={dom}
		role="grid"
		{id}
		class={classList([
			className,
			"mdc-chip-set",
			[entryAnimation, "mdc-chip-set--input"],
			[variant === "choice", "mdc-chip-set--choice"],
			[variant === "filter", "mdc-chip-set--filter"],
		])}
		{style}
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
	</div>
</Group>
