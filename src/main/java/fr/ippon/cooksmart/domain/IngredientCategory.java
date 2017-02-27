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
 * A IngredientCategory.
 */
@Entity
@Table(name = "ingredient_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IngredientCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "ingredientCategory")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ingredient> contains = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public IngredientCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Ingredient> getContains() {
        return contains;
    }

    public IngredientCategory contains(Set<Ingredient> ingredients) {
        this.contains = ingredients;
        return this;
    }

    public IngredientCategory addContains(Ingredient ingredient) {
        this.contains.add(ingredient);
        ingredient.setIngredientCategory(this);
        return this;
    }

    public IngredientCategory removeContains(Ingredient ingredient) {
        this.contains.remove(ingredient);
        ingredient.setIngredientCategory(null);
        return this;
    }

    public void setContains(Set<Ingredient> ingredients) {
        this.contains = ingredients;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        IngredientCategory ingredientCategory = (IngredientCategory) o;
        if (ingredientCategory.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, ingredientCategory.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "IngredientCategory{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
