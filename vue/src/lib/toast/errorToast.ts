import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

export function errorToast(message: string) {
	toast({
		title: $t("toast.error"),
		description: message,
		variant: "destructive",
	});
}
