import firebaseAdmin, { ServiceAccount } from "firebase-admin";
import { existsSync, readFileSync } from "fs";

if(!existsSync(ENV.FIREBASE_CREDENTIAL_PATH)){
	throw new Error("Firebase credential not found.");
}

const credential: ServiceAccount = JSON.parse(
	readFileSync(ENV.FIREBASE_CREDENTIAL_PATH, "utf-8")
);

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(credential)
});

export const firebaseAuth = firebaseAdmin.auth();

duplo.addHook("beforeListenHttpServer", async () => {
	await firebaseAuth.getUsers([{email: "campani.mathieu@gmail.com"}]);
});
