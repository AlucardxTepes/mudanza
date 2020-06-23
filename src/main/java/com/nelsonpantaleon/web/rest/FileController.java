package com.nelsonpantaleon.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
public class FileController {
    private final Logger log = LoggerFactory.getLogger(FileController.class);

    private String storageLocation = "/uploads/images/items/";

    @PostMapping("/api/upload")
    public String handleFileUpload(@RequestParam("files") List<MultipartFile> files, @RequestParam(value = "itemId") Long itemId) throws IOException {
        return storeFiles(files, itemId).toString();
    }

    private Set storeFiles(List<MultipartFile> requestFiles, Long itemId) throws IOException {
        Set storedFilePaths = new HashSet<String>();
        String fileExtension = "png";
        for(MultipartFile requestFile : requestFiles) {
            String fileName = UUID.nameUUIDFromBytes(requestFile.getBytes()).toString();
            byte[] buf = new byte[1024];
            File file = new File(storageLocation + itemId + "/" + fileName + "." + fileExtension);
            file.getParentFile().mkdirs();
            try (InputStream inputStream = requestFile.getInputStream();
                 FileOutputStream fileOutputStream = new FileOutputStream(file)) {
                int numRead = 0;
                while ((numRead = inputStream.read(buf)) >= 0) {
                    fileOutputStream.write(buf, 0, numRead);
                }
            }
            storedFilePaths.add(file.getPath());
        }
        return storedFilePaths;
    }

}
