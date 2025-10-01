package com.quickbite.repository;

import com.quickbite.entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RestaurantRepository extends JpaRepository<RestaurantEntity, Long> {
    List<RestaurantEntity> findByApprovedTrue();
    List<RestaurantEntity> findByOwnerId(Long ownerId);
}
