import { commandExistCheck } from "@checkers/command";
import { sessionSchema } from "@schemas/session";
import { mustBeConnected } from "@security/mustBeConnected";

/* METHOD : POST, PATH : /retry-command */
export const POST = (method: Methods, path: string) =>
	mustBeConnected({ pickup: ["user"] })
		.declareRoute(method, path)
		.extract({
			body: zod.object({
				commandId: zod.string()
			}).strip()
		})
		.check(
			commandExistCheck,
			{
				input: p => p("body").commandId,
				...commandExistCheck.preCompletions.mustExist
			},
			new IHaveSentThis(NotFoundHttpException.code, "command.notfound")
		)
		.cut(
			({ pickup }) => {
				const user = pickup("user");
				const command = pickup("command");

				if (command.userId != user.id) {
					throw new UnauthorizedHttpException("command.wrong.user");
				}

				return {};
			},
			[],
			new IHaveSentThis(UnauthorizedHttpException.code, "command.wrong.user")
		)
		.handler(
			async ({ pickup }) => {
				const { stripeSessionId } = pickup("command");
				const stripeSession = await stripe.checkout.sessions.retrieve(stripeSessionId);
				throw new CreatedHttpException("session", { sessionUrl: stripeSession.url });
			},
			new IHaveSentThis(CreatedHttpException.code, "session", sessionSchema)
		);
