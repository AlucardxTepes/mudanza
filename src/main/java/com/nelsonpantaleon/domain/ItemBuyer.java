package com.nelsonpantaleon.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A ItemBuyer.
 */
@Entity
@Table(name = "item_buyer")
public class ItemBuyer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "email")
    private String email;

    @NotNull
    @Min(value = 1)
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(name = "paid")
    private Boolean paid;

    @ManyToOne
    @JsonIgnoreProperties("buyerList")
    private Item item;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ItemBuyer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public ItemBuyer phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public ItemBuyer email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public ItemBuyer quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public ItemBuyer timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Boolean isPaid() {
        return paid;
    }

    public ItemBuyer paid(Boolean paid) {
        this.paid = paid;
        return this;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public Item getItem() {
        return item;
    }

    public ItemBuyer item(Item item) {
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
        if (!(o instanceof ItemBuyer)) {
            return false;
        }
        return id != null && id.equals(((ItemBuyer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ItemBuyer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", phone='" + getPhone() + "'" +
            ", email='" + getEmail() + "'" +
            ", quantity=" + getQuantity() +
            ", timestamp='" + getTimestamp() + "'" +
            ", paid='" + isPaid() + "'" +
            "}";
    }
}
