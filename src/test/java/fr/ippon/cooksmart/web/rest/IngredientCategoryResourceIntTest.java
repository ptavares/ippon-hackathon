package fr.ippon.cooksmart.web.rest;

import fr.ippon.cooksmart.CookSmartApp;

import fr.ippon.cooksmart.domain.IngredientCategory;
import fr.ippon.cooksmart.repository.IngredientCategoryRepository;
import fr.ippon.cooksmart.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IngredientCategoryResource REST controller.
 *
 * @see IngredientCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CookSmartApp.class)
public class IngredientCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private IngredientCategoryRepository ingredientCategoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIngredientCategoryMockMvc;

    private IngredientCategory ingredientCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
            IngredientCategoryResource ingredientCategoryResource = new IngredientCategoryResource(ingredientCategoryRepository);
        this.restIngredientCategoryMockMvc = MockMvcBuilders.standaloneSetup(ingredientCategoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IngredientCategory createEntity(EntityManager em) {
        IngredientCategory ingredientCategory = new IngredientCategory()
                .name(DEFAULT_NAME);
        return ingredientCategory;
    }

    @Before
    public void initTest() {
        ingredientCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createIngredientCategory() throws Exception {
        int databaseSizeBeforeCreate = ingredientCategoryRepository.findAll().size();

        // Create the IngredientCategory

        restIngredientCategoryMockMvc.perform(post("/api/ingredient-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredientCategory)))
            .andExpect(status().isCreated());

        // Validate the IngredientCategory in the database
        List<IngredientCategory> ingredientCategoryList = ingredientCategoryRepository.findAll();
        assertThat(ingredientCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        IngredientCategory testIngredientCategory = ingredientCategoryList.get(ingredientCategoryList.size() - 1);
        assertThat(testIngredientCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createIngredientCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ingredientCategoryRepository.findAll().size();

        // Create the IngredientCategory with an existing ID
        IngredientCategory existingIngredientCategory = new IngredientCategory();
        existingIngredientCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIngredientCategoryMockMvc.perform(post("/api/ingredient-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingIngredientCategory)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<IngredientCategory> ingredientCategoryList = ingredientCategoryRepository.findAll();
        assertThat(ingredientCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIngredientCategories() throws Exception {
        // Initialize the database
        ingredientCategoryRepository.saveAndFlush(ingredientCategory);

        // Get all the ingredientCategoryList
        restIngredientCategoryMockMvc.perform(get("/api/ingredient-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ingredientCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getIngredientCategory() throws Exception {
        // Initialize the database
        ingredientCategoryRepository.saveAndFlush(ingredientCategory);

        // Get the ingredientCategory
        restIngredientCategoryMockMvc.perform(get("/api/ingredient-categories/{id}", ingredientCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ingredientCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIngredientCategory() throws Exception {
        // Get the ingredientCategory
        restIngredientCategoryMockMvc.perform(get("/api/ingredient-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIngredientCategory() throws Exception {
        // Initialize the database
        ingredientCategoryRepository.saveAndFlush(ingredientCategory);
        int databaseSizeBeforeUpdate = ingredientCategoryRepository.findAll().size();

        // Update the ingredientCategory
        IngredientCategory updatedIngredientCategory = ingredientCategoryRepository.findOne(ingredientCategory.getId());
        updatedIngredientCategory
                .name(UPDATED_NAME);

        restIngredientCategoryMockMvc.perform(put("/api/ingredient-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIngredientCategory)))
            .andExpect(status().isOk());

        // Validate the IngredientCategory in the database
        List<IngredientCategory> ingredientCategoryList = ingredientCategoryRepository.findAll();
        assertThat(ingredientCategoryList).hasSize(databaseSizeBeforeUpdate);
        IngredientCategory testIngredientCategory = ingredientCategoryList.get(ingredientCategoryList.size() - 1);
        assertThat(testIngredientCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingIngredientCategory() throws Exception {
        int databaseSizeBeforeUpdate = ingredientCategoryRepository.findAll().size();

        // Create the IngredientCategory

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIngredientCategoryMockMvc.perform(put("/api/ingredient-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredientCategory)))
            .andExpect(status().isCreated());

        // Validate the IngredientCategory in the database
        List<IngredientCategory> ingredientCategoryList = ingredientCategoryRepository.findAll();
        assertThat(ingredientCategoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIngredientCategory() throws Exception {
        // Initialize the database
        ingredientCategoryRepository.saveAndFlush(ingredientCategory);
        int databaseSizeBeforeDelete = ingredientCategoryRepository.findAll().size();

        // Get the ingredientCategory
        restIngredientCategoryMockMvc.perform(delete("/api/ingredient-categories/{id}", ingredientCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IngredientCategory> ingredientCategoryList = ingredientCategoryRepository.findAll();
        assertThat(ingredientCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IngredientCategory.class);
    }
}
