package fr.ippon.cooksmart.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import fr.ippon.cooksmart.domain.enumeration.Unity;

/**
 * A RecipeIngredients.
 */
@Entity
@Table(name = "recipe_ingredients")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RecipeIngredients implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "quantity")
    private Long quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "unity")
    private Unity unity;

    @ManyToOne
    private Ingredient ingredient;

    @ManyToOne
    private Recipe recipe;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuantity() {
        return quantity;
    }

    public RecipeIngredients quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Unity getUnity() {
        return unity;
    }

    public RecipeIngredients unity(Unity unity) {
        this.unity = unity;
        return this;
    }

    public void setUnity(Unity unity) {
        this.unity = unity;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public RecipeIngredients ingredient(Ingredient ingredient) {
        this.ingredient = ingredient;
        return this;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public RecipeIngredients recipe(Recipe recipe) {
        this.recipe = recipe;
        return this;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RecipeIngredients recipeIngredients = (RecipeIngredients) o;
        if (recipeIngredients.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, recipeIngredients.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "RecipeIngredients{" +
            "id=" + id +
            ", quantity='" + quantity + "'" +
            ", unity='" + unity + "'" +
            '}';
    }
}
