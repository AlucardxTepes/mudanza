package com.nelsonpantaleon.repository;

import com.nelsonpantaleon.domain.ItemBuyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ItemBuyer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemBuyerRepository extends JpaRepository<ItemBuyer, Long> {
    List<ItemBuyer> findAllByItemId(Long itemId);
}
