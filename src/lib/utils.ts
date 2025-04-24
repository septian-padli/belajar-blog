import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// get inisial letter from name
export function getInitials(name: string) {
	return name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase();
}

export async function retryConnect(fn, retries = 3) {
	try {
		return await fn();
	} catch (err) {
		if (retries <= 0) throw err;
		console.log("Retrying DB connection...", err);
		await new Promise((res) => setTimeout(res, 1000));
		return retryConnect(fn, retries - 1);
	}
}


// Helper untuk crop gambar
export async function getCroppedImg(imageSrc: string, croppedAreaPixels: any): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx!.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    }, "image/jpeg", 1);
  });
}

// Helper untuk kompresi gambar
export async function compressImage(blob: Blob): Promise<File> {
  const file = new File([blob], "temp-image.jpg", { type: blob.type });
  const compressedBlob = await imageCompression(file, {
    maxSizeMB: 2, // Targetkan 2MB
    maxWidthOrHeight: 1024, // Bisa ubah sesuai kebutuhan
    useWebWorker: true,
  });

  return new File([compressedBlob], "cropped-profile.jpg", { type: "image/jpeg" });
}

// Helper untuk load gambar ke dalam elemen Image
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });
}
