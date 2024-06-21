import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

export const listFiles = async () => {
  const storage = getStorage();
  const listRef = ref(storage, "images");

  try {
    const listResponse = await listAll(listRef);
    const files = await Promise.all(
      listResponse.items.map(async (item) => {
        const downloadURL = await getDownloadURL(item);
        return { name: downloadURL };
      })
    );

    return files;
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
};
