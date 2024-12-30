export function serializeProduct(productRecord: string[]): ProductResponse {
  const [id, name, model, description, imageSrc, category, available] =
    productRecord;
  const isAvailable = available === "TRUE";

  let image = "";
  if (imageSrc) {
    const imageId = extractDriveId(imageSrc);
    if (imageId) {
      image = generateDirectLink(imageId);
    }
  }

  return {
    id,
    name,
    model,
    description,
    image,
    category,
    isAvailable,
  };
}

function extractDriveId(url: string): string | null {
  const regex = /https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function generateDirectLink(id: string): string {
  return `https://drive.google.com/uc?id=${id}`;
}
