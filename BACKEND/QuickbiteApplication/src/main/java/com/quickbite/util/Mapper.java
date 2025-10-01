package com.quickbite.util;

import com.quickbite.dto.PlaceOrderDto;
import com.quickbite.entity.*;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

public class Mapper {
    public static OrderEntity fromPlaceOrderDto(PlaceOrderDto dto){
        if (dto == null) return null;
        OrderEntity e = new OrderEntity();
        e.setRestaurantId(dto.getRestaurantId());
        e.setCustomerId(dto.getCustomerId());
        e.setTotalAmount(dto.getTotalAmount());
        e.setDeliveryCharge(dto.getDeliveryCharge());
        e.setPaymentMethod(dto.getPaymentMethod());
        e.setStatus("PLACED");
        e.setCreatedAt(Instant.now());
        e.setItems(dto.getItems().stream().map(i -> {
            OrderItemEntity it = new OrderItemEntity();
            it.setItemId(i.getItemId());
            it.setName(i.getName());
            it.setPrice(i.getPrice());
            it.setQty(i.getQty());
            it.setVeg(i.getVeg());
            return it;
        }).collect(Collectors.toList()));
        return e;
    }
}
