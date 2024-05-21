
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by @duplojs/to

export type response_0_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_0_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_0_2 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type response_1_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_1_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_1_2 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type parameters_2 = {
    params: {
        organizationId: string;
    };
}

export type response_2_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_2_1 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type response_2_2 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_2_3 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type parameters_3 = {
    params: {
        organizationId: string;
        productSheetId?: string | undefined;
    };
}

export type response_3_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_3_1 = {
    code: 401;
    ok: false;
    info: "entry.refuse";
} & {body: undefined};

export type response_3_2 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type response_3_3 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_3_4 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type parameters_4 = {
    params: {
        organizationId: string;
    };
}

export type response_4_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_4_1 = {
    code: 401;
    ok: false;
    info: "entry.refuse";
} & {body: undefined};

export type response_4_2 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type response_5_0 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type response_6_0 = {
    code: 204;
    ok: true;
    info: "entry.accepted";
} & {body: undefined};

export type parameters_7 = {
    query?: {
        address?: string | undefined;
    } | undefined;
}

export type response_body_7_0 = string[]

export type response_7_0 = {
    code: 200;
    ok: true;
    info?: undefined;
} & {body: response_body_7_0};

export type parameters_8 = {
    query?: {
        page?: number;
        name?: string | undefined;
    } | undefined;
}

export type response_8_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_8_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_body_8_2 = {
    id: string;
    name: string;
    label: string | null;
    ownerId: string;
    suspended: boolean;
}[]

export type response_8_2 = {
    code: 200;
    ok: true;
    info: "organizations";
} & {body: response_body_8_2};

export type parameters_9 = {
    query?: {
        name?: string | undefined;
        page?: number;
        withDisabled?: boolean | undefined;
    };
}

export type response_body_9_0 = {
    id: string;
    name: string;
    disabled: boolean;
}[]

export type response_9_0 = {
    code: 200;
    ok: true;
    info: "categories";
} & {body: response_body_9_0};

export type parameters_10 = {
    query?: {
        page?: number;
        email?: string | undefined;
        primordialRole?: (("CUSTOMER" | "MODERATOR" | "CONTENTS_MASTER" | "ADMIN") | ("CUSTOMER" | "MODERATOR" | "CONTENTS_MASTER" | "ADMIN")[]) | undefined;
    } | undefined;
}

export type response_10_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_10_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_body_10_2 = {
    id: string;
    email: string;
    lastname: string;
    firstname: string;
    dateOfBirth?: string;
    address: string;
    primordialRole: "CUSTOMER" | "MODERATOR" | "CONTENTS_MASTER" | "ADMIN";
    muted: boolean;
}[]

export type response_10_2 = {
    code: 200;
    ok: true;
    info: "users";
} & {body: response_body_10_2};

export type request_body_11 = string

export type response_11_0 = {
    code: 401;
    ok: false;
    info: "firebase.token.invalid";
} & {body: undefined};

export type response_11_1 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_body_11_2 = string

export type response_11_2 = {
    code: 200;
    ok: true;
    info: "user.logged";
} & {body: response_body_11_2};

export type request_body_12 = {
    fireBaseIdToken: string;
    lastname: string;
    firstname: string;
    address: string;
    dateOfBirth: Date;
}

export type response_12_0 = {
    code: 401;
    ok: false;
    info: "firebase.token.invalid";
} & {body: undefined};

export type response_12_1 = {
    code: 409;
    ok: false;
    info: "user.alreadyExist";
} & {body: undefined};

export type response_12_2 = {
    code: 400;
    ok: false;
    info: "user.address.invalid";
} & {body: undefined};

export type response_12_3 = {
    code: 400;
    ok: false;
    info: "user.dateOfBirth.invalid";
} & {body: undefined};

export type response_body_12_4 = string

export type response_12_4 = {
    code: 201;
    ok: true;
    info: "user.registered";
} & {body: response_body_12_4};

export type response_13_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_13_1 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_body_13_2 = {
    id: string;
    email: string;
    lastname: string;
    firstname: string;
    dateOfBirth?: string;
    address: string;
    primordialRole: "CUSTOMER" | "MODERATOR" | "CONTENTS_MASTER" | "ADMIN";
    muted: boolean;
}

export type response_13_2 = {
    code: 200;
    ok: true;
    info: "user";
} & {body: response_body_13_2};

export type request_body_14 = {
    primordialRole?: ("CUSTOMER" | "CONTENTS_MASTER" | "MODERATOR") | undefined;
    muted?: boolean | undefined;
}

export type parameters_14 = {
    params: {
        userId: string;
    };
}

export type response_14_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_14_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_14_2 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_14_3 = {
    code: 401;
    ok: false;
    info: "user.primordialRole.admin";
} & {body: undefined};

export type response_14_4 = {
    code: 204;
    ok: true;
    info: "user.edited";
} & {body: undefined};

export type request_body_15 = {
    name: string;
    ownerId: string;
}

export type response_15_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_15_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_15_2 = {
    code: 409;
    ok: false;
    info: "organization.alreadyExist";
} & {body: undefined};

export type response_15_3 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_15_4 = {
    code: 409;
    ok: false;
    info: "user.alreadyOwner";
} & {body: undefined};

export type response_15_5 = {
    code: 201;
    ok: true;
    info: "organization.created";
} & {body: undefined};

export type parameters_16 = {
    params: {
        organizationId: string;
    };
}

export type response_16_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_16_1 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_body_16_2 = {
    id: string;
    email: string;
    lastname: string;
    firstname: string;
    organizationRole: "STORE_KEEPER" | "PRODUCT_SHEET_MANAGER" | "ACCOUNTANT" | "OWNER";
}

export type response_16_2 = {
    code: 200;
    ok: true;
    info: "organization.user";
} & {body: response_body_16_2};

export type request_body_17 = {
    email: string;
    firstname: string;
    lastname: string;
    organizationRole: "STORE_KEEPER" | "PRODUCT_SHEET_MANAGER" | "ACCOUNTANT";
}

export type parameters_17 = {
    params: {
        organizationId: string;
    };
}

export type response_17_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_17_1 = {
    code: 404;
    ok: false;
    info: "user.notfound";
} & {body: undefined};

export type response_17_2 = {
    code: 409;
    ok: false;
    info: "organization.hasAlreadyUser";
} & {body: undefined};

export type response_17_3 = {
    code: 201;
    ok: true;
    info: "organization.user.add";
} & {body: undefined};

export type response_17_4 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_17_5 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type request_body_18 = {
    name: string;
    disabled: boolean;
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
    info: "category.alreadyExist";
} & {body: undefined};

export type response_18_3 = {
    code: 201;
    ok: true;
    info: "category.created";
} & {body: undefined};

export type request_body_19 = {
    name?: string | undefined;
    disabled?: boolean | undefined;
} | undefined

export type parameters_19 = {
    params: {
        categoryName: string;
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
    info: "category.notfound";
} & {body: undefined};

export type response_19_3 = {
    code: 409;
    ok: false;
    info: "category.alreadyExist";
} & {body: undefined};

export type response_19_4 = {
    code: 204;
    ok: true;
    info: "category.edited";
} & {body: undefined};

export type parameters_20 = {
    params: {
        categoryName: string;
    };
    query?: {
        page?: number;
    } | undefined;
}

export type response_20_0 = {
    code: 404;
    ok: false;
    info: "category.notfound";
} & {body: undefined};

export type response_body_20_1 = {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    createdAt?: string;
    updatedAt?: string;
    organizationId: string;
}[]

export type response_20_1 = {
    code: 200;
    ok: true;
    info: "category.products";
} & {body: response_body_20_1};

export type request_body_21 = {
    organizationRole?: ("STORE_KEEPER" | "PRODUCT_SHEET_MANAGER" | "ACCOUNTANT") | undefined;
}

export type parameters_21 = {
    params: {
        organizationId: string;
        userId: string;
    };
}

export type response_21_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_21_1 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_21_2 = {
    code: 401;
    ok: false;
    info: "organization.user.organizationRole.owner";
} & {body: undefined};

export type response_21_3 = {
    code: 204;
    ok: true;
    info: "organization.user.edited";
} & {body: undefined};

export type response_21_4 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_21_5 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type parameters_22 = {
    params: {
        organizationId: string;
        userId: string;
    };
}

export type response_22_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_22_1 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_22_2 = {
    code: 401;
    ok: false;
    info: "organization.user.organizationRole.owner";
} & {body: undefined};

export type response_22_3 = {
    code: 204;
    ok: true;
    info: "organization.user.deleted";
} & {body: undefined};

export type response_22_4 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_22_5 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type parameters_23 = {
    params: {
        productSheetId: string;
    };
}

export type response_23_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_23_1 = {
    code: 404;
    ok: false;
    info: "productSheet.notfound";
} & {body: undefined};

export type response_body_23_2 = {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    createdAt?: string;
    updatedAt?: string;
    organizationId: string;
}

export type response_23_2 = {
    code: 200;
    ok: true;
    info: "productSheet.found";
} & {body: response_body_23_2};

export type response_23_3 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_23_4 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type request_body_24 = {
    name?: string | undefined;
    description?: string | undefined;
    shortDescription?: string | undefined;
    price?: number | undefined;
}

export type parameters_24 = {
    params: {
        productSheetId: string;
    };
}

export type response_24_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_24_1 = {
    code: 404;
    ok: false;
    info: "productSheet.notfound";
} & {body: undefined};

export type response_body_24_2 = string

export type response_24_2 = {
    code: 201;
    ok: true;
    info: "productSheet.edited";
} & {body: response_body_24_2};

export type response_24_3 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_24_4 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type parameters_25 = {
    params: {
        productSheetId: string;
    };
}

export type response_25_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_25_1 = {
    code: 404;
    ok: false;
    info: "productSheet.notfound";
} & {body: undefined};

export type response_body_25_2 = {
    id: string;
    name: string;
    disabled: boolean;
}[]

export type response_25_2 = {
    code: 200;
    ok: true;
    info: "productSheet.categories";
} & {body: response_body_25_2};

export type response_25_3 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_25_4 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type request_body_26 = {
    productSheetId: string;
}

export type parameters_26 = {
    params: {
        categoryId: string;
    };
}

export type response_26_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_26_1 = {
    code: 404;
    ok: false;
    info: "productSheet.notfound";
} & {body: undefined};

export type response_26_2 = {
    code: 404;
    ok: false;
    info: "category.notfound";
} & {body: undefined};

export type response_26_3 = {
    code: 409;
    ok: false;
    info: "product.categories.limit";
} & {body: undefined};

export type response_26_4 = {
    code: 200;
    ok: true;
    info: "product_sheet_to_category.created";
} & {body: undefined};

export type response_26_5 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_26_6 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type parameters_27 = {
    params: {
        productSheetId: string;
        categoryId: string;
    };
}

export type response_27_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_27_1 = {
    code: 404;
    ok: false;
    info: "productSheet.notfound";
} & {body: undefined};

export type response_27_2 = {
    code: 404;
    ok: false;
    info: "category.notfound";
} & {body: undefined};

export type response_27_3 = {
    code: 200;
    ok: true;
    info: "product_sheet_to_category.delete";
} & {body: undefined};

export type response_27_4 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_27_5 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type parameters_28 = {
    params: {
        organizationId: string;
    };
    query?: {
        page?: number;
        name?: string | undefined;
    } | undefined;
}

export type response_28_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_body_28_1 = {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    createdAt?: string;
    updatedAt?: string;
    organizationId: string;
}[]

export type response_28_1 = {
    code: 200;
    ok: true;
    info: "productSheets.found";
} & {body: response_body_28_1};

export type response_28_2 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_28_3 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type request_body_29 = {
    name: string;
    description: string;
    shortDescription: string;
    price: number;
}

export type parameters_29 = {
    params: {
        organizationId: string;
    };
}

export type response_29_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_body_29_1 = string

export type response_29_1 = {
    code: 201;
    ok: true;
    info: "productSheet.created";
} & {body: response_body_29_1};

export type response_29_2 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_29_3 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
} & {body: undefined};

export type request_body_30 = {
    suspended?: boolean | undefined;
}

export type parameters_30 = {
    params: {
        organizationId: string;
    };
}

export type response_30_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_30_1 = {
    code: 403;
    ok: false;
    info: "user.role.invalid";
} & {body: undefined};

export type response_30_2 = {
    code: 404;
    ok: false;
    info: "organization.notfound";
} & {body: undefined};

export type response_30_3 = {
    code: 204;
    ok: true;
    info: "organization.edited";
} & {body: undefined};

export type parameters_31 = {
    params: {
        organizationId: string;
    };
    query?: {
        page?: number;
        email?: string | undefined;
    } | undefined;
}

export type response_31_0 = {
    code: 401;
    ok: false;
    info: "access.token.invalid";
} & {body: undefined};

export type response_body_31_1 = {
    id: string;
    email: string;
    lastname: string;
    firstname: string;
    organizationRole: "STORE_KEEPER" | "PRODUCT_SHEET_MANAGER" | "ACCOUNTANT" | "OWNER";
}[]

export type response_31_1 = {
    code: 200;
    ok: true;
    info: "organization.users";
} & {body: response_body_31_1};

export type response_31_2 = {
    code: 406;
    ok: false;
    info: "organization.hasNotUser";
} & {body: undefined};

export type response_31_3 = {
    code: 403;
    ok: false;
    info: "user.role.organization.invalid";
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
	path: "/entry/admin-panel*",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_0_0
		| response_0_1
		| response_0_2,
} | {
	path: "/entry/content-panel*",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_1_0
		| response_1_1
		| response_1_2,
} | {
	path: "/entry/organization/{organizationId}/manage-user",
	method: "GET",
	body: unknown,
	parameters: parameters_2,
	response: response_2_0
		| response_2_1
		| response_2_2
		| response_2_3,
} | {
	path: "/entry/organization/{organizationId}/product-sheets" | "/entry/organization/{organizationId}/edit-product-sheet/{productSheetId}" | "/entry/organization/{organizationId}/create-product-sheet",
	method: "GET",
	body: unknown,
	parameters: parameters_3,
	response: response_3_0
		| response_3_1
		| response_3_2
		| response_3_3
		| response_3_4,
} | {
	path: "/entry/organization/{organizationId}*",
	method: "GET",
	body: unknown,
	parameters: parameters_4,
	response: response_4_0
		| response_4_1
		| response_4_2,
} | {
	path: "/entry/login" | "/entry/register",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_5_0,
} | {
	path: "/entry*",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_6_0,
} | {
	path: "/geocoder",
	method: "GET",
	body: unknown,
	parameters: parameters_7,
	response: response_7_0,
} | {
	path: "/organizations",
	method: "GET",
	body: unknown,
	parameters: parameters_8,
	response: response_8_0
		| response_8_1
		| response_8_2,
} | {
	path: "/categories",
	method: "GET",
	body: unknown,
	parameters: parameters_9,
	response: response_9_0,
} | {
	path: "/users",
	method: "GET",
	body: unknown,
	parameters: parameters_10,
	response: response_10_0
		| response_10_1
		| response_10_2,
} | {
	path: "/login",
	method: "POST",
	body: request_body_11,
	parameters: undefined,
	response: response_11_0
		| response_11_1
		| response_11_2,
} | {
	path: "/register",
	method: "POST",
	body: request_body_12,
	parameters: undefined,
	response: response_12_0
		| response_12_1
		| response_12_2
		| response_12_3
		| response_12_4,
} | {
	path: "/user",
	method: "GET",
	body: unknown,
	parameters: undefined,
	response: response_13_0
		| response_13_1
		| response_13_2,
} | {
	path: "/user/{userId}@admin",
	method: "PATCH",
	body: request_body_14,
	parameters: parameters_14,
	response: response_14_0
		| response_14_1
		| response_14_2
		| response_14_3
		| response_14_4,
} | {
	path: "/organization",
	method: "POST",
	body: request_body_15,
	parameters: undefined,
	response: response_15_0
		| response_15_1
		| response_15_2
		| response_15_3
		| response_15_4
		| response_15_5,
} | {
	path: "/organization/{organizationId}/user",
	method: "GET",
	body: unknown,
	parameters: parameters_16,
	response: response_16_0
		| response_16_1
		| response_16_2,
} | {
	path: "/organization/{organizationId}/user",
	method: "POST",
	body: request_body_17,
	parameters: parameters_17,
	response: response_17_0
		| response_17_1
		| response_17_2
		| response_17_3
		| response_17_4
		| response_17_5,
} | {
	path: "/category",
	method: "POST",
	body: request_body_18,
	parameters: undefined,
	response: response_18_0
		| response_18_1
		| response_18_2
		| response_18_3,
} | {
	path: "/category/{categoryName}",
	method: "PATCH",
	body: request_body_19,
	parameters: parameters_19,
	response: response_19_0
		| response_19_1
		| response_19_2
		| response_19_3
		| response_19_4,
} | {
	path: "/category/{categoryName}/product-sheets",
	method: "GET",
	body: unknown,
	parameters: parameters_20,
	response: response_20_0
		| response_20_1,
} | {
	path: "/organization/{organizationId}/user/{userId}",
	method: "PATCH",
	body: request_body_21,
	parameters: parameters_21,
	response: response_21_0
		| response_21_1
		| response_21_2
		| response_21_3
		| response_21_4
		| response_21_5,
} | {
	path: "/organization/{organizationId}/user/{userId}",
	method: "DELETE",
	body: unknown,
	parameters: parameters_22,
	response: response_22_0
		| response_22_1
		| response_22_2
		| response_22_3
		| response_22_4
		| response_22_5,
} | {
	path: "/product-sheet/{productSheetId}",
	method: "GET",
	body: unknown,
	parameters: parameters_23,
	response: response_23_0
		| response_23_1
		| response_23_2
		| response_23_3
		| response_23_4,
} | {
	path: "/product-sheet/{productSheetId}",
	method: "PATCH",
	body: request_body_24,
	parameters: parameters_24,
	response: response_24_0
		| response_24_1
		| response_24_2
		| response_24_3
		| response_24_4,
} | {
	path: "/product-sheet/{productSheetId}/categories",
	method: "GET",
	body: unknown,
	parameters: parameters_25,
	response: response_25_0
		| response_25_1
		| response_25_2
		| response_25_3
		| response_25_4,
} | {
	path: "/category/{categoryId}/product-sheet",
	method: "POST",
	body: request_body_26,
	parameters: parameters_26,
	response: response_26_0
		| response_26_1
		| response_26_2
		| response_26_3
		| response_26_4
		| response_26_5
		| response_26_6,
} | {
	path: "/category/{categoryId}/product-sheet/{productSheetId}",
	method: "DELETE",
	body: unknown,
	parameters: parameters_27,
	response: response_27_0
		| response_27_1
		| response_27_2
		| response_27_3
		| response_27_4
		| response_27_5,
} | {
	path: "/organization/{organizationId}/product-sheets",
	method: "GET",
	body: unknown,
	parameters: parameters_28,
	response: response_28_0
		| response_28_1
		| response_28_2
		| response_28_3,
} | {
	path: "/organization/{organizationId}/product-sheet",
	method: "POST",
	body: request_body_29,
	parameters: parameters_29,
	response: response_29_0
		| response_29_1
		| response_29_2
		| response_29_3,
} | {
	path: "/organization/{organizationId}@admin",
	method: "PATCH",
	body: request_body_30,
	parameters: parameters_30,
	response: response_30_0
		| response_30_1
		| response_30_2
		| response_30_3,
} | {
	path: "/organization/{organizationId}/users",
	method: "GET",
	body: unknown,
	parameters: parameters_31,
	response: response_31_0
		| response_31_1
		| response_31_2
		| response_31_3,
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
		path: "/entry/admin-panel*", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_0_0
		| response_0_1
		| response_0_2
	>

	get(
		path: "/entry/content-panel*", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_1_0
		| response_1_1
		| response_1_2
	>

	get(
		path: "/entry/organization/{organizationId}/manage-user", 
		parameters : parameters_2 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_2_0
		| response_2_1
		| response_2_2
		| response_2_3
	>

	get(
		path: "/entry/organization/{organizationId}/product-sheets" | "/entry/organization/{organizationId}/edit-product-sheet/{productSheetId}" | "/entry/organization/{organizationId}/create-product-sheet", 
		parameters : parameters_3 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_3_0
		| response_3_1
		| response_3_2
		| response_3_3
		| response_3_4
	>

	get(
		path: "/entry/organization/{organizationId}*", 
		parameters : parameters_4 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_4_0
		| response_4_1
		| response_4_2
	>

	get(
		path: "/entry/login" | "/entry/register", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_5_0
	>

	get(
		path: "/entry*", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_6_0
	>

	get(
		path: "/geocoder", 
		parameters ?: parameters_7 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_7_0
	>

	get(
		path: "/organizations", 
		parameters ?: parameters_8 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_8_0
		| response_8_1
		| response_8_2
	>

	get(
		path: "/categories", 
		parameters ?: parameters_9 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_9_0
	>

	get(
		path: "/users", 
		parameters ?: parameters_10 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_10_0
		| response_10_1
		| response_10_2
	>

	post(
		path: "/login", 
		body: request_body_11,
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_11_0
		| response_11_1
		| response_11_2
	>

	post(
		path: "/register", 
		body: request_body_12,
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_12_0
		| response_12_1
		| response_12_2
		| response_12_3
		| response_12_4
	>

	get(
		path: "/user", 
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_13_0
		| response_13_1
		| response_13_2
	>

	patch(
		path: "/user/{userId}@admin", 
		body: request_body_14,
		parameters : parameters_14 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_14_0
		| response_14_1
		| response_14_2
		| response_14_3
		| response_14_4
	>

	post(
		path: "/organization", 
		body: request_body_15,
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_15_0
		| response_15_1
		| response_15_2
		| response_15_3
		| response_15_4
		| response_15_5
	>

	get(
		path: "/organization/{organizationId}/user", 
		parameters : parameters_16 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_16_0
		| response_16_1
		| response_16_2
	>

	post(
		path: "/organization/{organizationId}/user", 
		body: request_body_17,
		parameters : parameters_17 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_17_0
		| response_17_1
		| response_17_2
		| response_17_3
		| response_17_4
		| response_17_5
	>

	post(
		path: "/category", 
		body: request_body_18,
		parameters ?: UndefinedRequestParameters & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_18_0
		| response_18_1
		| response_18_2
		| response_18_3
	>

	patch(
		path: "/category/{categoryName}", 
		body: request_body_19,
		parameters : parameters_19 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_19_0
		| response_19_1
		| response_19_2
		| response_19_3
		| response_19_4
	>

	get(
		path: "/category/{categoryName}/product-sheets", 
		parameters : parameters_20 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_20_0
		| response_20_1
	>

	patch(
		path: "/organization/{organizationId}/user/{userId}", 
		body: request_body_21,
		parameters : parameters_21 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_21_0
		| response_21_1
		| response_21_2
		| response_21_3
		| response_21_4
		| response_21_5
	>

	delete(
		path: "/organization/{organizationId}/user/{userId}", 
		parameters : parameters_22 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_22_0
		| response_22_1
		| response_22_2
		| response_22_3
		| response_22_4
		| response_22_5
	>

	get(
		path: "/product-sheet/{productSheetId}", 
		parameters : parameters_23 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_23_0
		| response_23_1
		| response_23_2
		| response_23_3
		| response_23_4
	>

	patch(
		path: "/product-sheet/{productSheetId}", 
		body: request_body_24,
		parameters : parameters_24 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_24_0
		| response_24_1
		| response_24_2
		| response_24_3
		| response_24_4
	>

	get(
		path: "/product-sheet/{productSheetId}/categories", 
		parameters : parameters_25 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_25_0
		| response_25_1
		| response_25_2
		| response_25_3
		| response_25_4
	>

	post(
		path: "/category/{categoryId}/product-sheet", 
		body: request_body_26,
		parameters : parameters_26 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_26_0
		| response_26_1
		| response_26_2
		| response_26_3
		| response_26_4
		| response_26_5
		| response_26_6
	>

	delete(
		path: "/category/{categoryId}/product-sheet/{productSheetId}", 
		parameters : parameters_27 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_27_0
		| response_27_1
		| response_27_2
		| response_27_3
		| response_27_4
		| response_27_5
	>

	get(
		path: "/organization/{organizationId}/product-sheets", 
		parameters : parameters_28 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_28_0
		| response_28_1
		| response_28_2
		| response_28_3
	>

	post(
		path: "/organization/{organizationId}/product-sheet", 
		body: request_body_29,
		parameters : parameters_29 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_29_0
		| response_29_1
		| response_29_2
		| response_29_3
	>

	patch(
		path: "/organization/{organizationId}@admin", 
		body: request_body_30,
		parameters : parameters_30 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_30_0
		| response_30_1
		| response_30_2
		| response_30_3
	>

	get(
		path: "/organization/{organizationId}/users", 
		parameters : parameters_31 & BaseRequestParameters,
		interceptorParams?: interceptorParameter
	): EnrichedRequestor<
		response_31_0
		| response_31_1
		| response_31_2
		| response_31_3
	>

}

/** @deprecated */
export type EnrichedDuplojsTo<
	interceptorParameter extends {} = {},
> = EnrichedDuploTo<interceptorParameter>;
