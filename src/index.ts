import { registerHook } from "hybridly/vue";
import { type FormKitNode, FormKitPlugin } from "@formkit/core";

export const hybridly: FormKitPlugin = (node: FormKitNode) => {
	// If the node is not a root node and a form, we don't attach to it.
	if (node.parent !== null || node.props.type !== "form") {
		return;
	}

	// Hook into Hybridly's navigated event to react when errors change.
	registerHook("navigated", (options, context) => {
		const errorBag = node.props?.errorBag;

		// If the name of a custom error bag is provided, we try to get the
		// errors from that bag. Otherwise, we get the errors from the default
		// error bag, which is the root errors object.

		// If the errors objects is not present, return.
		if (!context.view.properties.errors) {
			return;
		}

		// If a named error bag is provided, look for it in the errors object.
		if (node.props?.errorBag) {
			if (context.view.properties.errors instanceof Object) {
				node.setErrors(
					[],
					(context.view.properties.errors as Record<string, string | string[]>)[
						errorBag
					],
				);
			}
			return;
		}

		// If no error bag has been specified, map the root errors to the node.
		node.setErrors(
			[],
			context.view.properties.errors as Record<string, string | string[]>,
		);
	});
};
