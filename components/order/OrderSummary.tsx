"use client";

import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-actions";
import { OrderSchema } from "@/src/schema";

export default function OrderSummary() {
	const order = useStore((state) => state.order);
	const clearOrder = useStore((state) => state.clearOrder);
	const total = useMemo(() => order.reduce((total, item) => (total += item.subtotal), 0), [order]);

	const handleCreateOrder = async (formData: FormData) => {
		const data = {
			name: formData.get("name"),
			total,
			order,
		};

		const result = OrderSchema.safeParse(data);
		if (!result.success) {
			result.error.issues.forEach((error) => {
				console.log(error);
				toast.error(error.message);
			});
			return;
		}

		const response = await createOrder(data);
		if (response?.errors) {
			response.errors.forEach((error) => {
				toast.error(error.message);
			});
			return;
		}
		toast.success("Order completed");
		clearOrder();
	};

	return (
		<aside className="lg:w-96 md:w-64 lg:overflow-y-scroll lg:h-screen bg-slate-100 p-5">
			<h1 className="text-center text-4xl font-black">My Order{order.length > 0 ? `: ${formatCurrency(total)}` : ""}</h1>
			{order.length === 0 ? (
				<p className="text-center my-10">Your order is empty</p>
			) : (
				<>
					<div className="mt-5">
						{order.map((item) => (
							<ProductDetails item={item} key={item.id} />
						))}
					</div>
					<form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
						<input type="text" name="name" placeholder="Client name" className="w-full border border-slate-300 p-2" />
						<input
							type="submit"
							className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
							value="Confirm order"
						/>
					</form>
				</>
			)}
		</aside>
	);
}
