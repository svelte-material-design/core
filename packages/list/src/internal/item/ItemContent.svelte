<svelte:options immutable={true} />

<script lang="ts">
	export let selected: boolean = undefined;
</script>

<span class="mdc-list-item__ripple" />
<slot
	{selected}
	leadingClassName="mdc-list-item__graphic"
	trailingClassName="mdc-list-item__meta"
/>
