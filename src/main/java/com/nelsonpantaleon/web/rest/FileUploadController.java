package com.nelsonpantaleon.web.rest;

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
public class FileUploadController {
    private String storageLocation = "src/main/resources/itemImages/";

//    @GetMapping("/")
//    public String listUploadedFiles(Model model) throws IOException {
//
//        model.addAttribute("files", storageService.loadAll().map(
//            path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
//                "serveFile", path.getFileName().toString()).build().toUri().toString())
//            .collect(Collectors.toList()));
//
//        return "uploadForm";
//    }

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
