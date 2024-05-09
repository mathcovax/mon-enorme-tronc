import { hasPrimordialRole } from "@security/hasPrimordialRole";

export const adminPanelEntry = hasPrimordialRole({ options: { primordialRole: "ADMIN" } })
	.declareRoute("GET", "/entry/admin-panel*")
	.handler(
		() => {
			throw new NoContentHttpException("entry.accepted");
		},
		new IHaveSentThis(NoContentHttpException.code, "entry.accepted")
	);

export const basicEntry = duplo
	.declareRoute("GET", "/entry*")
	.handler(
		() => {
			throw new NoContentHttpException("entry.accepted");
		},
		new IHaveSentThis(NoContentHttpException.code, "entry.accepted")
	);
