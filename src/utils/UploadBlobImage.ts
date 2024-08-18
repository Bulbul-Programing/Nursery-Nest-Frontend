import axios from "axios";

const imageHostingKey = import.meta.env.VITE_HOSTING_KEY;
const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

export const uploadMultipleImages = async (
  blobUrls: string[]
): Promise<string[]> => {
  //store upload image link
  const imageLinks: string[] = [];

  for (const blobUrl of blobUrls) {
    try {
      const blob: Blob = await fetch(blobUrl).then((res) => res.blob());
      const file: File = new File([blob], "image.png", { type: blob.type });

      const formData = new FormData();
      formData.append("image", file);

      // hosting image in immbb
      const response = await axios.post(imageHosting, formData);
      const data = await response.data.data.url;
      imageLinks.push(data)
    } catch (error) {
        console.error(`Error uploading image from ${blobUrl}:`, error);
    }
  }
  return imageLinks;
};
