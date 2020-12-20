export function filterStringList(toFilter: StringListToFilter): string[] {
	const parsedArray = toFilter
		.map((item) => {
			if (Array.isArray(item))
				return item[0] ? item[1] : item[0] === undefined ? undefined : "";
			else return item;
		})
		.filter((item) => item || item === undefined);

	if (parsedArray.some((item) => item !== undefined)) {
		return parsedArray.filter((item) => item);
	} else {
		return undefined;
	}
}

export function parseClassList(toParse: StringListToFilter): string {
	let parsed: string;

	const parsedArray = filterStringList(toParse);

	if (parsedArray) {
		parsed = parsedArray.join(" ");
	} else {
		parsed = undefined;
	}

	return parsed;
}

export function parseStylesList(toParse: StringListToFilter): string {
	let parsed: string;

	const parsedArray = filterStringList(toParse);

	if (parsedArray) {
		parsed = parsedArray.join("; ");
	} else {
		parsed = undefined;
	}

	return parsed;
}

export type StringListToFilter = (string | [any, string])[];
