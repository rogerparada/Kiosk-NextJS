import Link from "next/link";
import React from "react";

type PaginationProps = {
	page: number;
	totalPages: number;
	route: string;
};

export default function Pagination({ page, totalPages, route }: PaginationProps) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<nav className="flex justify-center py-10">
			{page > 1 && (
				<Link
					className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
					href={`${route}page=${page - 1}`}
				>
					&laquo;
				</Link>
			)}
			{pages.map((pageNum) => (
				<Link
					key={pageNum}
					className={`${
						page === pageNum ? "bg-amber-400 text-white font-black" : "bg-white text-gray-900"
					} px-4 py-2 text-sm  ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
					href={`${route}page=${pageNum}`}
				>
					{pageNum}
				</Link>
			))}

			{page < totalPages && (
				<Link
					className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
					href={`${route}page=${page + 1}`}
				>
					&raquo;
				</Link>
			)}
		</nav>
	);
}
