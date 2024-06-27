import { Config, JsonDB } from "node-json-db";

export class LastTime {
	private db: JsonDB;

	constructor(
		private id: string
	) {
		this.db = new JsonDB(
			new Config(`src/filesDB/${this.id}.json`)
		);
	}

	get() {
		return this.db.exists("/timestamp")
			.then(result => result ? Promise.resolve() : this.db.push("/timestamp", 0))
			.then(() => this.db.getData("/timestamp"))
			.then(timestamp => new Date(timestamp));
	}

	set(date: Date) {
		return this.db.push("/timestamp", date.getTime());
	}
}
