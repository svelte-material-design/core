import { ListImplRole } from "./internal";
import { SelectionType } from "../../common/hoc";

export function roleToSelectionType(role: ListImplRole): SelectionType {
	if (role === "radiogroup" || role === "menu") {
		return "single";
	} else if (role === "group") {
		return "multi";
	}
}
