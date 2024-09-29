import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productsCount() {
	return await prisma.product.count();
}

async function getProducts(skip: number, pageSize: number) {
	return await prisma.product.findMany({
		take: pageSize,
		skip,
		include: {
			category: true,
		},
	});
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function page({ searchParams }: { searchParams: { page: string } }) {
	const page = +searchParams.page || 1;
	const pageSize = 10;
	const skip = (page - 1) * 10;

	if (page < 0) redirect("/admin/products");

	const totalProductsData = productsCount();
	const productsData = getProducts(skip, pageSize);
	const [products, totalProducts] = await Promise.all([productsData, totalProductsData]);
	const totalPages = Math.ceil(totalProducts / pageSize);

	if (page > totalPages) redirect("/admin/products");

	return (
		<>
			<Heading>Manage Products</Heading>
			<div className="flex flex-col lg:flex-row lg:justify-between gap-5">
				<Link href="/admin/products/new" className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">
					New Product
				</Link>
				<ProductSearchForm />
			</div>
			<ProductTable products={products} />
			<Pagination page={page} totalPages={totalPages} route="/admin/products?" />
		</>
	);
}
