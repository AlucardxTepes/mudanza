package com.nelsonpantaleon.web.rest;

import com.nelsonpantaleon.domain.ItemPicture;
import com.nelsonpantaleon.repository.ItemPictureRepository;
import com.nelsonpantaleon.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.nelsonpantaleon.domain.ItemPicture}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemPictureResource {

    private final Logger log = LoggerFactory.getLogger(ItemPictureResource.class);

    private static final String ENTITY_NAME = "itemPicture";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemPictureRepository itemPictureRepository;

    public ItemPictureResource(ItemPictureRepository itemPictureRepository) {
        this.itemPictureRepository = itemPictureRepository;
    }

    /**
     * {@code POST  /item-pictures} : Create a new itemPicture.
     *
     * @param itemPicture the itemPicture to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemPicture, or with status {@code 400 (Bad Request)} if the itemPicture has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-pictures")
    public ResponseEntity<ItemPicture> createItemPicture(@Valid @RequestBody ItemPicture itemPicture) throws URISyntaxException {
        log.debug("REST request to save ItemPicture : {}", itemPicture);
        if (itemPicture.getId() != null) {
            throw new BadRequestAlertException("A new itemPicture cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemPicture result = itemPictureRepository.save(itemPicture);
        return ResponseEntity.created(new URI("/api/item-pictures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-pictures} : Updates an existing itemPicture.
     *
     * @param itemPicture the itemPicture to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemPicture,
     * or with status {@code 400 (Bad Request)} if the itemPicture is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemPicture couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-pictures")
    public ResponseEntity<ItemPicture> updateItemPicture(@Valid @RequestBody ItemPicture itemPicture) throws URISyntaxException {
        log.debug("REST request to update ItemPicture : {}", itemPicture);
        if (itemPicture.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemPicture result = itemPictureRepository.save(itemPicture);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, itemPicture.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-pictures} : get all the itemPictures.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemPictures in body.
     */
    @GetMapping("/item-pictures")
    public List<ItemPicture> getAllItemPictures() {
        log.debug("REST request to get all ItemPictures");
        return itemPictureRepository.findAll();
    }

    /**
     * {@code GET  /item-pictures/:id} : get the "id" itemPicture.
     *
     * @param id the id of the itemPicture to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemPicture, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-pictures/{id}")
    public ResponseEntity<ItemPicture> getItemPicture(@PathVariable Long id) {
        log.debug("REST request to get ItemPicture : {}", id);
        Optional<ItemPicture> itemPicture = itemPictureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemPicture);
    }

    /**
     * {@code DELETE  /item-pictures/:id} : delete the "id" itemPicture.
     *
     * @param id the id of the itemPicture to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-pictures/{id}")
    public ResponseEntity<Void> deleteItemPicture(@PathVariable Long id) {
        log.debug("REST request to delete ItemPicture : {}", id);
        itemPictureRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
