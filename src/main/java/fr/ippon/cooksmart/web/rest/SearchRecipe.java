package fr.ippon.cooksmart.web.rest;

import com.codahale.metrics.annotation.Timed;

import fr.ippon.cooksmart.domain.Ingredient;
import fr.ippon.cooksmart.domain.IngredientCategory;
import fr.ippon.cooksmart.domain.Recipe;

import fr.ippon.cooksmart.repository.RecipeRepository;
import fr.ippon.cooksmart.repository.IngredientCategoryRepository;
import fr.ippon.cooksmart.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.Random;

/**
 * REST controller for managing IngredientCategory.
 */
@RestController
@RequestMapping("/api")
public class SearchRecipe {

    private final Logger log = LoggerFactory.getLogger(SearchRecipe.class);

     private final RecipeRepository recipeRepository;

    public SearchRecipe(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }


    @PostMapping("/search-recipe")
    @Timed
    public ResponseEntity<Recipe> searchRecipe(@RequestBody List<Ingredient> ingredientList) throws URISyntaxException {
        log.debug("REST request to search recipe : {}", ingredientList);
        if (ingredientList == null || ingredientList.isEmpty()) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("SearchRecipe", "listEmpty", "Cannot find a recipe without ingredients")).body(null);
        }
        Random r = new Random();
        int recetteNumber = r.nextInt(5);
        Recipe recipe = recipeRepository.findOne((long)recetteNumber);

        return new ResponseEntity<>(recipe, HttpStatus.OK);

    }

}
