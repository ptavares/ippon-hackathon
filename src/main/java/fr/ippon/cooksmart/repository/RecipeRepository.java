package fr.ippon.cooksmart.repository;

import fr.ippon.cooksmart.domain.Recipe;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Recipe entity.
 */
@SuppressWarnings("unused")
public interface RecipeRepository extends JpaRepository<Recipe,Long> {

}
