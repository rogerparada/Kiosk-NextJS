import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import React from "react";

export default function NewProductPage() {
	return (
		<>
			<Heading>Add a new product</Heading>
			<AddProductForm>
				<ProductForm />
			</AddProductForm>
		</>
	);
}
