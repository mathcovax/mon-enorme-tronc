import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

export function useDefaultToast() {
	return (message: string) => {
		toast({
			title: "Info",
			description: message,
			variant: "default",
		});
	};
}
