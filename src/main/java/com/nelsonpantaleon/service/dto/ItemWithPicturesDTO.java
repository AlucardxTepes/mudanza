package com.nelsonpantaleon.service.dto;

import com.nelsonpantaleon.domain.Item;

import java.util.HashSet;
import java.util.Set;

public class ItemWithPicturesDTO {

    private Item item;

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    private Set<String> pictures = new HashSet<>();

    public Set<String> getPictures() {
        return pictures;
    }

    public void setPictures(Set<String> pictures) {
        this.pictures = pictures;
    }
}
