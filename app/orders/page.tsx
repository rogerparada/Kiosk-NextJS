"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import React from "react";
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "@/components/order/LatestOrderItem";

export default function OrdersPage() {
	const url = "/orders/api";
	const fetcher = () =>
		fetch(url)
			.then((response) => response.json())
			.then((data) => data);

	const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
		refreshInterval: 60000,
		revalidateOnFocus: false,
	});

	if (isLoading) return "Loading...";

	if (data)
		return (
			<>
				<h1 className="text-6xl font-bold text-center mt-20">Orders Ready</h1>
				<Logo />

				{data.length ? (
					<div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
						{data.map((order) => (
							<LatestOrderItem key={order.id} order={order} />
						))}
					</div>
				) : (
					<p className="text-center mt-20 text-xl">There are not orders ready</p>
				)}
			</>
		);
}
