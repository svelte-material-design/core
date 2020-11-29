import { ListRole } from ".";
import { SelectionType } from "../../common/hoc";

export function roleToSelectionType(role: ListRole): SelectionType {
	if (role === "radiogroup" || role === "menu") {
		return "single";
	} else if (role === "group") {
		return "multi";
	}
}
