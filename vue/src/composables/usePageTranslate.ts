export function usePageTranslate() {
	const route = useRoute();
	const $pt = (path?: string, rest?: Record<string, unknown>) =>
		i18n.global.t(`page.${route.name as string}.${path}`, rest || {});

	return $pt;
}
