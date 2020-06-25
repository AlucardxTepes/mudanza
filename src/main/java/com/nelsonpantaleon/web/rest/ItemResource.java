package com.nelsonpantaleon.web.rest;

import com.nelsonpantaleon.domain.Item;
import com.nelsonpantaleon.domain.ItemPicture;
import com.nelsonpantaleon.repository.ItemBuyerRepository;
import com.nelsonpantaleon.repository.ItemPictureRepository;
import com.nelsonpantaleon.repository.ItemRepository;
import com.nelsonpantaleon.service.dto.ItemWithPicturesDTO;
import com.nelsonpantaleon.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing {@link com.nelsonpantaleon.domain.Item}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemResource {

    private final Logger log = LoggerFactory.getLogger(ItemResource.class);

    private static final String ENTITY_NAME = "item";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemRepository itemRepository;

    private final ItemPictureRepository itemPictureRepository;

    private final ItemBuyerRepository itemBuyerRepository;

    public ItemResource(ItemRepository itemRepository, ItemPictureRepository itemPictureRepository,
                        ItemBuyerRepository itemBuyerRepository) {
        this.itemRepository = itemRepository;
        this.itemPictureRepository = itemPictureRepository;
        this.itemBuyerRepository = itemBuyerRepository;
    }

    /**
     * {@code POST  /items} : Create a new item.
     *
     * @param item the item to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new item, or with status {@code 400 (Bad Request)} if the item has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/items")
    public ResponseEntity<Item> createItem(@RequestBody Item item) throws URISyntaxException {
        log.debug("REST request to save Item : {}", item);
        if (item.getId() != null) {
            throw new BadRequestAlertException("A new item cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Item result = itemRepository.save(item);
        return ResponseEntity.created(new URI("/api/items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /items} : Updates an existing item.
     *
     * @param item the item to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated item,
     * or with status {@code 400 (Bad Request)} if the item is not valid,
     * or with status {@code 500 (Internal Server Error)} if the item couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/items")
    public ResponseEntity<Item> updateItem(@RequestBody Item item) throws URISyntaxException {
        log.debug("REST request to update Item : {}", item);
        if (item.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Item result = itemRepository.save(item);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, item.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /items} : get all the items.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of items in body.
     */
    @GetMapping("/items")
    public ResponseEntity<List<ItemWithPicturesDTO>> getAllItems(Pageable pageable) {
        log.debug("REST request to get a page of Items");
        List<ItemWithPicturesDTO> items = itemRepository.findAll(pageable).stream().map(item -> {
            ItemWithPicturesDTO result = new ItemWithPicturesDTO();
            result.setItem(item);
            result.setPictures(itemPictureRepository.findAllByItemId(item.getId()).stream().map(itemPicture -> itemPicture.getFilename()).collect(Collectors.toSet()));
            return result;
        }).collect(Collectors.toList());
        Page<ItemWithPicturesDTO> page = new PageImpl<>(items, pageable, items.size());

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /items/:id} : get the "id" item.
     *
     * @param id the id of the item to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the item, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        log.debug("REST request to get Item : {}", id);
        Optional<Item> item = itemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(item);
    }

    /**
     * {@code GET  /items/:id} : get the "id" item with its list of picture paths.
     *
     * @param id the id of the item to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the wrapper containing the item and picture filename list
     * or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/itemWithPictures/{id}")
    public ResponseEntity<ItemWithPicturesDTO> getItemWithPictures(@PathVariable Long id) {
        log.debug("REST request to get Item with Pictures : {}", id);
        Optional<Item> item = itemRepository.findById(id);
        if (item.isPresent()) {
            ItemWithPicturesDTO result = new ItemWithPicturesDTO();
            result.setItem(item.get());
            result.setPictures(itemPictureRepository.findAllByItemId(id)
                .stream()
                .map(ItemPicture::getFilename)
                .collect(Collectors.toSet())
            );
            result.getItem().buyerList(new HashSet<>(itemBuyerRepository.findAllByItemId(result.getItem().getId())));
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * {@code DELETE  /items/:id} : delete the "id" item.
     *
     * @param id the id of the item to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) throws IOException {
        log.debug("REST request to delete Item : {}", id);
        itemRepository.deleteById(id);
        itemPictureRepository.deleteAllByItemId(id);
        // delete image files from hard drive
        FileController.deleteFiles(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
