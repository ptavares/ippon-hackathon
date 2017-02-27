package fr.ippon.cooksmart.repository;

import fr.ippon.cooksmart.domain.Ingredient;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Ingredient entity.
 */
@SuppressWarnings("unused")
public interface IngredientRepository extends JpaRepository<Ingredient,Long> {

}
