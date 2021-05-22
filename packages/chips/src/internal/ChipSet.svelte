<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region imports
	import { classList } from "@raythurnevoid/strings-filter";
	import { MDCChipSet } from "@material/chips/chip-set";
	import type {
		MDCChipSetInteractionEventDetail,
		MDCChipSetRemovalEventDetail,
		MDCChipSetSelectionEventDetail,
	} from "@material/chips/chip-set/types";
	import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
	import { setChipSetContext } from "../ChipSetContext";
	import type { ChipContext } from "../ChipSetContext";
	import { UseState } from "@raythurnevoid/svelte-hooks";
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/ts/selectable";
	import type {
		ChipSetVariant,
		OnChipSetChildrenChange,
		OnChipSetInteraction,
		OnChipSetRemoval,
		OnChipSetSelection,
	} from "../types";
	import { Group } from "@raythurnevoid/svelte-group-components/ts";
	import type { GroupItemContext } from "@raythurnevoid/svelte-group-components/ts";
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
	const dispatch =
		createEventDispatcher<{
			optionsChange: OnChipSetChildrenChange;
			interaction: OnChipSetInteraction;
			navigation: OnChipSetInteraction;
			selection: OnChipSetSelection;
			removal: OnChipSetRemoval;
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
			chipSet.listen("MDCChipSet:interaction", handleInteraction);
			chipSet.listen("MDCChipSet:selection", handleSelection);
			chipSet.listen("MDCChipSet:removal", handleRemoval);
		}
	}

	function getChipById(id: string): GroupItemContext<ChipContext> {
		const result = chipSetGroup
			.getItems()
			.find((chip) => chip.dom.firstElementChild.id === id);
		return result;
	}

	async function handleSelection(
		event: CustomEvent<MDCChipSetSelectionEventDetail>
	) {
		const chip = getChipById(event.detail.chipID);
		chip.externalContext.setSelected(event.detail.isSelected);

		await tick();

		dispatch("selection", {
			dom,
			chipValue: chip.externalContext.value,
			chipDom: chip.dom as HTMLDivElement,
			selected: event.detail.isSelected,
		});
	}

	function handleRemoval(event: CustomEvent<MDCChipSetRemovalEventDetail>) {
		const chip = getChipById(event.detail.chipID);
		dispatch("removal", {
			dom,
			chipValue: chip.externalContext.value,
			chipDom: chip.dom as HTMLDivElement,
		});
	}

	function handleInteraction(
		event: CustomEvent<MDCChipSetInteractionEventDetail>
	) {
		const chip = getChipById(event.detail.chipID);
		dispatch("interaction", {
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
			"mdc-evolution-chip-set",
			[entryAnimation, "mdc-evolution-chip-set--input"],
			[variant === "choice", "mdc-evolution-chip-set--choice"],
			[variant === "filter", "mdc-evolution-chip-set--filter"],
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
