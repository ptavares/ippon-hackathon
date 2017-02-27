package fr.ippon.cooksmart.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.ippon.cooksmart.domain.IngredientCategory;

import fr.ippon.cooksmart.repository.IngredientCategoryRepository;
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
 * REST controller for managing IngredientCategory.
 */
@RestController
@RequestMapping("/api")
public class IngredientCategoryResource {

    private final Logger log = LoggerFactory.getLogger(IngredientCategoryResource.class);

    private static final String ENTITY_NAME = "ingredientCategory";
        
    private final IngredientCategoryRepository ingredientCategoryRepository;

    public IngredientCategoryResource(IngredientCategoryRepository ingredientCategoryRepository) {
        this.ingredientCategoryRepository = ingredientCategoryRepository;
    }

    /**
     * POST  /ingredient-categories : Create a new ingredientCategory.
     *
     * @param ingredientCategory the ingredientCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ingredientCategory, or with status 400 (Bad Request) if the ingredientCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ingredient-categories")
    @Timed
    public ResponseEntity<IngredientCategory> createIngredientCategory(@RequestBody IngredientCategory ingredientCategory) throws URISyntaxException {
        log.debug("REST request to save IngredientCategory : {}", ingredientCategory);
        if (ingredientCategory.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new ingredientCategory cannot already have an ID")).body(null);
        }
        IngredientCategory result = ingredientCategoryRepository.save(ingredientCategory);
        return ResponseEntity.created(new URI("/api/ingredient-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ingredient-categories : Updates an existing ingredientCategory.
     *
     * @param ingredientCategory the ingredientCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ingredientCategory,
     * or with status 400 (Bad Request) if the ingredientCategory is not valid,
     * or with status 500 (Internal Server Error) if the ingredientCategory couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ingredient-categories")
    @Timed
    public ResponseEntity<IngredientCategory> updateIngredientCategory(@RequestBody IngredientCategory ingredientCategory) throws URISyntaxException {
        log.debug("REST request to update IngredientCategory : {}", ingredientCategory);
        if (ingredientCategory.getId() == null) {
            return createIngredientCategory(ingredientCategory);
        }
        IngredientCategory result = ingredientCategoryRepository.save(ingredientCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ingredientCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ingredient-categories : get all the ingredientCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ingredientCategories in body
     */
    @GetMapping("/ingredient-categories")
    @Timed
    public List<IngredientCategory> getAllIngredientCategories() {
        log.debug("REST request to get all IngredientCategories");
        List<IngredientCategory> ingredientCategories = ingredientCategoryRepository.findAll();
        return ingredientCategories;
    }

    /**
     * GET  /ingredient-categories/:id : get the "id" ingredientCategory.
     *
     * @param id the id of the ingredientCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ingredientCategory, or with status 404 (Not Found)
     */
    @GetMapping("/ingredient-categories/{id}")
    @Timed
    public ResponseEntity<IngredientCategory> getIngredientCategory(@PathVariable Long id) {
        log.debug("REST request to get IngredientCategory : {}", id);
        IngredientCategory ingredientCategory = ingredientCategoryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ingredientCategory));
    }

    /**
     * DELETE  /ingredient-categories/:id : delete the "id" ingredientCategory.
     *
     * @param id the id of the ingredientCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ingredient-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteIngredientCategory(@PathVariable Long id) {
        log.debug("REST request to delete IngredientCategory : {}", id);
        ingredientCategoryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
