<script context="module" lang="ts">
	let count = 0;
</script>

<script lang="ts">
	import { Memo, memo } from "../utils";
	import Use from "./Use.svelte";
	import { onMount, tick } from "svelte";

	export let value: any;
	export let onUpdate: (oldValue?: any) => void;
	export const id: string = `../../../../packages/common/hooks/UseState-${count++}`;

	let valueMemo: Memo<any>;
	onMount(() => {
		tick().then(() => {
			valueMemo = memo(value);
		});
	});

	function onValueUpdate(value: any) {
		if (valueMemo === undefined) return;

		if (value !== valueMemo.val) {
			const currentValueMemo = valueMemo.val;

			onUpdate(valueMemo.val);

			if (currentValueMemo === valueMemo.val) {
				// Prevent infinite loop when setValue is called during onUpdate
				valueMemo.val = value;
			}
		}
	}

	export function setValue(newValue: typeof value) {
		valueMemo.val = newValue;
		value = newValue;
	}

	export function getValue() {
		return value;
	}
</script>

<svelte:options immutable={true} />

<Use effect hook={() => onValueUpdate(value)} />
