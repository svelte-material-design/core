<svelte:options immutable={true} />

<script lang="ts">
	//#region imports
	import {
		Option,
		Select,
		Content,
		OptionContent,
		Input,
		Options,
	} from "../../../select/src";
	import type { OnSelectChange } from "../../../select/src";
	import { createEventDispatcher } from "svelte";
	import { getPaginationContext } from "./PaginationContext";
	import { classList } from "@raythurnevoid/strings-filter";
	import type { OnPageSizeChange } from "../types";
	//#endregion

	//#region exports
	//#region base
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	//#endregion

	export let pageSizeOptions: number[] = [10, 20, 50];
	export let pageSize: number = pageSizeOptions[0];
	//#endregion

	//#region implementation$: if (pageSizeOptions == null || pageSizeOptions.length === 0)
	$: if (pageSize == null) pageSize = pageSizeOptions[0];

	const dispatch = createEventDispatcher<{
		change: OnPageSizeChange;
	}>();

	const paginationContext$ = getPaginationContext();

	$: pageSizeSelectValue = "" + pageSize;

	$: $paginationContext$?.setPageSize(pageSize);

	function handlePageSizeChange(event: OnSelectChange) {
		pageSizeSelectValue = event.value;
		pageSize = Number(pageSizeSelectValue);
		dispatch("change", {
			dom,
			value: pageSize,
		});
	}
	//#endregion
</script>

<div
	bind:this={dom}
	{id}
	class={classList([className, "mdc-data-table__pagination-rows-per-page"])}
	{style}
	{...$$restProps}
>
	<div class="mdc-data-table__pagination-rows-per-page-label">
		<slot />
	</div>

	<Select
		class="mdc-data-table__pagination-rows-per-page-select"
		nullable={false}
		value={pageSizeSelectValue}
		on:change={(event) => handlePageSizeChange(event.detail)}
	>
		<Content>
			<Input />
			<Options>
				{#each pageSizeOptions as option (option)}
					<Option value={"" + option}>
						<OptionContent>
							{option}
						</OptionContent>
					</Option>
				{/each}
			</Options>
		</Content>
	</Select>
</div>
