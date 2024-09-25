import { del, put } from "@vercel/blob";

export const uploadFile = async (file: File, name: string) => {
  return await put(name, file, { access: "public", contentType: file.type });
};

export const deleteFile = async (key: string | string[]) => {
  return await del(key);
};
