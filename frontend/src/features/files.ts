import { IFileRepo } from "@/domain";
import { useMutation } from "@tanstack/react-query";

export const useUploadFile = (repo: IFileRepo) => {
    const upload = useMutation({
        mutationFn: (file: File) => repo.upload(file)
    });

    return upload;
}