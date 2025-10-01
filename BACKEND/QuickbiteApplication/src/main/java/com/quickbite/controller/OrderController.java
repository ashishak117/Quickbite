package com.quickbite.controller;

import com.quickbite.dto.PlaceOrderDto;
import com.quickbite.entity.OrderEntity;
import com.quickbite.entity.OrderItemEntity;
import com.quickbite.service.OrderService;
import com.quickbite.service.MenuService;
import com.quickbite.service.RestaurantService;
import com.quickbite.entity.RestaurantEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final MenuService menuService;
    private final RestaurantService restaurantService;

    public OrderController(OrderService orderService,
                           MenuService menuService,
                           RestaurantService restaurantService) {
        this.orderService = orderService;
        this.menuService = menuService;
        this.restaurantService = restaurantService;
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderDto dto) {
        System.out.println("[OrderController] placeOrder() - received DTO: " + dto + " items=" + (dto.getItems()!=null?dto.getItems().size():0));
        if (dto == null || dto.getItems() == null || dto.getItems().isEmpty()) {
            System.out.println("[OrderController] placeOrder() - invalid dto");
            return ResponseEntity.badRequest().body("No items");
        }

        // use Mapper utility if you want, but create explicitly to log details
        OrderEntity e = new OrderEntity();
        e.setRestaurantId(dto.getRestaurantId());
        e.setCustomerId(dto.getCustomerId());
        e.setTotalAmount(dto.getTotalAmount());
        e.setDeliveryCharge(dto.getDeliveryCharge());
        e.setPaymentMethod(dto.getPaymentMethod());
        e.setStatus("PLACED");
        e.setCreatedAt(java.time.Instant.now());
        e.setItems(dto.getItems().stream().map(i -> {
            OrderItemEntity it = new OrderItemEntity();
            it.setItemId(i.getItemId());
            it.setName(i.getName());
            it.setPrice(i.getPrice());
            it.setQty(i.getQty());
            it.setVeg(i.getVeg());
            return it;
        }).collect(Collectors.toList()));

        var saved = orderService.placeOrder(e);

        System.out.println("[OrderController] placeOrder() - returning saved order id: " + saved.getId());

        String restaurantName = restaurantService.findById(saved.getRestaurantId())
                .map(r -> r.getName())
                .orElse("");

        return ResponseEntity.ok(Map.of(
                "id", saved.getId(),
                "restaurantId", saved.getRestaurantId(),
                "restaurantName", restaurantName,
                "customerId", saved.getCustomerId(),
                "totalAmount", saved.getTotalAmount(),
                "deliveryCharge", saved.getDeliveryCharge(),
                "paymentMethod", saved.getPaymentMethod(),
                "status", saved.getStatus(),
                "createdAt", saved.getCreatedAt(),
                "items", saved.getItems()
        ));
    }
    // debug: list all orders (for dev only)
    @GetMapping("/debug/all")
    public ResponseEntity<?> allOrdersDebug() {
        var all = orderService.repoFindAllForDebug();
        return ResponseEntity.ok(all);
    }


    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> listCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(orderService.byCustomer(customerId));
    }

    @GetMapping("/restaurant/{restId}")
    public ResponseEntity<?> listRestaurant(@PathVariable Long restId) {
        return ResponseEntity.ok(orderService.byRestaurant(restId));
    }

    // new: fetch orders for all restaurants owned by ownerId
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<?> listForOwner(@PathVariable Long ownerId) {
        List<RestaurantEntity> rests = restaurantService.findByOwner(ownerId);
        List<OrderEntity> all = new ArrayList<>();
        for (RestaurantEntity r : rests) {
            if (r.getId() != null) {
                all.addAll(orderService.byRestaurant(r.getId()));
            }
        }
        return ResponseEntity.ok(all);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        orderService.updateStatus(id, status);
        return ResponseEntity.ok().build();
    }
}
