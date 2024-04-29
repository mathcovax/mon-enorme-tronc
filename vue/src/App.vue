<script setup lang="ts">
import TheToaster from "@/components/ui/toast/TheToaster.vue";

const toasts = ref([]);

const showToast = () => {
	toasts.value.forEach((toast) => {
		let toastFunction;

		if ((toast as { type: string }).type === "success") {
			toastFunction = useSuccessToast();
		} else if ((toast as { type: string }).type === "info") {
			toastFunction = useDefaultToast();
		} else if ((toast as { type: string }).type === "error") {
			toastFunction = useErrorToast();
		} else {
			toastFunction = useDefaultToast();
		}

		toastFunction((toast as { description: string }).description);
	});
};

onMounted(() => {
	watch(() => toasts.value, showToast, { immediate: true });
});
</script>

<template>
	<RouterView />
	<TheToaster />
</template>
