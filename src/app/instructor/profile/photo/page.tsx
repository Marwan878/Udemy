"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, User } from "lucide-react";
import { Button } from "@/components/general";
import Image from "next/image";
import { fetchUser, updateUserImagePath } from "@/actions/user";
import supabase, { SUPABASE_URL } from "@/lib/supabase";
import { fileFromImageUrl } from "@/lib/utils";
import toast from "react-hot-toast";

export default function Page() {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file);
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!selectedImage) return;
    setIsUploading(true);

    try {
      const imageId = crypto.randomUUID();
      const { error } = await supabase.storage
        .from("images")
        .upload(imageId, selectedImage);

      if (error) {
        throw new Error(error.message);
      }

      const newImagePath = `${SUPABASE_URL}/storage/v1/object/public/images//${imageId}`;
      await updateUserImagePath(newImagePath);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const fetchUserImageFile = async () => {
      const { imageUrl } = await fetchUser();
      if (!imageUrl) return;
      const file = await fileFromImageUrl(imageUrl, "My Avatar");
      setSelectedImage(file);
    };
    fetchUserImageFile();
  }, []);

  return (
    <div className="max-w-5xl min-h-screen w-full">
      <div className="mb-2">
        <h2 className="heading-sm">Image preview</h2>
      </div>

      <div className="border border-gray-300 rounded p-1 mb-4">
        <div className="bg-gray-50 h-48 relative flex items-center justify-center">
          {selectedImage ? (
            <Image
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : "https://img-c.udemycdn.com/user/200_H/anonymous_3.png"
              }
              alt="Your personal avatar."
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-2 border-gray-500 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500" />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 border border-gray-300 rounded p-3 text-gray-700">
          {selectedImage?.name || "No file selected"}
        </div>
        <Button variant="secondary" onClick={handleSelectClick}>
          Select image
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <Button
        className={`${isUploading ? "opacity-50" : ""}`}
        height="md"
        onClick={handleSave}
        disabled={isUploading}
        aria-label={isUploading ? "Uploading..." : "Save"}
      >
        {isUploading ? (
          <Loader2 className="animate-spin" aria-hidden />
        ) : (
          "Save"
        )}
      </Button>
    </div>
  );
}
