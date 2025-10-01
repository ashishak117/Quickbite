package com.quickbite.controller;

import com.quickbite.dto.CreateRestaurantDto;
import com.quickbite.entity.RestaurantEntity;
import com.quickbite.service.RestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    private final RestaurantService svc;
    public RestaurantController(RestaurantService svc){ this.svc = svc; }

    // in RestaurantController.java (imports omitted)
    @GetMapping
    public ResponseEntity<List<RestaurantEntity>> list(
            @RequestParam(name = "ownerId", required = false) Long ownerId) {

        // if ownerId provided, return restaurants for that owner (including pending/denied)
        if (ownerId != null) {
            return ResponseEntity.ok(svc.findByOwner(ownerId));
        }

        // otherwise return only approved restaurants for public listing
        return ResponseEntity.ok(svc.listApproved());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id){ return svc.findById(id).map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build()); }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateRestaurantDto dto){
        RestaurantEntity e = new RestaurantEntity();
        e.setName(dto.getName()); e.setAbout(dto.getAbout()); e.setAddress(dto.getAddress());
        e.setEmail(dto.getEmail()); e.setPhone(dto.getPhone()); e.setImage(dto.getImage());
        e.setOwnerId(dto.getOwnerId()); e.setApproved(false);
        return ResponseEntity.ok(svc.create(e));
    }
}
