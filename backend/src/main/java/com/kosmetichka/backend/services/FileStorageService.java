package com.kosmetichka.backend.services;

import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {
    private final MinioClient client;

    @Value("${minio.bucket}")
    private String bucket;
    @Value("${minio.url}")
    private String url;
    @Value("${minio.public-url}")
    private String publicUrl;

    private static final List<String> ALLOWED_TYPES = List.of("image/jpeg", "image/png", "image/webp");
    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "";
        return filename.substring(filename.lastIndexOf('.'));
    }

    public String upload(MultipartFile file) {
        if (file.isEmpty())
            throw new BadRequestException("Файл пустой");
        if (!ALLOWED_TYPES.contains(file.getContentType()))
            throw new BadRequestException("Разрешены только изображения форматов JPEG, PNG или WEBP");

        String ext = getExtension(file.getOriginalFilename());
        String fileName = UUID.randomUUID() + ext;

        try (InputStream is = file.getInputStream()) {
            client.putObject(PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(fileName)
                            .stream(is, file.getSize(), -1)
                            .contentType(file.getContentType())
                    .build());
        } catch (Exception e) {
            throw new RuntimeException("Не удалось загрузить файл", e);
        }
        return publicUrl + "/" + bucket + "/" + fileName;
    }
    public void delete(String fileUrl) {
        if (fileUrl == null || fileUrl.isBlank())
            return;

        String fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
        try {
            client.removeObject(RemoveObjectArgs.builder()
                            .bucket(bucket)
                            .object(fileName)
                    .build());
        }
        catch (Exception _) {}
    }
}
