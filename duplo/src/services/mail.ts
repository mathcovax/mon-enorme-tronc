import nodemailer from "nodemailer";
import env from "@/env";

export class Mail {

	private static transporter = nodemailer.createTransport({
		host: env.MAIL_HOST,
		port: 1025,
		secure: false,
	});

	public static send(to: string, subject: string, text: string) {
		return this.transporter.sendMail({
			from: env.MAIL_FROM,
			to,
			subject,
			text,
		});
	}
}
