package com.nelsonpantaleon.domain;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * an ItemPicture.
 */
@Entity
@Table(name = "item_picture")
public class ItemPicture implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "filename", nullable = false)
    private String filename;

    @ManyToOne(optional = false)
    @NotNull
    private Item item;

    public ItemPicture() {
    }

    public ItemPicture(@NotNull String filename, @NotNull Item item) {
        this.filename = filename;
        this.item = item;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public ItemPicture filename(String filename) {
        this.filename = filename;
        return this;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Item getItem() {
        return item;
    }

    public ItemPicture item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemPicture)) {
            return false;
        }
        return id != null && id.equals(((ItemPicture) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ItemPicture{" +
            "id=" + getId() +
            ", filename='" + getFilename() + "'" +
            "}";
    }
}
