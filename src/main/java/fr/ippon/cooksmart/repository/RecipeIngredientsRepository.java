package fr.ippon.cooksmart.repository;

import fr.ippon.cooksmart.domain.RecipeIngredients;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the RecipeIngredients entity.
 */
@SuppressWarnings("unused")
public interface RecipeIngredientsRepository extends JpaRepository<RecipeIngredients,Long> {

}
