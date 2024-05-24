/* eslint-disable */
//@ts-nocheck
import { Auth } from "firebase-admin/lib/auth/auth";
import { PrismaClient } from "@prisma/client";
import { S3Client } from "@aws-sdk/client-s3";

export class MockFirebaseAuth{
	private static firebaseAuth = {} as Auth;

	static set(key: keyof Auth, value: any){
		this.firebaseAuth[key] = value;
	}

	static reset(key?: keyof Auth){
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
	private static prisma = {} as PrismaClient[PrismaEntityKey];

	static set(entity: PrismaEntityKey, key: keyof PrismaClient[PrismaEntityKey], value: any){
		if(!this.prisma[entity]){
			this.prisma[entity] = {}
		}
		this.prisma[entity][key] = value;
	}

	static reset(entity?: PrismaEntityKey, key?: keyof PrismaClient[PrismaEntityKey]){
		if(entity && key){
			this.prisma[entity][key] = undefined;
		}
		else if(entity){
			this.prisma[entity] = undefined;
		}
		else {
			Object.keys(this.prisma).forEach((key) => this.prisma[key] = undefined);
		}
	}

	static {
		global.prisma = this.prisma
	}
}

export class MockS3{
	private static S3 = {} as S3Client;

	static set(prop: keyof S3Client, value: any){
		this.S3[prop] = value;
	}

	static reset(prop?: keyof S3Client){
		if(prop){
			this.S3[prop] = undefined;
		}
		else {
			Object.keys(this.S3).forEach((key) => this.S3[key] = undefined);
		}
	}

	static {
		global.S3 = this.S3
	}
}
