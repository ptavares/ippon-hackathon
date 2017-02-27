package fr.ippon.cooksmart.repository;

import fr.ippon.cooksmart.domain.IngredientCategory;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the IngredientCategory entity.
 */
@SuppressWarnings("unused")
public interface IngredientCategoryRepository extends JpaRepository<IngredientCategory,Long> {

}
