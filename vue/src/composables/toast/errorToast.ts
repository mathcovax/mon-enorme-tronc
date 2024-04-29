import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

export function useErrorToast() {
	return (message: string) => {
		toast({
			title: "Erreur",
			description: message,
			variant: "destructive",
		});
	};
}
