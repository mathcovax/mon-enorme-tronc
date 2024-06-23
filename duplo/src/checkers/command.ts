export const commandExistCheck = duplo
	.createChecker("commandExist")
	.handler(async (id: string, output) => {

		const command = await prisma.command.findFirst({
			where: {
				id
			},
		});

		if (command) {
			return output("command.exist", command);
		}
		else {
			return output("command.notfound", null);
		}
	})
	.preCompletion(
		"mustExist",
		{
			result: "command.exist",
			catch: () => {
				throw new NotFoundHttpException("command.notfound");
			},
			indexing: "command",
		}
	)
	.build();
