"use client";

import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductButtonProps = {
	product: Product;
};

export default function AddProductButton({ product }: AddProductButtonProps) {
	const addToOrder = useStore((state) => state.addToOrder);

	return (
		<button type="button" className="w-full uppercase text-white bg-blue-400 font-black p-3 text-xl mt-5" onClick={() => addToOrder(product)}>
			Add
		</button>
	);
}
