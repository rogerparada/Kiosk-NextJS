"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type AdminRouteProps = {
	link: {
		url: string;
		text: string;
		blank: boolean;
	};
};

export default function AdminRoute({ link }: AdminRouteProps) {
	const pathName = usePathname();
	const isActive = pathName.startsWith(link.url);

	return (
		<Link
			href={link.url}
			className={`${isActive ? "bg-amber-400" : ""} font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
			target={link.blank ? "_blank" : ""}
		>
			{link.text}
		</Link>
	);
}
