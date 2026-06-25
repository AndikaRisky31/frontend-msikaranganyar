import { Plugin } from "ckeditor5";
import { axiosInstanceAuth } from "../../API/axios";
import { resolveAssetUrl } from "../../utils/helper";

class CKEditorUploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.abortController = null;
  }

  upload() {
    return this.loader.file.then((file) => {
      if (!file) {
        return Promise.reject(new Error("File upload tidak ditemukan."));
      }

      const formData = new FormData();
      formData.append("upload", file);

      this.abortController = new AbortController();

      return axiosInstanceAuth
        .post("/news/upload-image", formData, {
          signal: this.abortController.signal,
        })
        .then((response) => {
          const url = response?.data?.data?.url || response?.data?.url;

          if (!url) {
            throw new Error("Response upload tidak mengembalikan URL.");
          }

          return {
            default: resolveAssetUrl(url),
          };
        });
    });
  }

  abort() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }
}

export default class CKEditorUploadAdapterPlugin extends Plugin {
  init() {
    const fileRepository = this.editor.plugins.get("FileRepository");

    fileRepository.createUploadAdapter = (loader) => {
      return new CKEditorUploadAdapter(loader);
    };
  }
}
