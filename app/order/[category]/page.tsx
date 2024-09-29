import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

const getProducts = async (category: string) => {
	return await prisma.product.findMany({ where: { category: { slug: category } } });
};

export default async function OrderPage({ params }: { params: { category: string } }) {
	const products = await getProducts(params.category);

	return (
		<>
			<Heading>Choose and customize your order:</Heading>
			<div className="grid grid-cols-1 lg:grid-col-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4 items-start">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>
	);
}
