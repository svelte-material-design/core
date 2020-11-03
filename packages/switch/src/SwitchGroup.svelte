<script lang="ts">
	import { SelectableGroup } from "../../../packages/common/hoc";

	export let value: any;
</script>

<SelectableGroup bind:value>
	<slot />
</SelectableGroup>
