import admin, { ServiceAccount } from "firebase-admin";
import { existsSync, readFileSync } from "fs";

if(!existsSync(ENV.FIREBASE_CREDENTIAL_PATH)){
	throw new Error("Firebase credential not found.");
}

const credential: ServiceAccount = JSON.parse(
	readFileSync(ENV.FIREBASE_CREDENTIAL_PATH, "utf-8")
);

export const app = admin.initializeApp({
	credential: admin.credential.cert(credential)
});
