import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

async function productsCount(searchParam: string) {
	return await prisma.product.count({
		where: {
			name: {
				contains: searchParam,
				mode: "insensitive",
			},
		},
	});
}

async function searchProducts(search: string, skip: number, pageSize: number) {
	return await prisma.product.findMany({
		take: pageSize,
		skip,
		where: {
			name: {
				contains: search,
				mode: "insensitive",
			},
		},
		include: {
			category: true,
		},
	});
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string; page: string } }) {
	const search = searchParams.search;
	const page = +searchParams.page || 1;
	const pageSize = 10;
	const skip = (page - 1) * 10;

	if (page < 0) redirect("/admin/products");
	const totalProductsData = productsCount(search);
	const productsData = searchProducts(search, skip, pageSize);
	const [products, totalProducts] = await Promise.all([productsData, totalProductsData]);
	const totalPages = Math.ceil(totalProducts / pageSize);

	if (page > totalPages) redirect(`/admin/products/search/?search=${search}`);

	return (
		<>
			<Heading>Search results: {search}</Heading>
			<div className="flex flex-col lg:flex-row lg:justify-end gap-5">
				<ProductSearchForm />
			</div>
			{products.length ? <ProductTable products={products} /> : <p className="text-center">There are not results.</p>}
			<Pagination page={page} totalPages={totalPages} route={`/admin/products/search/?search=${search}&`} />
		</>
	);
}
