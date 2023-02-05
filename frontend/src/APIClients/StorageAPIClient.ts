import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { storage } from "../utils/Firebase";

const uploadImage = async (imageBlob: Blob): Promise<string> => {
  if (imageBlob == null) return "Please Try Again";

  const imageRef = ref(storage, `images/${uuidv4()}`);

  await uploadBytes(imageRef, imageBlob);
  const url = await getDownloadURL(imageRef);
  return url;
};

export default uploadImage;
