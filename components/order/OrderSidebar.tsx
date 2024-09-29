import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";

const getCategories = async () => {
	return await prisma.category.findMany();
};

export default async function OrderSidebar() {
	const categories = await getCategories();
	return (
		<aside className="w-72 h-screen bg-white">
			<Logo />
			<nav className="mt-10">
				{categories.map((category) => (
					<CategoryIcon key={category.id} category={category} />
				))}
			</nav>
		</aside>
	);
}
