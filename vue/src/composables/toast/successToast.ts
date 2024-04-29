import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

export function useSuccessToast() {
	return (message: string) => {
		toast({
			title: "Succès",
			description: message,
			variant: "success",
		});
	};
}
