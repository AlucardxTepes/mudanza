package com.nelsonpantaleon.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.nelsonpantaleon.web.rest.TestUtil;

public class ItemBuyerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemBuyer.class);
        ItemBuyer itemBuyer1 = new ItemBuyer();
        itemBuyer1.setId(1L);
        ItemBuyer itemBuyer2 = new ItemBuyer();
        itemBuyer2.setId(itemBuyer1.getId());
        assertThat(itemBuyer1).isEqualTo(itemBuyer2);
        itemBuyer2.setId(2L);
        assertThat(itemBuyer1).isNotEqualTo(itemBuyer2);
        itemBuyer1.setId(null);
        assertThat(itemBuyer1).isNotEqualTo(itemBuyer2);
    }
}
