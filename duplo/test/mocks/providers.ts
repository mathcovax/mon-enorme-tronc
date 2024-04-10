/* eslint-disable */
//@ts-nocheck
import { Auth } from "firebase-admin/lib/auth/auth";
import { PrismaClient } from "@prisma/client";

export class MockFirebaseAuth{
	private static firebaseAuth = {} as Auth;

	static set(key: keyof Auth, value: any){
		this.firebaseAuth[key] = value;
	}

	static resest(key?: keyof Auth){
		if(key){
			this.firebaseAuth[key] = undefined;
		}
		else {
			Object.keys(this.firebaseAuth).forEach((key) => this.firebaseAuth[key] = undefined);
		}
	}

	static {
		global.firebaseAuth = new Proxy(
			this.firebaseAuth,
			{
				get(target, prop: keyof Auth){
					if(!target[prop]){
						throw new Error(`Missing mocks firebaseAuth Prop '${prop}'`);
					}
					return target[prop];
				}
			}
		);
	}
}
type PrismaEntityKey = Exclude<keyof PrismaClient, `$${string}` | symbol>

export class MockPrisma{
	private static prismaMethods = {} as PrismaClient[PrismaEntityKey];

	static set(key: keyof PrismaClient[PrismaEntityKey], value: any){
		this.prismaMethods[key] = value;
	}

	static resest(key?: keyof PrismaClient[PrismaEntityKey]){
		if(key){
			this.prismaMethods[key] = undefined;
		}
		else {
			Object.keys(this.prismaMethods).forEach((key) => this.prismaMethods[key] = undefined);
		}
	}

	static {
		const methodsProxy = new Proxy(
			this.prismaMethods,
			{
				get(target, prop: keyof Auth){
					if(!target[prop]){
						throw new Error(`Missing mocks prisma methods '${prop}'`);
					}
					return target[prop];
				}
			}
		);

		global.prisma = new Proxy(
			{}, 
			{
				get(){
					return methodsProxy
				}
			}
		)
		
	}
}
