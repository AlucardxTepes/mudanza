package com.nelsonpantaleon.web.rest;

import com.nelsonpantaleon.domain.Item;
import com.nelsonpantaleon.domain.ItemPicture;
import com.nelsonpantaleon.repository.ItemPictureRepository;
import com.nelsonpantaleon.repository.ItemRepository;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
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

    private static String storageLocation = "/uploads/images/items/";

    private ItemRepository itemRepository;
    private ItemPictureRepository itemPictureRepository;

    public FileController(ItemRepository itemRepository, ItemPictureRepository itemPictureRepository) {
        this.itemRepository = itemRepository;
        this.itemPictureRepository = itemPictureRepository;
    }

    @PostMapping("/api/upload")
    public ResponseEntity<Set<String>> handleFileUpload(@RequestParam("files") List<MultipartFile> files, @RequestParam(value = "itemId") Long itemId) throws IOException {
        Set<String> storedFilepaths = storeFiles(files, itemId);

        // Create itemPictures for specified Item
        Item item = itemRepository.getOne(itemId);
        Set<ItemPicture> pictures = new HashSet<>();
        storedFilepaths.forEach(path -> pictures.add(new ItemPicture(path, item)));

        // Store picture paths
        itemPictureRepository.saveAll(pictures);

        // Return list of paths as a String
        return ResponseEntity.ok(storedFilepaths);
    }

    private Set<String> storeFiles(List<MultipartFile> requestFiles, Long itemId) throws IOException {
        Set<String> filenames = new HashSet<>();
        String fileExtension = "png";
        for (MultipartFile requestFile : requestFiles) {
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
            filenames.add(file.getName());
        }
        return filenames;
    }

    public static void deleteFiles(Long itemId) throws IOException {
        try {
            FileUtils.deleteDirectory(new File(storageLocation + itemId + "/"));
        } catch (IllegalArgumentException e) {
            LoggerFactory.getLogger(FileController.class).debug("Delete files for item ID " + itemId + " failed. Directory does not exist");
            e.printStackTrace();
        }
    }

}
