/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
/// <reference path="../.astro/types.d.ts" />

interface Env {
	// biome-ignore lint/style/useNamingConvention: <explanation>
	RESEND_API_KEY: string
	// biome-ignore lint/style/useNamingConvention: <explanation>
	PUBLIC_MAPS_API_KEY: string
	// biome-ignore lint/style/useNamingConvention: <explanation>
	UPDATE_APPOINTMENT_STATUS_FUNCTION_URL: string
	// biome-ignore lint/style/useNamingConvention: <explanation>
	SUPABASE_PUBLIC_KEY: string
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>

// biome-ignore lint/style/noNamespace: <explanation>
declare namespace App {
	interface Locals extends Runtime {}
}
