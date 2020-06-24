package com.nelsonpantaleon.repository;

import com.nelsonpantaleon.domain.ItemPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;


/**
 * Spring Data  repository for the ItemPicture entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemPictureRepository extends JpaRepository<ItemPicture, Long> {
    Set<ItemPicture> findAllByItemId(Long itemId);
    void deleteAllByItemId(Long itemId);
}
