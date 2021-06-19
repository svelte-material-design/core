<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import type { SelectionGroupBinding } from "@raythurnevoid/svelte-group-components/selectable";
	import { setSwitchGroupContext } from "../SwitchContext";
	//#endregion

	//#region exports
	//#region base

	//#endregion

	let selectionGroup: SelectionGroupBinding = undefined;
	export { selectionGroup as group };
	//#endregion

	//#region implementation
	const context$ = setSwitchGroupContext({
		selectionGroup,
	});

	$: $context$ = { ...$context$, selectionGroup };
	//#endregion
</script>

<slot group={selectionGroup} />
