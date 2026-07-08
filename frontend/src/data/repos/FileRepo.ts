import { IFileRepo } from "@/domain/repos/IFileRepo";
import { api } from "../api/axiosInstance";

export class FileRepo implements IFileRepo {
    async upload(file: File): Promise<string> {
        const data = new FormData();
        data.append("file", file);
        const res = await api.post<{url: string}>("/files", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res.data.url;
    }
}