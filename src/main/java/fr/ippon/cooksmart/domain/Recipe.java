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
 * A Recipe.
 */
@Entity
@Table(name = "recipe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Recipe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "recipe")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RecipeIngredients> contains = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Recipe name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<RecipeIngredients> getContains() {
        return contains;
    }

    public Recipe contains(Set<RecipeIngredients> recipeIngredients) {
        this.contains = recipeIngredients;
        return this;
    }

    public Recipe addContains(RecipeIngredients recipeIngredients) {
        this.contains.add(recipeIngredients);
        recipeIngredients.setRecipe(this);
        return this;
    }

    public Recipe removeContains(RecipeIngredients recipeIngredients) {
        this.contains.remove(recipeIngredients);
        recipeIngredients.setRecipe(null);
        return this;
    }

    public void setContains(Set<RecipeIngredients> recipeIngredients) {
        this.contains = recipeIngredients;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Recipe recipe = (Recipe) o;
        if (recipe.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, recipe.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Recipe{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
