package com.nelsonpantaleon.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.nelsonpantaleon.web.rest.TestUtil;

public class ItemPictureTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemPicture.class);
        ItemPicture itemPicture1 = new ItemPicture();
        itemPicture1.setId(1L);
        ItemPicture itemPicture2 = new ItemPicture();
        itemPicture2.setId(itemPicture1.getId());
        assertThat(itemPicture1).isEqualTo(itemPicture2);
        itemPicture2.setId(2L);
        assertThat(itemPicture1).isNotEqualTo(itemPicture2);
        itemPicture1.setId(null);
        assertThat(itemPicture1).isNotEqualTo(itemPicture2);
    }
}
