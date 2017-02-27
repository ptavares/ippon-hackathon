package fr.ippon.cooksmart.web.rest;

import fr.ippon.cooksmart.CookSmartApp;

import fr.ippon.cooksmart.domain.RecipeIngredients;
import fr.ippon.cooksmart.repository.RecipeIngredientsRepository;
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

import fr.ippon.cooksmart.domain.enumeration.Unity;
/**
 * Test class for the RecipeIngredientsResource REST controller.
 *
 * @see RecipeIngredientsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CookSmartApp.class)
public class RecipeIngredientsResourceIntTest {

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;

    private static final Unity DEFAULT_UNITY = Unity.QUANTITY;
    private static final Unity UPDATED_UNITY = Unity.GR;

    @Autowired
    private RecipeIngredientsRepository recipeIngredientsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRecipeIngredientsMockMvc;

    private RecipeIngredients recipeIngredients;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
            RecipeIngredientsResource recipeIngredientsResource = new RecipeIngredientsResource(recipeIngredientsRepository);
        this.restRecipeIngredientsMockMvc = MockMvcBuilders.standaloneSetup(recipeIngredientsResource)
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
    public static RecipeIngredients createEntity(EntityManager em) {
        RecipeIngredients recipeIngredients = new RecipeIngredients()
                .quantity(DEFAULT_QUANTITY)
                .unity(DEFAULT_UNITY);
        return recipeIngredients;
    }

    @Before
    public void initTest() {
        recipeIngredients = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecipeIngredients() throws Exception {
        int databaseSizeBeforeCreate = recipeIngredientsRepository.findAll().size();

        // Create the RecipeIngredients

        restRecipeIngredientsMockMvc.perform(post("/api/recipe-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeIngredients)))
            .andExpect(status().isCreated());

        // Validate the RecipeIngredients in the database
        List<RecipeIngredients> recipeIngredientsList = recipeIngredientsRepository.findAll();
        assertThat(recipeIngredientsList).hasSize(databaseSizeBeforeCreate + 1);
        RecipeIngredients testRecipeIngredients = recipeIngredientsList.get(recipeIngredientsList.size() - 1);
        assertThat(testRecipeIngredients.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testRecipeIngredients.getUnity()).isEqualTo(DEFAULT_UNITY);
    }

    @Test
    @Transactional
    public void createRecipeIngredientsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recipeIngredientsRepository.findAll().size();

        // Create the RecipeIngredients with an existing ID
        RecipeIngredients existingRecipeIngredients = new RecipeIngredients();
        existingRecipeIngredients.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecipeIngredientsMockMvc.perform(post("/api/recipe-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingRecipeIngredients)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<RecipeIngredients> recipeIngredientsList = recipeIngredientsRepository.findAll();
        assertThat(recipeIngredientsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRecipeIngredients() throws Exception {
        // Initialize the database
        recipeIngredientsRepository.saveAndFlush(recipeIngredients);

        // Get all the recipeIngredientsList
        restRecipeIngredientsMockMvc.perform(get("/api/recipe-ingredients?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipeIngredients.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())))
            .andExpect(jsonPath("$.[*].unity").value(hasItem(DEFAULT_UNITY.toString())));
    }

    @Test
    @Transactional
    public void getRecipeIngredients() throws Exception {
        // Initialize the database
        recipeIngredientsRepository.saveAndFlush(recipeIngredients);

        // Get the recipeIngredients
        restRecipeIngredientsMockMvc.perform(get("/api/recipe-ingredients/{id}", recipeIngredients.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recipeIngredients.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()))
            .andExpect(jsonPath("$.unity").value(DEFAULT_UNITY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRecipeIngredients() throws Exception {
        // Get the recipeIngredients
        restRecipeIngredientsMockMvc.perform(get("/api/recipe-ingredients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecipeIngredients() throws Exception {
        // Initialize the database
        recipeIngredientsRepository.saveAndFlush(recipeIngredients);
        int databaseSizeBeforeUpdate = recipeIngredientsRepository.findAll().size();

        // Update the recipeIngredients
        RecipeIngredients updatedRecipeIngredients = recipeIngredientsRepository.findOne(recipeIngredients.getId());
        updatedRecipeIngredients
                .quantity(UPDATED_QUANTITY)
                .unity(UPDATED_UNITY);

        restRecipeIngredientsMockMvc.perform(put("/api/recipe-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecipeIngredients)))
            .andExpect(status().isOk());

        // Validate the RecipeIngredients in the database
        List<RecipeIngredients> recipeIngredientsList = recipeIngredientsRepository.findAll();
        assertThat(recipeIngredientsList).hasSize(databaseSizeBeforeUpdate);
        RecipeIngredients testRecipeIngredients = recipeIngredientsList.get(recipeIngredientsList.size() - 1);
        assertThat(testRecipeIngredients.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testRecipeIngredients.getUnity()).isEqualTo(UPDATED_UNITY);
    }

    @Test
    @Transactional
    public void updateNonExistingRecipeIngredients() throws Exception {
        int databaseSizeBeforeUpdate = recipeIngredientsRepository.findAll().size();

        // Create the RecipeIngredients

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRecipeIngredientsMockMvc.perform(put("/api/recipe-ingredients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recipeIngredients)))
            .andExpect(status().isCreated());

        // Validate the RecipeIngredients in the database
        List<RecipeIngredients> recipeIngredientsList = recipeIngredientsRepository.findAll();
        assertThat(recipeIngredientsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRecipeIngredients() throws Exception {
        // Initialize the database
        recipeIngredientsRepository.saveAndFlush(recipeIngredients);
        int databaseSizeBeforeDelete = recipeIngredientsRepository.findAll().size();

        // Get the recipeIngredients
        restRecipeIngredientsMockMvc.perform(delete("/api/recipe-ingredients/{id}", recipeIngredients.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RecipeIngredients> recipeIngredientsList = recipeIngredientsRepository.findAll();
        assertThat(recipeIngredientsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecipeIngredients.class);
    }
}
