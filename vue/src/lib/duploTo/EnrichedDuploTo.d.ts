
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by @duplojs/to

export type parameters_0 = {
    query?: {
        address?: string | undefined;
    } | undefined;
}

export type response_body_0_0 = string[]

export type response_0_0 = {
    code: 200;
    ok: true;
    info?: undefined;
} & {body: response_body_0_0};

export type response_1_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_1_1 = {
    code: 401;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_1_2 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type response_2_0 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type response_3_0 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type parameters_4 = {
    params: {
        categoryName: string;
    };
}

export type response_4_0 = {
    code: 404;
    ok: false;
    info: "category.notfound";
} & {body: undefined};

export type response_body_4_1 = {
    id: string;
    name: string;
    description: string;
    price: number;
    created_at: Date;
    updated_at: Date;
}[]

export type response_4_1 = {
    code: 200;
    ok: true;
    info: "category.products";
} & {body: response_body_4_1};

export type parameters_5 = {
    query?: {
        email?: string | undefined;
    } | undefined;
}

export type response_5_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_5_1 = {
    code: 401;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_body_5_2 = {
    id: string;
    email: string;
    lastname: string;
    firstname: string;
    dateOfBirth?: string;
    address: string;
    primordialRole: string;
}[]

export type response_5_2 = {
    code: 200;
    ok: true;
    info: "users";
} & {body: response_body_5_2};

export type parameters_6 = {
    query?: {
        page?: number;
        name?: string | undefined;
    } | undefined;
}

export type response_6_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_6_1 = {
    code: 401;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_body_6_2 = {
    id: string;
    name: string;
    label: string | null;
    ownerId: string;
    suspended: boolean;
}[]

export type response_6_2 = {
    code: 200;
    ok: true;
    info: "organizations";
} & {body: response_body_6_2};

export type request_body_7 = string

export type response_7_0 = {
    code: 401;
    ok: false;
    info: "firebase.token.invalid";
} & {body: undefined};

export type response_7_1 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_body_7_2 = string

export type response_7_2 = {
    code: 200;
    ok: true;
    info: "user.logged";
} & {body: response_body_7_2};

export type request_body_8 = {
    fireBaseIdToken: string;
    lastname: string;
    firstname: string;
    address: string;
    dateOfBirth: Date;
}

export type response_8_0 = {
    code: 401;
    ok: false;
    info: "firebase.token.invalid";
} & {body: undefined};

export type response_8_1 = {
    code: 409;
    ok: false;
    info: "user.alreadyExist";
} & {body: undefined};

export type response_8_2 = {
    code: 400;
    ok: false;
    info: "user.address.invalid";
} & {body: undefined};

export type response_8_3 = {
    code: 400;
    ok: false;
    info: "user.dateOfBirth.invalid";
} & {body: undefined};

export type response_body_8_4 = string

export type response_8_4 = {
    code: 201;
    ok: true;
    info: "user.registered";
} & {body: response_body_8_4};

export type request_body_9 = {
    name: string;
    ownerId: string;
}

export type response_9_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_9_1 = {
    code: 401;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_9_2 = {
    code: 409;
    ok: false;
    info: "organization.alreadyExist";
} & {body: undefined};

export type response_9_3 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_9_4 = {
    code: 409;
    ok: false;
    info: "user.alreadyOwner";
} & {body: undefined};

export type response_9_5 = {
    code: 201;
    ok: true;
    info: "organization.created";
} & {body: undefined};

export type response_10_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_10_1 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_body_10_2 = {
    id: string;
    email: string;
    lastname: string;
    firstname: string;
    dateOfBirth?: string;
    address: string;
    primordialRole: string;
}

export type response_10_2 = {
    code: 200;
    ok: true;
    info: "user";
} & {body: response_body_10_2};

export type request_body_11 = {
    suspended?: boolean | undefined;
} | undefined

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
    code: 401;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_11_2 = {
    code: 404;
    ok: false;
    info: "organization.notfound";
} & {body: undefined};

export type response_11_3 = {
    code: 204;
    ok: true;
    info: "organization.edited";
} & {body: undefined};

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
	path: "/geocoder",
	method: "GET",
	body: unknown,
	parameters: parameters_0,
	response: response_0_0,
} | {
	path: "/entry/admin-panel*",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_1_0
		| response_1_1
		| response_1_2,
} | {
	path: "/entry/login" | "/entry/register",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_2_0,
} | {
	path: "/entry*",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_3_0,
} | {
	path: "/category/{categoryName}/products",
	method: "GET",
	body: unknown,
	parameters: parameters_4,
	response: response_4_0
		| response_4_1,
} | {
	path: "/users",
	method: "GET",
	body: unknown,
	parameters: parameters_5,
	response: response_5_0
		| response_5_1
		| response_5_2,
} | {
	path: "/organizations",
	method: "GET",
	body: unknown,
	parameters: parameters_6,
	response: response_6_0
		| response_6_1
		| response_6_2,
} | {
	path: "/login",
	method: "POST",
	body: request_body_7,
	parameters: undefined,
	response: response_7_0
		| response_7_1
		| response_7_2,
} | {
	path: "/register",
	method: "POST",
	body: request_body_8,
	parameters: undefined,
	response: response_8_0
		| response_8_1
		| response_8_2
		| response_8_3
		| response_8_4,
} | {
	path: "/organization",
	method: "POST",
	body: request_body_9,
	parameters: undefined,
	response: response_9_0
		| response_9_1
		| response_9_2
		| response_9_3
		| response_9_4
		| response_9_5,
} | {
	path: "/user",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_10_0
		| response_10_1
		| response_10_2,
} | {
	path: "/organization/{organizationId}",
	method: "PATCH",
	body: request_body_11,
	parameters: parameters_11,
	response: response_11_0
		| response_11_1
		| response_11_2
		| response_11_3,
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
		path: "/geocoder", 
		parameters ?: parameters_0 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_0_0
	>

	get(
		path: "/entry/admin-panel*", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_1_0
		| response_1_1
		| response_1_2
	>

	get(
		path: "/entry/login" | "/entry/register", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_2_0
	>

	get(
		path: "/entry*", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_3_0
	>

	get(
		path: "/category/{categoryName}/products", 
		parameters : parameters_4 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_4_0
		| response_4_1
	>

	get(
		path: "/users", 
		parameters ?: parameters_5 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_5_0
		| response_5_1
		| response_5_2
	>

	get(
		path: "/organizations", 
		parameters ?: parameters_6 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_6_0
		| response_6_1
		| response_6_2
	>

	post(
		path: "/login", 
		body: request_body_7,
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_7_0
		| response_7_1
		| response_7_2
	>

	post(
		path: "/register", 
		body: request_body_8,
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_8_0
		| response_8_1
		| response_8_2
		| response_8_3
		| response_8_4
	>

	post(
		path: "/organization", 
		body: request_body_9,
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_9_0
		| response_9_1
		| response_9_2
		| response_9_3
		| response_9_4
		| response_9_5
	>

	get(
		path: "/user", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_10_0
		| response_10_1
		| response_10_2
	>

	patch(
		path: "/organization/{organizationId}", 
		body: request_body_11,
		parameters : parameters_11 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_11_0
		| response_11_1
		| response_11_2
		| response_11_3
	>

}

/** @deprecated */
export type EnrichedDuplojsTo<
	interceptorParameter extends {} = {},
> = EnrichedDuploTo<interceptorParameter>;
