export const formatCurrency = (value: number) => {
	return Intl.NumberFormat("Es-es", { style: "currency", currency: "EUR" }).format(value);
};

export function getImagePath(imagePath: string) {
	const cloudinaryBaseUrl = "https://res.cloudinary.com";
	if (imagePath.startsWith(cloudinaryBaseUrl)) {
		return imagePath;
	} else {
		return `/products/${imagePath}.jpg`;
	}
}
