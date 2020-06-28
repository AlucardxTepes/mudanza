package com.nelsonpantaleon.web.rest;

import com.nelsonpantaleon.domain.ItemBuyer;
import com.nelsonpantaleon.repository.ItemBuyerRepository;
import com.nelsonpantaleon.security.SecurityUtils;
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
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.nelsonpantaleon.domain.ItemBuyer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemBuyerResource {

    private final Logger log = LoggerFactory.getLogger(ItemBuyerResource.class);

    private static final String ENTITY_NAME = "itemBuyer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemBuyerRepository itemBuyerRepository;

    public ItemBuyerResource(ItemBuyerRepository itemBuyerRepository) {
        this.itemBuyerRepository = itemBuyerRepository;
    }

    /**
     * {@code POST  /item-buyers} : Create a new itemBuyer.
     *
     * @param itemBuyer the itemBuyer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemBuyer, or with status {@code 400 (Bad Request)} if the itemBuyer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-buyers")
    public ResponseEntity<ItemBuyer> createItemBuyer(@Valid @RequestBody ItemBuyer itemBuyer) throws URISyntaxException {
        log.debug("REST request to save ItemBuyer : {}", itemBuyer);
        if (itemBuyer.getId() != null) {
            throw new BadRequestAlertException("A new itemBuyer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (!SecurityUtils.isAuthenticated()) {
            itemBuyer.setPaid(false); // prevent unauth user from setting field
        }
        itemBuyer.setTimestamp(Timestamp.valueOf(LocalDateTime.now(ZoneId.of("UTC"))));
        ItemBuyer result = itemBuyerRepository.save(itemBuyer);
        return ResponseEntity.created(new URI("/api/item-buyers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-buyers} : Updates an existing itemBuyer.
     *
     * @param itemBuyer the itemBuyer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemBuyer,
     * or with status {@code 400 (Bad Request)} if the itemBuyer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemBuyer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-buyers")
    public ResponseEntity<ItemBuyer> updateItemBuyer(@Valid @RequestBody ItemBuyer itemBuyer) throws URISyntaxException {
        log.debug("REST request to update ItemBuyer : {}", itemBuyer);
        if (itemBuyer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        itemBuyer.setTimestamp(itemBuyerRepository.getOne(itemBuyer.getId()).getTimestamp()); // preserve creation timestamp
        if (!SecurityUtils.isAuthenticated()) {
            itemBuyer.setPaid(itemBuyerRepository.getOne(itemBuyer.getId()).isPaid()); // prevent unauth user from changing field
        }
        ItemBuyer result = itemBuyerRepository.save(itemBuyer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, itemBuyer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-buyers} : get all the itemBuyers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemBuyers in body.
     */
    @GetMapping("/item-buyers")
    public List<ItemBuyer> getAllItemBuyers() {
        log.debug("REST request to get all ItemBuyers");
        return itemBuyerRepository.findAll();
    }

    /**
     * {@code GET  /items/:itemId/item-buyers} : get all the itemBuyers for a given item.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemBuyers in body.
     */
    @GetMapping("/items/{itemId}/item-buyers")
    public List<ItemBuyer> getItemBuyersByItemId(@PathVariable Long itemId) {
        log.debug("REST request to get all ItemBuyers for ItemId: " + itemId);
        return itemBuyerRepository.findAllByItemId(itemId);
    }

    /**
     * {@code GET  /item-buyers/:id} : get the "id" itemBuyer.
     *
     * @param id the id of the itemBuyer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemBuyer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-buyers/{id}")
    public ResponseEntity<ItemBuyer> getItemBuyer(@PathVariable Long id) {
        log.debug("REST request to get ItemBuyer : {}", id);
        Optional<ItemBuyer> itemBuyer = itemBuyerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemBuyer);
    }

    /**
     * {@code DELETE  /item-buyers/:id} : delete the "id" itemBuyer.
     *
     * @param id the id of the itemBuyer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-buyers/{id}")
    public ResponseEntity<Void> deleteItemBuyer(@PathVariable Long id) {
        log.debug("REST request to delete ItemBuyer : {}", id);
        itemBuyerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
