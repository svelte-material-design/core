<script lang="ts">
	//#region Base
	import { BaseProps } from "../../common/dom/Props";

	let className = undefined;
	export { className as class };
	export let style: string = undefined;
	export let id: string = undefined;
	export let dom: HTMLDivElement = undefined;
	export let props: BaseProps = {};
	//#endregion

	// LinearProgressImpl
	import { parseClassList } from "../../../packages/common/functions";
	import { MDCLinearProgress } from "@material/linear-progress";
	import { onMount, onDestroy, tick } from "svelte";
	import { UseDebounce, UseState } from "../../../packages/common/hooks";
	import { getCreateMDCLinearProgressInstance } from ".";

	export let indeterminate: boolean = false;
	export let reversed: boolean = false;
	export let closed: boolean = false;
	export let progress: number = 0;
	export let buffer: number = 1;
	export let ariaLabel: string = undefined;

	let debouncedProgress: number = progress;

	let createMDCLinearProgressInstance = getCreateMDCLinearProgressInstance();

	$: if (progress < 0) progress = 0;
	$: if (progress > 1) progress = 1;

	let linearProgress: MDCLinearProgress;
	onMount(() => {
		istantiate();
	});

	$: if (linearProgress) {
		tick().then(() => {
			if (linearProgress.reverse !== reversed) {
				linearProgress.reverse = reversed;
			}

			if (linearProgress.determinate !== !indeterminate) {
				linearProgress.determinate = !indeterminate;
			}

			if (linearProgress.progress !== debouncedProgress) {
				linearProgress.progress = debouncedProgress;
			}

			if (linearProgress.buffer !== buffer) {
				linearProgress.buffer = buffer;
			}
		});
	}

	onDestroy(() => {
		linearProgress && linearProgress.destroy();
	});

	function istantiate() {
		if (createMDCLinearProgressInstance !== false) {
			if (closed) dom.classList.add("mdc-linear-progress--closed");
			linearProgress = new MDCLinearProgress(dom);
		}
	}

	async function handleClosedValueChange() {
		if (closed) {
			linearProgress.close();
		} else {
			linearProgress.open();
		}
	}
</script>

<svelte:options immutable={true} />

<UseState value={closed} onUpdate={handleClosedValueChange} />
<UseDebounce
	value={progress}
	bind:debounced={debouncedProgress}
	interval={500} />

<div
	bind:this={dom}
	{...props}
	{id}
	class={parseClassList([
		className,
		'mdc-linear-progress',
		[indeterminate, 'mdc-linear-progress--indeterminate'],
		[reversed, 'mdc-linear-progress--reversed'],
	])}
	{style}
	role="progressbar"
	aria-label={ariaLabel}
	aria-valuemin="0"
	aria-valuemax="1"
	aria-valuenow={indeterminate ? undefined : progress}>
	<div class="mdc-linear-progress__buffer">
		<div class="mdc-linear-progress__buffer-bar" />
		<div class="mdc-linear-progress__buffer-dots" />
	</div>
	<div
		class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
		style="transform: scaleX({progress})">
		<span class="mdc-linear-progress__bar-inner" />
	</div>
	<div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
		<span class="mdc-linear-progress__bar-inner" />
	</div>
</div>
