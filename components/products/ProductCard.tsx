import Image from "next/image";
import { formatCurrency, getImagePath } from "@/src/utils";
import { Product } from "@prisma/client";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<div className="bg-white w-full border h-full">
			<Image src={getImagePath(product.image)} alt={`Plate ${product.name}`} width={500} height={500} />
			<div className="p-5">
				<h3 className="text-xl font-bold">{product.name}</h3>
				<p className="mt-5 font-black text-amber-300 text-3xl">{formatCurrency(product.price)}</p>
				<AddProductButton product={product} />
			</div>
		</div>
	);
}
