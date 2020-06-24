package com.nelsonpantaleon.web.rest;

import com.nelsonpantaleon.MudanzaApp;
import com.nelsonpantaleon.domain.ItemPicture;
import com.nelsonpantaleon.domain.Item;
import com.nelsonpantaleon.repository.ItemPictureRepository;
import com.nelsonpantaleon.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.nelsonpantaleon.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ItemPictureResource} REST controller.
 */
@SpringBootTest(classes = MudanzaApp.class)
public class ItemPictureResourceIT {

    private static final String DEFAULT_FILENAME = "AAAAAAAAAA";
    private static final String UPDATED_FILENAME = "BBBBBBBBBB";

    @Autowired
    private ItemPictureRepository itemPictureRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restItemPictureMockMvc;

    private ItemPicture itemPicture;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemPictureResource itemPictureResource = new ItemPictureResource(itemPictureRepository);
        this.restItemPictureMockMvc = MockMvcBuilders.standaloneSetup(itemPictureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPicture createEntity(EntityManager em) {
        ItemPicture itemPicture = new ItemPicture()
            .filename(DEFAULT_FILENAME);
        // Add required entity
        Item item;
        if (TestUtil.findAll(em, Item.class).isEmpty()) {
            item = ItemResourceIT.createEntity(em);
            em.persist(item);
            em.flush();
        } else {
            item = TestUtil.findAll(em, Item.class).get(0);
        }
        itemPicture.setItem(item);
        return itemPicture;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPicture createUpdatedEntity(EntityManager em) {
        ItemPicture itemPicture = new ItemPicture()
            .filename(UPDATED_FILENAME);
        // Add required entity
        Item item;
        if (TestUtil.findAll(em, Item.class).isEmpty()) {
            item = ItemResourceIT.createUpdatedEntity(em);
            em.persist(item);
            em.flush();
        } else {
            item = TestUtil.findAll(em, Item.class).get(0);
        }
        itemPicture.setItem(item);
        return itemPicture;
    }

    @BeforeEach
    public void initTest() {
        itemPicture = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemPicture() throws Exception {
        int databaseSizeBeforeCreate = itemPictureRepository.findAll().size();

        // Create the ItemPicture
        restItemPictureMockMvc.perform(post("/api/item-pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemPicture)))
            .andExpect(status().isCreated());

        // Validate the ItemPicture in the database
        List<ItemPicture> itemPictureList = itemPictureRepository.findAll();
        assertThat(itemPictureList).hasSize(databaseSizeBeforeCreate + 1);
        ItemPicture testItemPicture = itemPictureList.get(itemPictureList.size() - 1);
        assertThat(testItemPicture.getFilename()).isEqualTo(DEFAULT_FILENAME);
    }

    @Test
    @Transactional
    public void createItemPictureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemPictureRepository.findAll().size();

        // Create the ItemPicture with an existing ID
        itemPicture.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemPictureMockMvc.perform(post("/api/item-pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemPicture)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPicture in the database
        List<ItemPicture> itemPictureList = itemPictureRepository.findAll();
        assertThat(itemPictureList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFilenameIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemPictureRepository.findAll().size();
        // set the field null
        itemPicture.setFilename(null);

        // Create the ItemPicture, which fails.

        restItemPictureMockMvc.perform(post("/api/item-pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemPicture)))
            .andExpect(status().isBadRequest());

        List<ItemPicture> itemPictureList = itemPictureRepository.findAll();
        assertThat(itemPictureList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItemPictures() throws Exception {
        // Initialize the database
        itemPictureRepository.saveAndFlush(itemPicture);

        // Get all the itemPictureList
        restItemPictureMockMvc.perform(get("/api/item-pictures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemPicture.getId().intValue())))
            .andExpect(jsonPath("$.[*].filename").value(hasItem(DEFAULT_FILENAME)));
    }
    
    @Test
    @Transactional
    public void getItemPicture() throws Exception {
        // Initialize the database
        itemPictureRepository.saveAndFlush(itemPicture);

        // Get the itemPicture
        restItemPictureMockMvc.perform(get("/api/item-pictures/{id}", itemPicture.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemPicture.getId().intValue()))
            .andExpect(jsonPath("$.filename").value(DEFAULT_FILENAME));
    }

    @Test
    @Transactional
    public void getNonExistingItemPicture() throws Exception {
        // Get the itemPicture
        restItemPictureMockMvc.perform(get("/api/item-pictures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemPicture() throws Exception {
        // Initialize the database
        itemPictureRepository.saveAndFlush(itemPicture);

        int databaseSizeBeforeUpdate = itemPictureRepository.findAll().size();

        // Update the itemPicture
        ItemPicture updatedItemPicture = itemPictureRepository.findById(itemPicture.getId()).get();
        // Disconnect from session so that the updates on updatedItemPicture are not directly saved in db
        em.detach(updatedItemPicture);
        updatedItemPicture
            .filename(UPDATED_FILENAME);

        restItemPictureMockMvc.perform(put("/api/item-pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemPicture)))
            .andExpect(status().isOk());

        // Validate the ItemPicture in the database
        List<ItemPicture> itemPictureList = itemPictureRepository.findAll();
        assertThat(itemPictureList).hasSize(databaseSizeBeforeUpdate);
        ItemPicture testItemPicture = itemPictureList.get(itemPictureList.size() - 1);
        assertThat(testItemPicture.getFilename()).isEqualTo(UPDATED_FILENAME);
    }

    @Test
    @Transactional
    public void updateNonExistingItemPicture() throws Exception {
        int databaseSizeBeforeUpdate = itemPictureRepository.findAll().size();

        // Create the ItemPicture

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPictureMockMvc.perform(put("/api/item-pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemPicture)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPicture in the database
        List<ItemPicture> itemPictureList = itemPictureRepository.findAll();
        assertThat(itemPictureList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemPicture() throws Exception {
        // Initialize the database
        itemPictureRepository.saveAndFlush(itemPicture);

        int databaseSizeBeforeDelete = itemPictureRepository.findAll().size();

        // Delete the itemPicture
        restItemPictureMockMvc.perform(delete("/api/item-pictures/{id}", itemPicture.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemPicture> itemPictureList = itemPictureRepository.findAll();
        assertThat(itemPictureList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
