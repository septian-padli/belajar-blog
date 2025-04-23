// components/ImageCropperModal.tsx
"use client";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { compressImage, getCroppedImg } from "@/lib/utils";

interface ImageCropperModalProps {
    open: boolean;
    imageSrc: string;
    aspectRatio: number;
    onClose: () => void;
    onCropDone: (file: File) => void;
}

const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
    open,
    imageSrc,
    aspectRatio,
    onClose,
    onCropDone,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const handleCropComplete = (_: any, croppedPixels: any) => {
        setCroppedAreaPixels(croppedPixels);
    };

    const handleSave = async () => {
        const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
        const compressed = await compressImage(blob);
        onCropDone(compressed);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>Crop Image</DialogTitle>
                <div className="relative w-full h-96">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={handleCropComplete}
                    />
                </div>
                <DialogFooter>
                    <Button onClick={onClose} variant="outline">Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ImageCropperModal;
