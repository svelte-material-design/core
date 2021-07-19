<style lang="scss" global>
	@use "smui-theme.scss";
	@use "@material/icon-button/index.scss" as icon-button;

	@include icon-button.core-styles;

	.svmd-icon-button--color--primary {
		@include icon-button.ink-color(primary);
	}

	.svmd-icon-button--color--secondary {
		@include icon-button.ink-color(secondary);
	}
</style>
