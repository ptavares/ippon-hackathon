package fr.ippon.cooksmart.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.ippon.cooksmart.domain.RecipeIngredients;

import fr.ippon.cooksmart.repository.RecipeIngredientsRepository;
import fr.ippon.cooksmart.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RecipeIngredients.
 */
@RestController
@RequestMapping("/api")
public class RecipeIngredientsResource {

    private final Logger log = LoggerFactory.getLogger(RecipeIngredientsResource.class);

    private static final String ENTITY_NAME = "recipeIngredients";
        
    private final RecipeIngredientsRepository recipeIngredientsRepository;

    public RecipeIngredientsResource(RecipeIngredientsRepository recipeIngredientsRepository) {
        this.recipeIngredientsRepository = recipeIngredientsRepository;
    }

    /**
     * POST  /recipe-ingredients : Create a new recipeIngredients.
     *
     * @param recipeIngredients the recipeIngredients to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recipeIngredients, or with status 400 (Bad Request) if the recipeIngredients has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recipe-ingredients")
    @Timed
    public ResponseEntity<RecipeIngredients> createRecipeIngredients(@RequestBody RecipeIngredients recipeIngredients) throws URISyntaxException {
        log.debug("REST request to save RecipeIngredients : {}", recipeIngredients);
        if (recipeIngredients.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new recipeIngredients cannot already have an ID")).body(null);
        }
        RecipeIngredients result = recipeIngredientsRepository.save(recipeIngredients);
        return ResponseEntity.created(new URI("/api/recipe-ingredients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recipe-ingredients : Updates an existing recipeIngredients.
     *
     * @param recipeIngredients the recipeIngredients to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recipeIngredients,
     * or with status 400 (Bad Request) if the recipeIngredients is not valid,
     * or with status 500 (Internal Server Error) if the recipeIngredients couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recipe-ingredients")
    @Timed
    public ResponseEntity<RecipeIngredients> updateRecipeIngredients(@RequestBody RecipeIngredients recipeIngredients) throws URISyntaxException {
        log.debug("REST request to update RecipeIngredients : {}", recipeIngredients);
        if (recipeIngredients.getId() == null) {
            return createRecipeIngredients(recipeIngredients);
        }
        RecipeIngredients result = recipeIngredientsRepository.save(recipeIngredients);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recipeIngredients.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recipe-ingredients : get all the recipeIngredients.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of recipeIngredients in body
     */
    @GetMapping("/recipe-ingredients")
    @Timed
    public List<RecipeIngredients> getAllRecipeIngredients() {
        log.debug("REST request to get all RecipeIngredients");
        List<RecipeIngredients> recipeIngredients = recipeIngredientsRepository.findAll();
        return recipeIngredients;
    }

    /**
     * GET  /recipe-ingredients/:id : get the "id" recipeIngredients.
     *
     * @param id the id of the recipeIngredients to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recipeIngredients, or with status 404 (Not Found)
     */
    @GetMapping("/recipe-ingredients/{id}")
    @Timed
    public ResponseEntity<RecipeIngredients> getRecipeIngredients(@PathVariable Long id) {
        log.debug("REST request to get RecipeIngredients : {}", id);
        RecipeIngredients recipeIngredients = recipeIngredientsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(recipeIngredients));
    }

    /**
     * DELETE  /recipe-ingredients/:id : delete the "id" recipeIngredients.
     *
     * @param id the id of the recipeIngredients to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recipe-ingredients/{id}")
    @Timed
    public ResponseEntity<Void> deleteRecipeIngredients(@PathVariable Long id) {
        log.debug("REST request to delete RecipeIngredients : {}", id);
        recipeIngredientsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
