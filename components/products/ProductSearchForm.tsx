"use client";
import { SearchSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function ProductSearchForm() {
	const router = useRouter();

	const handleSearchForm = (formData: FormData) => {
		const data = {
			search: formData.get("search"),
		};

		const result = SearchSchema.safeParse(data);
		if (!result.success) {
			result.error.issues.forEach((issue) => toast.error(issue.message));
			return;
		}
		router.push(`/admin/products/search?search=${result.data.search}`);
	};

	return (
		<form action={handleSearchForm} className="flex items-center">
			<input type="text" placeholder="Search product" className="p-2 placeholder-gray-400 w-full h-12" name="search" />
			<input type="submit" value="Search" className="bg-blue-400 hover:bg-blue-500 uppercase text-white cursor-pointer p-3 text-sm font-black h-12" />
		</form>
	);
}
