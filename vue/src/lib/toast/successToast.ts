import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

export function successToast(message: string){
	toast({
		title: $t("toast.seccess"),
		description: message,
		variant: "success",
	});
}
