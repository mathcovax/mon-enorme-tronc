import { AnyFunction } from "@duplojs/duplojs";

interface Request {
	matchUrl: RegExp
	callback: AnyFunction
}

export class MockFetch {
	static requests: Request[] = [];

	static fetch = global.fetch;

	static addResponse(matchUrl: RegExp, callback: AnyFunction){
		this.requests.push({
			matchUrl,
			callback,
		});
	}

	static clearRequests(){
		this.requests = [];
	}

	static start(){
		global.fetch = async(url, ...args) => {
			const responses = this.requests
				.find(v => v.matchUrl.test(url as string));

			return responses?.callback(url, ...args) || new Promise<globalThis.Response>((r, c) => c(new Error("Missing mock for this url.")));
		};
	}

	static stop(){
		global.fetch = this.fetch;
	}
}
