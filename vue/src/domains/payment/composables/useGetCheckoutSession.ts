export function useGetCheckoutSession(sessionId: string) {
	const checkoutSession = ref<StripeSession>({});

	function getCheckoutSession() {

		return duploTo.enriched
			.get(
				"/checkout-session",
				{ 
					query: { sessionId: sessionId }
				}
			)
			.info("stripe.session.get", (data) => {
				checkoutSession.value = data;
			})
			.result;
	}
	
	return {
		checkoutSession,
		getCheckoutSession
	};
}
