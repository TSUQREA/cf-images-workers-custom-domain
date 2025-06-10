export default {
	async fetch(request, env, ctx): Promise<Response> {
		// You can find this in the dashboard, it should look something like this: ZWd9g1K7eljCn_KDTu_MWA
		const accountHash = env.ACCOUNT_HASH;

		if (!accountHash || accountHash === 'YOUR_ACCOUNT_HASH') {
			return new Response('ACCOUNT_HASH environment variable is not configured. Please set it in the Cloudflare dashboard.', {
				status: 500,
				headers: { 'Content-Type': 'text/plain' }
			});
		}

		const { pathname } = new URL(request.url);

		// A request to something like cdn.example.com/83eb7b2-5392-4565-b69e-aff66acddd00/public
		// will fetch "https://imagedelivery.net/<accountHash>/83eb7b2-5392-4565-b69e-aff66acddd00/public"

		return fetch(`https://imagedelivery.net/${accountHash}${pathname}`);
	},
} satisfies ExportedHandler;
