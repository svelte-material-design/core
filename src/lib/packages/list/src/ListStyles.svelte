<style lang="scss" global>
	@use "smui-theme";
	@use "@material/list";
	@use "@material/feature-targeting/functions";
	@use "@material/feature-targeting/mixins";
	@use "@material/list/variables";
	@use "@material/theme/functions" as theme-functions;
	@use "@material/theme/variables" as theme-variables;

	@include list.deprecated-core-styles();

	// .smui-list--three-line {
	// 	.mdc-list-item__text {
	// 		@include mixins.targets() {
	// 			align-self: flex-start;
	// 		}
	// 	}

	// 	.mdc-list-item {
	// 		@include mixins.targets() {
	// 			height: 88px;
	// 		}
	// 	}
	// }

	.smui-list--horizontal {
		display: flex;
		flex-direction: row;
		padding: 0;

		.mdc-list-divider {
			$divider-color: if(
				theme-functions.tone(theme-variables.$background) == "dark",
				variables.$deprecated-divider-color-on-dark-bg,
				variables.$deprecated-divider-color-on-light-bg
			);

			border-bottom: none;
			border-left-color: $divider-color;
			border-left-width: 1px;
			border-left-style: solid;
			height: auto;
		}
	}

	.mdc-list-item__meta.smui-list__trailing-icon {
		width: 24px;
		height: 24px;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		fill: currentColor;
		object-fit: cover;
	}
</style>
