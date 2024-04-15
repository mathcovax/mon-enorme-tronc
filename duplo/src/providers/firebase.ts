import firebaseAdmin, { ServiceAccount } from "firebase-admin";
import { Auth } from "firebase-admin/lib/auth/auth";
import { existsSync, readFileSync } from "fs";

declare global {
	const firebaseAuth: (typeof import("./firebase"))["firebaseAuth"];
}

export let firebaseAuth: Auth;

duplo.addHook("beforeListenHttpServer", async () => {
	if(!existsSync(ENV.FIREBASE_CREDENTIAL_PATH)){
		throw new Error("Firebase credential not found.");
	}

	const credential: ServiceAccount = JSON.parse(
		readFileSync(ENV.FIREBASE_CREDENTIAL_PATH, "utf-8")
	);

	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert(credential)
	});

	//@ts-expect-error var 'global' cause type error.
	firebaseAuth = global.firebaseAuth = firebaseAdmin.auth();

	await firebaseAuth.getUsers([{ email: "campani.mathieu@gmail.com" }]);
});
