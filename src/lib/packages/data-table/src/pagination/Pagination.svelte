<svelte:options immutable={true} />

<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	//#region Base
	import { classList } from "@raythurnevoid/strings-filter";
	import { DOMEventsForwarder } from "../../../common/actions";
	const forwardDOMEvents = DOMEventsForwarder();
	let className: string = undefined;

	export { className as class };
	export let style: string = undefined;
	export let id: string = `../../../data-table/pagination/Pagination:${count++}`;

	export let dom: HTMLDivElement = undefined;

	import type { BaseProps } from "../../../common/dom/Props";
	export let props: BaseProps = {};
	//#endregion

	// Pagination
	import { IconButton, Icon } from "../../../icon-button";
	import { createPaginationContext } from "./PaginationContext";

	export let pageSize: number = $$slots.pageSize ? undefined : 10;
	export let pageIndex: number = 0;
	export let length: number = 0;
	export let firstPageBtn: boolean = true;
	export let lastPageBtn: boolean = true;

	$: if (pageSize < 0) pageSize = 0;
	$: if (pageIndex < 0) pageIndex = 0;
	$: if (length < 0) length = 0;
	$: lastPageIndex = parseInt("" + length / pageSize);
	$: if (pageIndex > lastPageIndex) pageIndex = lastPageIndex;
	$: remainingItemsLength = length - (pageIndex + 1) * pageSize;

	createPaginationContext({
		setPageSize(newValue: typeof pageSize) {
			pageSize = newValue;
		},
	});

	function setPageSize(value: number) {
		pageSize = value;
	}
</script>

<div
	bind:this={dom}
	{...props}
	{id}
	class={classList([className, "mdc-data-table__pagination"])}
	{style}
	use:forwardDOMEvents
>
	<div class="mdc-data-table__pagination-trailing">
		<slot name="pageSize" {setPageSize} />

		<div class="mdc-data-table__pagination-navigation">
			<div class="mdc-data-table__pagination-total">
				<slot
					name="counter"
					first={pageIndex * pageSize + 1}
					last={(pageIndex + 1) * pageSize}
					pages={lastPageIndex + 1}
					page={pageIndex + 1}
				/>
			</div>
			{#if firstPageBtn}
				<IconButton
					class="mdc-data-table__pagination-button"
					props={{ "data-first-page": "true" }}
					disabled={pageIndex === 0}
					on:click={() => (pageIndex = 0)}
				>
					<Icon>first_page</Icon>
				</IconButton>
			{/if}
			<IconButton
				class="mdc-data-table__pagination-button"
				props={{ "data-prev-page": "true" }}
				disabled={pageIndex === 0}
				on:click={() => pageIndex--}
			>
				<Icon>chevron_left</Icon>
			</IconButton>
			<IconButton
				class="mdc-data-table__pagination-button"
				props={{ "data-next-page": "true" }}
				disabled={remainingItemsLength <= 0}
				on:click={() => pageIndex++}
			>
				<Icon>chevron_right</Icon>
			</IconButton>
			{#if lastPageBtn}
				<IconButton
					class="mdc-data-table__pagination-button"
					props={{ "data-last-page": "true" }}
					disabled={remainingItemsLength <= 0}
					on:click={() => (pageIndex = lastPageIndex)}
				>
					<Icon>last_page</Icon>
				</IconButton>
			{/if}
		</div>
	</div>
</div>

<style>
	.mdc-data-table__pagination {
		/* Why in hell would MDC put 4px randomly... */
		padding-left: calc(1em - 4px);
	}
</style>
