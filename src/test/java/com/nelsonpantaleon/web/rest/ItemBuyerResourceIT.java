package com.nelsonpantaleon.web.rest;

import com.nelsonpantaleon.MudanzaApp;
import com.nelsonpantaleon.domain.ItemBuyer;
import com.nelsonpantaleon.repository.ItemBuyerRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.nelsonpantaleon.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ItemBuyerResource} REST controller.
 */
@SpringBootTest(classes = MudanzaApp.class)
public class ItemBuyerResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_PAID = false;
    private static final Boolean UPDATED_PAID = true;

    @Autowired
    private ItemBuyerRepository itemBuyerRepository;

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

    private MockMvc restItemBuyerMockMvc;

    private ItemBuyer itemBuyer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemBuyerResource itemBuyerResource = new ItemBuyerResource(itemBuyerRepository);
        this.restItemBuyerMockMvc = MockMvcBuilders.standaloneSetup(itemBuyerResource)
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
    public static ItemBuyer createEntity(EntityManager em) {
        ItemBuyer itemBuyer = new ItemBuyer()
            .name(DEFAULT_NAME)
            .phone(DEFAULT_PHONE)
            .email(DEFAULT_EMAIL)
            .quantity(DEFAULT_QUANTITY)
            .timestamp(DEFAULT_TIMESTAMP)
            .paid(DEFAULT_PAID);
        return itemBuyer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemBuyer createUpdatedEntity(EntityManager em) {
        ItemBuyer itemBuyer = new ItemBuyer()
            .name(UPDATED_NAME)
            .phone(UPDATED_PHONE)
            .email(UPDATED_EMAIL)
            .quantity(UPDATED_QUANTITY)
            .timestamp(UPDATED_TIMESTAMP)
            .paid(UPDATED_PAID);
        return itemBuyer;
    }

    @BeforeEach
    public void initTest() {
        itemBuyer = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemBuyer() throws Exception {
        int databaseSizeBeforeCreate = itemBuyerRepository.findAll().size();

        // Create the ItemBuyer
        restItemBuyerMockMvc.perform(post("/api/item-buyers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemBuyer)))
            .andExpect(status().isCreated());

        // Validate the ItemBuyer in the database
        List<ItemBuyer> itemBuyerList = itemBuyerRepository.findAll();
        assertThat(itemBuyerList).hasSize(databaseSizeBeforeCreate + 1);
        ItemBuyer testItemBuyer = itemBuyerList.get(itemBuyerList.size() - 1);
        assertThat(testItemBuyer.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testItemBuyer.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testItemBuyer.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testItemBuyer.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testItemBuyer.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
        assertThat(testItemBuyer.isPaid()).isEqualTo(DEFAULT_PAID);
    }

    @Test
    @Transactional
    public void createItemBuyerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemBuyerRepository.findAll().size();

        // Create the ItemBuyer with an existing ID
        itemBuyer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemBuyerMockMvc.perform(post("/api/item-buyers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemBuyer)))
            .andExpect(status().isBadRequest());

        // Validate the ItemBuyer in the database
        List<ItemBuyer> itemBuyerList = itemBuyerRepository.findAll();
        assertThat(itemBuyerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemBuyerRepository.findAll().size();
        // set the field null
        itemBuyer.setName(null);

        // Create the ItemBuyer, which fails.

        restItemBuyerMockMvc.perform(post("/api/item-buyers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemBuyer)))
            .andExpect(status().isBadRequest());

        List<ItemBuyer> itemBuyerList = itemBuyerRepository.findAll();
        assertThat(itemBuyerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemBuyerRepository.findAll().size();
        // set the field null
        itemBuyer.setPhone(null);

        // Create the ItemBuyer, which fails.

        restItemBuyerMockMvc.perform(post("/api/item-buyers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemBuyer)))
            .andExpect(status().isBadRequest());

        List<ItemBuyer> itemBuyerList = itemBuyerRepository.findAll();
        assertThat(itemBuyerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemBuyerRepository.findAll().size();
        // set the field null
        itemBuyer.setQuantity(null);

        // Create the ItemBuyer, which fails.

        restItemBuyerMockMvc.perform(post("/api/item-buyers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemBuyer)))
            .andExpect(status().isBadRequest());

        List<ItemBuyer> itemBuyerList = itemBuyerRepository.findAll();
        assertThat(itemBuyerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItemBuyers() throws Exception {
        // Initialize the database
        itemBuyerRepository.saveAndFlush(itemBuyer);

        // Get all the itemBuyerList
        restItemBuyerMockMvc.perform(get("/api/item-buyers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemBuyer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())))
            .andExpect(jsonPath("$.[*].paid").value(hasItem(DEFAULT_PAID.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getItemBuyer() throws Exception {
        // Initialize the database
        itemBuyerRepository.saveAndFlush(itemBuyer);

        // Get the itemBuyer
        restItemBuyerMockMvc.perform(get("/api/item-buyers/{id}", itemBuyer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemBuyer.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()))
            .andExpect(jsonPath("$.paid").value(DEFAULT_PAID.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingItemBuyer() throws Exception {
        // Get the itemBuyer
        restItemBuyerMockMvc.perform(get("/api/item-buyers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemBuyer() throws Exception {
        // Initialize the database
        itemBuyerRepository.saveAndFlush(itemBuyer);

        int databaseSizeBeforeUpdate = itemBuyerRepository.findAll().size();

        // Update the itemBuyer
        ItemBuyer updatedItemBuyer = itemBuyerRepository.findById(itemBuyer.getId()).get();
        // Disconnect from session so that the updates on updatedItemBuyer are not directly saved in db
        em.detach(updatedItemBuyer);
        updatedItemBuyer
            .name(UPDATED_NAME)
            .phone(UPDATED_PHONE)
            .email(UPDATED_EMAIL)
            .quantity(UPDATED_QUANTITY)
            .timestamp(UPDATED_TIMESTAMP)
            .paid(UPDATED_PAID);

        restItemBuyerMockMvc.perform(put("/api/item-buyers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemBuyer)))
            .andExpect(status().isOk());

        // Validate the ItemBuyer in the database
        List<ItemBuyer> itemBuyerList = itemBuyerRepository.findAll();
        assertThat(itemBuyerList).hasSize(databaseSizeBeforeUpdate);
        ItemBuyer testItemBuyer = itemBuyerList.get(itemBuyerList.size() - 1);
        assertThat(testItemBuyer.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testItemBuyer.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testItemBuyer.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testItemBuyer.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testItemBuyer.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
        assertThat(testItemBuyer.isPaid()).isEqualTo(UPDATED_PAID);
    }

    @Test
    @Transactional
    public void updateNonExistingItemBuyer() throws Exception {
        int databaseSizeBeforeUpdate = itemBuyerRepository.findAll().size();

        // Create the ItemBuyer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemBuyerMockMvc.perform(put("/api/item-buyers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemBuyer)))
            .andExpect(status().isBadRequest());

        // Validate the ItemBuyer in the database
        List<ItemBuyer> itemBuyerList = itemBuyerRepository.findAll();
        assertThat(itemBuyerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemBuyer() throws Exception {
        // Initialize the database
        itemBuyerRepository.saveAndFlush(itemBuyer);

        int databaseSizeBeforeDelete = itemBuyerRepository.findAll().size();

        // Delete the itemBuyer
        restItemBuyerMockMvc.perform(delete("/api/item-buyers/{id}", itemBuyer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemBuyer> itemBuyerList = itemBuyerRepository.findAll();
        assertThat(itemBuyerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
