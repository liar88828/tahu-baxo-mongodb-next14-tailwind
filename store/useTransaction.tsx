import { UseCheckout, useCheckout } from "@/store/useCheckout";
import { useReceiver, UseReceiver } from "@/store/useReceiver";

interface CombineStore extends UseReceiver, UseCheckout {
}

export const useBoundStore = () => ({
	Checkout: useCheckout(),
	receiver: useReceiver()
})

