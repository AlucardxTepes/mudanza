package com.nelsonpantaleon.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Item.
 */
@Entity
@Table(name = "item")
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private Float price;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private Integer quantity;

    @OneToMany(mappedBy = "item")
    private Set<ItemBuyer> buyerLists = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getPrice() {
        return price;
    }

    public Item price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public Item name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Item quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Set<ItemBuyer> getBuyerLists() {
        return buyerLists;
    }

    public Item buyerLists(Set<ItemBuyer> itemBuyers) {
        this.buyerLists = itemBuyers;
        return this;
    }

    public Item addBuyerList(ItemBuyer itemBuyer) {
        this.buyerLists.add(itemBuyer);
        itemBuyer.setItem(this);
        return this;
    }

    public Item removeBuyerList(ItemBuyer itemBuyer) {
        this.buyerLists.remove(itemBuyer);
        itemBuyer.setItem(null);
        return this;
    }

    public void setBuyerLists(Set<ItemBuyer> itemBuyers) {
        this.buyerLists = itemBuyers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Item)) {
            return false;
        }
        return id != null && id.equals(((Item) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Item{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", name='" + getName() + "'" +
            ", quantity=" + getQuantity() +
            "}";
    }
}
