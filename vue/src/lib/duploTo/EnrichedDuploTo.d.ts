
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by @duplojs/to

export type parameters_0 = {
    query?: {
        name?: string | undefined;
        page?: number;
        withDisabled?: boolean | undefined;
    };
}

export type response_body_0_0 = {
    id: string;
    name: string;
    disabled: boolean;
}[]

export type response_0_0 = {
    code: 200;
    ok: true;
    info: "categories";
} & {body: response_body_0_0};

export type parameters_1 = {
    params: {
        categoryName: string;
    };
}

export type response_1_0 = {
    code: 404;
    ok: false;
    info: "category.notfound";
} & {body: undefined};

export type response_body_1_1 = {
    id: string;
    name: string;
    description: string;
    price: number;
    created_at: Date;
    updated_at: Date;
}[]

export type response_1_1 = {
    code: 200;
    ok: true;
    info: "category.products";
} & {body: response_body_1_1};

export type parameters_2 = {
    query?: {
        address?: string | undefined;
    } | undefined;
}

export type response_body_2_0 = string[]

export type response_2_0 = {
    code: 200;
    ok: true;
    info?: undefined;
} & {body: response_body_2_0};

export type response_3_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_3_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_3_2 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type response_4_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_4_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_4_2 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type parameters_5 = {
    params: {
        organizationId: string;
    };
}

export type response_5_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_5_1 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type response_5_2 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_5_3 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type parameters_6 = {
    params: {
        organizationId: string;
    };
}

export type response_6_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_6_1 = {
    code: 401;
    ok: false;
    info: "entry.refuse";
} & {body: undefined};

export type response_6_2 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type response_7_0 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type response_8_0 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type request_body_9 = string

export type response_9_0 = {
    code: 401;
    ok: false;
    info: "firebase.token.invalid";
} & {body: undefined};

export type response_9_1 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_body_9_2 = string

export type response_9_2 = {
    code: 200;
    ok: true;
    info: "user.logged";
} & {body: response_body_9_2};

export type request_body_10 = {
    fireBaseIdToken: string;
    lastname: string;
    firstname: string;
    address: string;
    dateOfBirth: Date;
}

export type response_10_0 = {
    code: 401;
    ok: false;
    info: "firebase.token.invalid";
} & {body: undefined};

export type response_10_1 = {
    code: 409;
    ok: false;
    info: "user.alreadyExist";
} & {body: undefined};

export type response_10_2 = {
    code: 400;
    ok: false;
    info: "user.address.invalid";
} & {body: undefined};

export type response_10_3 = {
    code: 400;
    ok: false;
    info: "user.dateOfBirth.invalid";
} & {body: undefined};

export type response_body_10_4 = string

export type response_10_4 = {
    code: 201;
    ok: true;
    info: "user.registered";
} & {body: response_body_10_4};

export type request_body_11 = {
    email: string;
    firstname: string;
    lastname: string;
    organizationRole: "STORE_KEEPER" | "PRODUCT_SHEET_MANAGER" | "ACCOUNTANT";
}

export type parameters_11 = {
    params: {
        organizationId: string;
    };
}

export type response_11_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_11_1 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_11_2 = {
    code: 409;
    ok: false;
    info: "organization.hasAlreadyUser";
} & {body: undefined};

export type response_11_3 = {
    code: 201;
    ok: true;
    info: "organization.user.add";
} & {body: undefined};

export type response_11_4 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_11_5 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type response_12_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_12_1 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_body_12_2 = {
    id: string;
    email: string;
    lastname: string;
    firstname: string;
    dateOfBirth?: string;
    address: string;
    primordialRole: "CUSTOMER" | "MODERATOR" | "CONTENTS_MASTER" | "ADMIN";
    muted: boolean;
}

export type response_12_2 = {
    code: 200;
    ok: true;
    info: "user";
} & {body: response_body_12_2};

export type request_body_13 = {
    organizationRole?: ("STORE_KEEPER" | "PRODUCT_SHEET_MANAGER" | "ACCOUNTANT") | undefined;
}

export type parameters_13 = {
    params: {
        organizationId: string;
        userId: string;
    };
}

export type response_13_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_13_1 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_13_2 = {
    code: 401;
    ok: false;
    info: "organization.user.organizationRole.owner";
} & {body: undefined};

export type response_13_3 = {
    code: 204;
    ok: true;
    info: "organization.user.edited";
} & {body: undefined};

export type response_13_4 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_13_5 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type parameters_14 = {
    params: {
        organizationId: string;
        userId: string;
    };
}

export type response_14_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_14_1 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_14_2 = {
    code: 401;
    ok: false;
    info: "organization.user.organizationRole.owner";
} & {body: undefined};

export type response_14_3 = {
    code: 204;
    ok: true;
    info: "organization.user.deleted";
} & {body: undefined};

export type response_14_4 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_14_5 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type parameters_15 = {
    params: {
        organizationId: string;
    };
    query?: {
        page?: number;
        email?: string | undefined;
    } | undefined;
}

export type response_15_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_body_15_1 = {
    id: string;
    email: string;
    lastname: string;
    firstname: string;
    organizationRole: "STORE_KEEPER" | "PRODUCT_SHEET_MANAGER" | "ACCOUNTANT" | "OWNER";
}[]

export type response_15_1 = {
    code: 200;
    ok: true;
    info: "organization.users";
} & {body: response_body_15_1};

export type response_15_2 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_15_3 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type request_body_16 = {
    name: string;
    disabled: boolean;
}

export type response_16_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_16_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_16_2 = {
    code: 409;
    ok: false;
    info: "category.alreadyExist";
} & {body: undefined};

export type response_16_3 = {
    code: 201;
    ok: true;
    info: "category.created";
} & {body: undefined};

export type request_body_17 = {
    name?: string | undefined;
    disabled?: boolean | undefined;
} | undefined

export type parameters_17 = {
    params: {
        categoryName: string;
    };
}

export type response_17_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_17_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_17_2 = {
    code: 404;
    ok: false;
    info: "category.notfound";
} & {body: undefined};

export type response_17_3 = {
    code: 409;
    ok: false;
    info: "category.alreadyExist";
} & {body: undefined};

export type response_17_4 = {
    code: 204;
    ok: true;
    info: "category.edited";
} & {body: undefined};

export type request_body_18 = {
    name: string;
    ownerId: string;
}

export type response_18_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_18_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_18_2 = {
    code: 409;
    ok: false;
    info: "organization.alreadyExist";
} & {body: undefined};

export type response_18_3 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_18_4 = {
    code: 409;
    ok: false;
    info: "user.alreadyOwner";
} & {body: undefined};

export type response_18_5 = {
    code: 201;
    ok: true;
    info: "organization.created";
} & {body: undefined};

export type request_body_19 = {
    suspended?: boolean | undefined;
}

export type parameters_19 = {
    params: {
        organizationId: string;
    };
}

export type response_19_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_19_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_19_2 = {
    code: 404;
    ok: false;
    info: "organization.notfound";
} & {body: undefined};

export type response_19_3 = {
    code: 204;
    ok: true;
    info: "organization.edited";
} & {body: undefined};

export type request_body_20 = {
    primordialRole?: ("CUSTOMER" | "CONTENTS_MASTER" | "MODERATOR") | undefined;
    muted?: boolean | undefined;
}

export type parameters_20 = {
    params: {
        userId: string;
    };
}

export type response_20_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_20_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_20_2 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_20_3 = {
    code: 401;
    ok: false;
    info: "user.primordialRole.admin";
} & {body: undefined};

export type response_20_4 = {
    code: 204;
    ok: true;
    info: "user.edited";
} & {body: undefined};

export type parameters_21 = {
    query?: {
        page?: number;
        email?: string | undefined;
        primordialRole?: (("CUSTOMER" | "MODERATOR" | "CONTENTS_MASTER" | "ADMIN") | ("CUSTOMER" | "MODERATOR" | "CONTENTS_MASTER" | "ADMIN")[]) | undefined;
    } | undefined;
}

export type response_21_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_21_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_body_21_2 = {
    id: string;
    email: string;
    lastname: string;
    firstname: string;
    dateOfBirth?: string;
    address: string;
    primordialRole: "CUSTOMER" | "MODERATOR" | "CONTENTS_MASTER" | "ADMIN";
    muted: boolean;
}[]

export type response_21_2 = {
    code: 200;
    ok: true;
    info: "users";
} & {body: response_body_21_2};

export type parameters_22 = {
    query?: {
        page?: number;
        name?: string | undefined;
    } | undefined;
}

export type response_22_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_22_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_body_22_2 = {
    id: string;
    name: string;
    label: string | null;
    ownerId: string;
    suspended: boolean;
}[]

export type response_22_2 = {
    code: 200;
    ok: true;
    info: "organizations";
} & {body: response_body_22_2};

export type GetDef<
	method extends DefEnrichedDuplojsTo["method"],
	path extends Extract<
		DefEnrichedDuplojsTo, 
		{method: method}
	>["path"] = any, 
> = Extract<
	DefEnrichedDuplojsTo, 
	{
		method: method,
		path: path
	}
>;

export type DefDefinition = {
	path: string,
	method: string,
	body: unknown,
	parameters: unknown,
	response: ResponseDefinition,
}

export type GetResponseByInfo<
	def extends DefDefinition,
	info extends def["response"]["info"]
> = Extract<
	def["response"], 
	{
		info: info
	}
>;

export type GetResponseByCode<
	def extends DefDefinition,
	code extends def["response"]["code"]
> = Extract<
	def["response"], 
	{
		code: code
	}
>;

export type DefEnrichedDuplojsTo = {
	path: "/categories",
	method: "GET",
	body: unknown,
	parameters: parameters_0,
	response: response_0_0,
} | {
	path: "/category/{categoryName}/products",
	method: "GET",
	body: unknown,
	parameters: parameters_1,
	response: response_1_0
		| response_1_1,
} | {
	path: "/geocoder",
	method: "GET",
	body: unknown,
	parameters: parameters_2,
	response: response_2_0,
} | {
	path: "/entry/admin-panel*",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_3_0
		| response_3_1
		| response_3_2,
} | {
	path: "/entry/content-panel*",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_4_0
		| response_4_1
		| response_4_2,
} | {
	path: "/entry/organization/{organizationId}/manage-user",
	method: "GET",
	body: unknown,
	parameters: parameters_5,
	response: response_5_0
		| response_5_1
		| response_5_2
		| response_5_3,
} | {
	path: "/entry/organization/{organizationId}*",
	method: "GET",
	body: unknown,
	parameters: parameters_6,
	response: response_6_0
		| response_6_1
		| response_6_2,
} | {
	path: "/entry/login" | "/entry/register",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_7_0,
} | {
	path: "/entry*",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_8_0,
} | {
	path: "/login",
	method: "POST",
	body: request_body_9,
	parameters: undefined,
	response: response_9_0
		| response_9_1
		| response_9_2,
} | {
	path: "/register",
	method: "POST",
	body: request_body_10,
	parameters: undefined,
	response: response_10_0
		| response_10_1
		| response_10_2
		| response_10_3
		| response_10_4,
} | {
	path: "/organization/{organizationId}/user",
	method: "POST",
	body: request_body_11,
	parameters: parameters_11,
	response: response_11_0
		| response_11_1
		| response_11_2
		| response_11_3
		| response_11_4
		| response_11_5,
} | {
	path: "/user",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_12_0
		| response_12_1
		| response_12_2,
} | {
	path: "/organization/{organizationId}/user/{userId}",
	method: "PATCH",
	body: request_body_13,
	parameters: parameters_13,
	response: response_13_0
		| response_13_1
		| response_13_2
		| response_13_3
		| response_13_4
		| response_13_5,
} | {
	path: "/organization/{organizationId}/user/{userId}",
	method: "DELETE",
	body: unknown,
	parameters: parameters_14,
	response: response_14_0
		| response_14_1
		| response_14_2
		| response_14_3
		| response_14_4
		| response_14_5,
} | {
	path: "/organization/{organizationId}/users",
	method: "GET",
	body: unknown,
	parameters: parameters_15,
	response: response_15_0
		| response_15_1
		| response_15_2
		| response_15_3,
} | {
	path: "/category",
	method: "POST",
	body: request_body_16,
	parameters: undefined,
	response: response_16_0
		| response_16_1
		| response_16_2
		| response_16_3,
} | {
	path: "/category/{categoryName}",
	method: "PATCH",
	body: request_body_17,
	parameters: parameters_17,
	response: response_17_0
		| response_17_1
		| response_17_2
		| response_17_3
		| response_17_4,
} | {
	path: "/organization",
	method: "POST",
	body: request_body_18,
	parameters: undefined,
	response: response_18_0
		| response_18_1
		| response_18_2
		| response_18_3
		| response_18_4
		| response_18_5,
} | {
	path: "/organization/{organizationId}@admin",
	method: "PATCH",
	body: request_body_19,
	parameters: parameters_19,
	response: response_19_0
		| response_19_1
		| response_19_2
		| response_19_3,
} | {
	path: "/user/{userId}@admin",
	method: "PATCH",
	body: request_body_20,
	parameters: parameters_20,
	response: response_20_0
		| response_20_1
		| response_20_2
		| response_20_3
		| response_20_4,
} | {
	path: "/users",
	method: "GET",
	body: unknown,
	parameters: parameters_21,
	response: response_21_0
		| response_21_1
		| response_21_2,
} | {
	path: "/organizations",
	method: "GET",
	body: unknown,
	parameters: parameters_22,
	response: response_22_0
		| response_22_1
		| response_22_2,
};


export type BaseRequestParameters = {
	disabledPrefix?: boolean,
} & Omit<RequestInit, "headers" | "method">;

export type UndefinedRequestParameters = {
	headers?: string | string[];
}

export type DefToArgumentsWithInfo<
	responseDefinition extends ResponseDefinition
> = responseDefinition extends ResponseDefinition 
	? [data: responseDefinition["body"], info: responseDefinition["info"]]
	: never

export type DefToArgumentsWithCode<
	responseDefinition extends ResponseDefinition
> = responseDefinition extends ResponseDefinition 
	? [data: responseDefinition["body"], code: responseDefinition["code"]]
	: never

export type RequestCallbackError = (error: Error) => void

export type ResponseObjectError = {
	success: false,
	error: Error,
}

export interface ResponseDefinition {
	code: number;
	ok: boolean;
	info?: string;
	body?: any;
}

export type RepDefToResponseObject<repDef extends ResponseDefinition> = 
	repDef extends ResponseDefinition 
		? {
			success: true,
			response: Response,
			data: repDef["body"],
			info: repDef["info"],
			code: repDef["code"]
		}
		: never

export declare class EnrichedRequestor<
	repDef extends ResponseDefinition
>{

	s(cb: (data: Extract<repDef, {ok: true}>["body"]) => void): this;
	sd(): Promise<
		Extract<repDef, {ok: true}>["body"]
	>;

	e(cb: (data: Extract<repDef, {ok: false}>["body"]) => void): this;
	ed(): Promise<
		Extract<repDef, {ok: false}>["body"]
	>;

	info<_info extends repDef["info"]>(
		info: _info | _info[],
		cb: (...args: DefToArgumentsWithInfo<Extract<repDef, {info: _info}>>) => void
	): this;
	id<_info extends repDef["info"]>(info: _info | _info[]): Promise<
		Extract<repDef, {info: _info}>["body"]
	>;

	code<_code extends repDef["code"]>(
		code: _code | _code[],
		cb: (...args: DefToArgumentsWithCode<Extract<repDef, {code: _code}>>) => void
	): this;
	cd<_code extends repDef["code"]>(code: _code | _code[]): Promise<
		Extract<repDef, {code: _code}>["body"]
	>;

	then(cb: (response: RepDefToResponseObject<repDef>) => void): this;
	catch(cb: RequestCallbackError): this;
	finally(cb: (response: RepDefToResponseObject<repDef> | ResponseObjectError) => void): this;
	result: Promise<
		| RepDefToResponseObject<repDef>
		| ResponseObjectError
	>;
}

export interface EnrichedDuploTo<
	interceptorParameter extends {} = {},
>{
	
	get(
		path: "/categories", 
		parameters ?: parameters_0 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_0_0
	>

	get(
		path: "/category/{categoryName}/products", 
		parameters : parameters_1 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_1_0
		| response_1_1
	>

	get(
		path: "/geocoder", 
		parameters ?: parameters_2 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_2_0
	>

	get(
		path: "/entry/admin-panel*", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_3_0
		| response_3_1
		| response_3_2
	>

	get(
		path: "/entry/content-panel*", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_4_0
		| response_4_1
		| response_4_2
	>

	get(
		path: "/entry/organization/{organizationId}/manage-user", 
		parameters : parameters_5 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_5_0
		| response_5_1
		| response_5_2
		| response_5_3
	>

	get(
		path: "/entry/organization/{organizationId}*", 
		parameters : parameters_6 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_6_0
		| response_6_1
		| response_6_2
	>

	get(
		path: "/entry/login" | "/entry/register", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_7_0
	>

	get(
		path: "/entry*", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_8_0
	>

	post(
		path: "/login", 
		body: request_body_9,
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_9_0
		| response_9_1
		| response_9_2
	>

	post(
		path: "/register", 
		body: request_body_10,
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_10_0
		| response_10_1
		| response_10_2
		| response_10_3
		| response_10_4
	>

	post(
		path: "/organization/{organizationId}/user", 
		body: request_body_11,
		parameters : parameters_11 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_11_0
		| response_11_1
		| response_11_2
		| response_11_3
		| response_11_4
		| response_11_5
	>

	get(
		path: "/user", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_12_0
		| response_12_1
		| response_12_2
	>

	patch(
		path: "/organization/{organizationId}/user/{userId}", 
		body: request_body_13,
		parameters : parameters_13 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_13_0
		| response_13_1
		| response_13_2
		| response_13_3
		| response_13_4
		| response_13_5
	>

	delete(
		path: "/organization/{organizationId}/user/{userId}", 
		parameters : parameters_14 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_14_0
		| response_14_1
		| response_14_2
		| response_14_3
		| response_14_4
		| response_14_5
	>

	get(
		path: "/organization/{organizationId}/users", 
		parameters : parameters_15 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_15_0
		| response_15_1
		| response_15_2
		| response_15_3
	>

	post(
		path: "/category", 
		body: request_body_16,
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_16_0
		| response_16_1
		| response_16_2
		| response_16_3
	>

	patch(
		path: "/category/{categoryName}", 
		body: request_body_17,
		parameters : parameters_17 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_17_0
		| response_17_1
		| response_17_2
		| response_17_3
		| response_17_4
	>

	post(
		path: "/organization", 
		body: request_body_18,
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_18_0
		| response_18_1
		| response_18_2
		| response_18_3
		| response_18_4
		| response_18_5
	>

	patch(
		path: "/organization/{organizationId}@admin", 
		body: request_body_19,
		parameters : parameters_19 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_19_0
		| response_19_1
		| response_19_2
		| response_19_3
	>

	patch(
		path: "/user/{userId}@admin", 
		body: request_body_20,
		parameters : parameters_20 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_20_0
		| response_20_1
		| response_20_2
		| response_20_3
		| response_20_4
	>

	get(
		path: "/users", 
		parameters ?: parameters_21 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_21_0
		| response_21_1
		| response_21_2
	>

	get(
		path: "/organizations", 
		parameters ?: parameters_22 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_22_0
		| response_22_1
		| response_22_2
	>

}

/** @deprecated */
export type EnrichedDuplojsTo<
	interceptorParameter extends {} = {},
> = EnrichedDuploTo<interceptorParameter>;
