//package com.quickbite.service;
//
//import com.quickbite.entity.OrderEntity;
//import com.quickbite.repository.OrderRepository;
//import org.springframework.stereotype.Service;
//import java.time.Instant;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class OrderService {
//    private final OrderRepository repo;
//    public OrderService(OrderRepository repo){ this.repo = repo; }
//
//    public OrderEntity placeOrder(OrderEntity order){
//        order.setStatus("PLACED");
//        order.setCreatedAt(Instant.now());
//        return repo.save(order);
//    }
//
//    public List<OrderEntity> byCustomer(Long customerId){ return repo.findByCustomerId(customerId); }
//    public List<OrderEntity> byRestaurant(Long restaurantId){ return repo.findByRestaurantId(restaurantId); }
//    public Optional<OrderEntity> findById(Long id){ return repo.findById(id); }
//    public void updateStatus(Long id, String status){ repo.findById(id).ifPresent(o->{ o.setStatus(status); repo.save(o); }); }
//}
// src/main/java/com/quickbite/service/OrderService.java
package com.quickbite.service;

import com.quickbite.entity.OrderEntity;
import com.quickbite.repository.OrderRepository;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository repo;
    public OrderService(OrderRepository repo){ this.repo = repo; }

    public OrderEntity placeOrder(OrderEntity order){
        // Defensive logging
        System.out.println("[OrderService] placeOrder() - incoming order: restaurantId=" + order.getRestaurantId()
                + " customerId=" + order.getCustomerId() + " total=" + order.getTotalAmount()
                + " items=" + (order.getItems() != null ? order.getItems().size() : 0));
        order.setStatus("PLACED");
        if (order.getCreatedAt() == null) order.setCreatedAt(Instant.now());
        OrderEntity saved = repo.save(order);
        System.out.println("[OrderService] placeOrder() - saved order id: " + saved.getId() + " createdAt=" + saved.getCreatedAt()
                + " itemsSaved=" + (saved.getItems() != null ? saved.getItems().size() : 0));
        return saved;
    }

    // add to OrderService
    public List<OrderEntity> repoFindAllForDebug() { return repo.findAll(); }


    public List<OrderEntity> byCustomer(Long customerId){ return repo.findByCustomerId(customerId); }
    public List<OrderEntity> byRestaurant(Long restaurantId){ return repo.findByRestaurantId(restaurantId); }
    public Optional<OrderEntity> findById(Long id){ return repo.findById(id); }
    public void updateStatus(Long id, String status){ repo.findById(id).ifPresent(o->{ o.setStatus(status); repo.save(o); }); }
}
