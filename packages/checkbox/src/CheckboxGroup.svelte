<script lang="ts">
  import { SelectableGroup } from "../../../packages/common/hoc";

  export let value: any = null;
</script>

<SelectableGroup on:change bind:value>
  <slot />
</SelectableGroup>
