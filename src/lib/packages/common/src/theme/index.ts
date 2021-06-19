export function getCSSVariable(color: "primary" | "secondary") {
	switch (color) {
		case "primary":
			return "--mdc-theme-primary";
		case "secondary":
			return "--mdc-theme-secondary";
	}
}

export function themeColor(color: string) {
	const themeVar = getCSSVariable(color as any);
	return themeVar ? `var(${themeVar})` : color;
}
