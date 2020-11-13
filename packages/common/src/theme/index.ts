export function getCSSVariable(color: "primary" | "secondary") {
	switch (color) {
		case "primary":
			return "--mdc-theme-primary";
		case "secondary":
			return "--mdc-theme-secondary";
	}
}
