"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import { getImagePath } from "@/src/utils";

export default function ImageUpload({ image }: { image: string | undefined }) {
	const [imageUrl, setImageUrl] = useState("");

	return (
		<CldUploadWidget
			uploadPreset="vevltpnj"
			options={{ maxFiles: 1 }}
			onSuccess={(result, { widget }) => {
				if (result.event === "success") {
					widget.close();
					// @ts-expect-error Check api Updates
					setImageUrl(result.info?.secure_url);
				}
			}}
		>
			{({ open }) => (
				<>
					<div className="space-y-2">
						<label htmlFor="" className="text-slate-800">
							Product Image
						</label>
					</div>
					<div
						onClick={() => open()}
						className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
					>
						<TbPhotoPlus size={50} />
						<p className="text-lg font-semibold">Add Image</p>
						{imageUrl && (
							<div className="absolute inset-0 w-full h-full">
								<Image fill style={{ objectFit: "contain" }} src={imageUrl} alt="Product Image" />
							</div>
						)}
					</div>
					{image && !imageUrl && (
						<div className="space-y-2">
							<label htmlFor="image">Current Image</label>
							<div className="relative w-64 h-64">
								<Image fill src={getImagePath(image)} style={{ objectFit: "contain" }} alt="Product Image" />
							</div>
						</div>
					)}
					<input type="hidden" name="image" defaultValue={imageUrl ? imageUrl : image} />
				</>
			)}
		</CldUploadWidget>
	);
}
