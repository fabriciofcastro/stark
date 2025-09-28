export function reportWebVitalsToGA(metric: {
	name: string;
	id: string;
	value: number;
}) {
	if (typeof window === "undefined") return;
	const consent = window.localStorage.getItem("consent:analytics");
	if (consent !== "granted") return;
	try {
		// Envia como evento GA4 padronizado
		(window as any).gtag?.("event", metric.name, {
			value: Math.round(metric.value),
			metric_id: metric.id,
		});
	} catch {}
}
