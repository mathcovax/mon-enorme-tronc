<script setup lang="ts">
import TheToaster from "@/components/ui/toast/TheToaster.vue";
import { useToast } from "@/components/ui/toast/use-toast";

const toasts = ref([ // TODO: This is an exemple. Remove this when toasts are implemented.
	{
		type: "success",
		title: "Success",
		description: "This is a success message."
	},
	{
		type: "info",
		title: "Info",
		description: "This is an informational message."
	},
	{
		type: "error",
		title: "Error",
		description: "This is an error message.",
		action: true
	}
]);
const { toast } = useToast();

const showToast = () => {
	toasts.value.forEach((t, index) => {
		setTimeout(() => {
			toast({
				title: t.title,
				description: t.description,
				variant: t.type === "error" ? "destructive" : t.type === "success" ? "success" : "default",
				action: t.action ? 
					h("button", { 
						onClick: () => {
							console.log("Action");
						},
						altText: "Try again"
					},
					{
						default: () => "Try again",
					}) 
					: undefined,
				duration: 10000
			});
		}, 5000 * (index + 1));
	});
};

onMounted(() => {
	showToast();
});
</script>

<template>
	<RouterView />
	<TheToaster />
</template>
