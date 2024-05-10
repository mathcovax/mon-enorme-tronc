import { PostService } from "@services/post";

/* METHOD : GET, PATH : /geocoder */
export const GET = (method: Methods, path: string) => duplo
	.declareRoute(method, path)
	.extract({
		query: {
			address: zod.string().optional()
		}
	})
	.handler(
		async ({ pickup }) => {
			const address = pickup("address");

			const addressLabels = address 
				? await PostService
					.getAddresses(address)
					.then(
						addresses => addresses.map(address => address.properties.label)
					)
				: [];

			throw new OkHttpException(undefined, addressLabels);
		},
		new IHaveSentThis(OkHttpException.code, zod.string().array())
	);
