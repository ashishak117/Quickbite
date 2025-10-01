package com.quickbite.controller;

import com.quickbite.service.RestaurantService;
import com.quickbite.repository.UserRepository;
import com.quickbite.repository.OrderRepository;
import com.quickbite.repository.RestaurantRepository;
import com.quickbite.entity.OrderEntity;
import com.quickbite.entity.RestaurantEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final RestaurantService restaurantService;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;

    public AdminController(RestaurantService restaurantService, UserRepository userRepository, OrderRepository orderRepository, RestaurantRepository restaurantRepository) {
        this.restaurantService = restaurantService;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @GetMapping("/pending-restaurants")
    public ResponseEntity<?> pending() {
        return ResponseEntity.ok(restaurantService.pending());
    }

    @PostMapping("/restaurants/{id}/approve")
    public ResponseEntity<?> approve(@PathVariable Long id) {
        restaurantService.approve(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/restaurants/{id}/deny")
    public ResponseEntity<?> deny(@PathVariable Long id, @RequestBody(required = false) String message) {
        String msg = (message == null || message.isBlank()) ? "Denied" : message;
        restaurantService.deny(id, msg);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<?> stats() {
        long users = userRepository.count();
        long restaurants = restaurantRepository.count();
        long ordersCount = orderRepository.count();
        double revenue = orderRepository.findAll().stream()
                .mapToDouble(o -> o.getTotalAmount() != null ? o.getTotalAmount() : 0.0)
                .sum();

        long owners = userRepository.findAll().stream()
                .filter(u -> u.getRole() != null && u.getRole().name().equals("OWNER"))
                .count();

        // orders by restaurant aggregation
        Map<Long, Map<String, Object>> agg = new HashMap<>();
        for (OrderEntity o : orderRepository.findAll()) {
            Long rid = o.getRestaurantId();
            if (rid == null) continue;
            agg.putIfAbsent(rid, new HashMap<>());
            Map<String, Object> m = agg.get(rid);
            m.putIfAbsent("restaurantId", rid);
            int prevCount = (int) m.getOrDefault("orders", 0);
            double prevRevenue = (double) m.getOrDefault("revenue", 0.0);
            m.put("orders", prevCount + 1);
            m.put("revenue", prevRevenue + (o.getTotalAmount() != null ? o.getTotalAmount() : 0.0));
        }

        List<Map<String,Object>> byRest = new ArrayList<>();
        for (Map.Entry<Long, Map<String,Object>> e : agg.entrySet()) {
            Long rid = e.getKey();
            Map<String,Object> m = e.getValue();
            String name = restaurantRepository.findById(rid).map(RestaurantEntity::getName).orElse("R#" + rid);
            m.put("restaurantName", name);
            byRest.add(m);
        }

        Map<String,Object> result = new HashMap<>();
        result.put("users", users);
        result.put("owners", owners);
        result.put("restaurants", restaurants);
        result.put("orders", ordersCount);
        result.put("revenue", revenue);
        result.put("ordersByRestaurant", byRest);

        return ResponseEntity.ok(result);
    }
}
