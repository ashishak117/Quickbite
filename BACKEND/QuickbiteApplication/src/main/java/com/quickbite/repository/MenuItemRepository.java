package com.quickbite.repository;

import com.quickbite.entity.MenuItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItemEntity, Long> {
    List<MenuItemEntity> findByRestaurantIdAndPublishedTrue(Long restaurantId);
    List<MenuItemEntity> findByRestaurantId(Long restaurantId);
}
