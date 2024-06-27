import "./setup";
import { FindSlice } from "@utils/findSlice";
import { LastTime } from "./setup/lastTime";
import { prisma } from "./setup/prismaClient";

const newLastReadNotification = new Date();
const lastTime = new LastTime("readNotification");
const lastReadNotification = await lastTime.get();


const generator = FindSlice(
	50,
	(slice, size) => prisma.stripe_notification_checkout.findMany({
		where: {
			createdAt: {
				gte: lastReadNotification
			}
		},
		skip: slice * size,
		take: size,
	})
);

let promiseList: unknown[] = [];

for await (const notification of generator) {
	promiseList.push(
		prisma.command.updateMany({
			where: {
				id: notification.commandId,
				status: "WAITING_PAYMENT",
			},
			data: {
				status: notification.type === "checkout.session.completed"
					? "IN_PROGESS"
					: "CANCELED"
			}
		})
	);

	if (promiseList.length > 1000) {
		await Promise.all(promiseList);
		promiseList = [];
	}
}

await Promise.all(promiseList);
lastTime.set(newLastReadNotification);
