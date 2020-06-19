package com.nelsonpantaleon.repository;
import com.nelsonpantaleon.domain.ItemBuyer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ItemBuyer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemBuyerRepository extends JpaRepository<ItemBuyer, Long> {

}
