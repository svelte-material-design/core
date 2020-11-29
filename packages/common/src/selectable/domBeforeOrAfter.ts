export function beforeOrAfter(a: HTMLElement, b: HTMLElement): -1 | 1 {
	const pos = b.compareDocumentPosition(a);
	const resBitmask = pos & 0b000110;

	if (resBitmask === 0b000010) {
		return -1;
	} else if (resBitmask === 0b0000100) {
		return 1;
	}

	throw new Error(`Unexpeted position: ${resBitmask.toString(2)}`);
}
