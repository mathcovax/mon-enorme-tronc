/* eslint-disable */
//@ts-nocheck

export class MockEnv {
	private static ENV = ENV;

	static set<keyEnv extends keyof (typeof ENV)>(key: keyEnv, value: (typeof ENV)[keyEnv]){
		ENV[key] = value;
	}

	static reset(key?: keyof (typeof ENV)){
		if(key){
			ENV[key] = this.ENV[key];
		}
		else {
			global.ENV = {
				...this.ENV
			};
		}
	}

	static {
		this.reset();
	}
}
