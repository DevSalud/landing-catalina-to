/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
/// <reference path="../.astro/types.d.ts" />

interface Env {
	RESEND_API_KEY: string
	PUBLIC_MAPS_API_KEY: string
	UPDATE_APPOINTMENT_STATUS_FUNCTION_URL: string
	SUPABASE_PUBLIC_KEY: string
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>

// biome-ignore lint/style/noNamespace: <explanation>
declare namespace App {
	interface Locals extends Runtime {}
}
