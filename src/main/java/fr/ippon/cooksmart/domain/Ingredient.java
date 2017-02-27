package fr.ippon.cooksmart.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Ingredient.
 */
@Entity
@Table(name = "ingredient")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private IngredientCategory ingredientCategory;

    @OneToMany(mappedBy = "ingredient")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RecipeIngredients> includeds = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Ingredient name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public IngredientCategory getIngredientCategory() {
        return ingredientCategory;
    }

    public Ingredient ingredientCategory(IngredientCategory ingredientCategory) {
        this.ingredientCategory = ingredientCategory;
        return this;
    }

    public void setIngredientCategory(IngredientCategory ingredientCategory) {
        this.ingredientCategory = ingredientCategory;
    }

    public Set<RecipeIngredients> getIncludeds() {
        return includeds;
    }

    public Ingredient includeds(Set<RecipeIngredients> recipeIngredients) {
        this.includeds = recipeIngredients;
        return this;
    }

    public Ingredient addIncluded(RecipeIngredients recipeIngredients) {
        this.includeds.add(recipeIngredients);
        recipeIngredients.setIngredient(this);
        return this;
    }

    public Ingredient removeIncluded(RecipeIngredients recipeIngredients) {
        this.includeds.remove(recipeIngredients);
        recipeIngredients.setIngredient(null);
        return this;
    }

    public void setIncludeds(Set<RecipeIngredients> recipeIngredients) {
        this.includeds = recipeIngredients;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Ingredient ingredient = (Ingredient) o;
        if (ingredient.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, ingredient.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Ingredient{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
