import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

export function defaultToast(message: string) {
	toast({
		title: $t("toast.default"),
		description: message,
		variant: "default",
	});
}
