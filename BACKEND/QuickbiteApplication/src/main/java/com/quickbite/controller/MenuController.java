package com.quickbite.controller;

import com.quickbite.dto.CreateMenuItemDto;
import com.quickbite.entity.MenuItemEntity;
import com.quickbite.service.MenuService;
import com.quickbite.service.RestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants/{restId}/menu")
public class MenuController {
//    private final MenuService svc;
//    public MenuController(MenuService svc){ this.svc = svc; }
private final MenuService svc;
    private final RestaurantService restaurantService;
    public MenuController(MenuService svc, RestaurantService restaurantService){ this.svc = svc; this.restaurantService = restaurantService; }


    @GetMapping
    public ResponseEntity<List<MenuItemEntity>> list(@PathVariable Long restId, @RequestParam(defaultValue = "true") boolean published){
        if (published) return ResponseEntity.ok(svc.listPublished(restId));
        return ResponseEntity.ok(svc.listAll(restId));
    }

//    @PostMapping
//    public ResponseEntity<?> create(@PathVariable Long restId, @RequestBody CreateMenuItemDto dto){
//        MenuItemEntity e = new MenuItemEntity();
//        e.setRestaurantId(restId); e.setName(dto.getName()); e.setPrice(dto.getPrice());
//        e.setVeg(dto.getVeg()); e.setImage(dto.getImage()); e.setPublished(dto.getPublished()!=null?dto.getPublished():false);
//        return ResponseEntity.ok(svc.create(e));
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> update(@PathVariable Long restId, @PathVariable Long id, @RequestBody CreateMenuItemDto dto){
//        return svc.findById(id).map(existing -> {
//            existing.setName(dto.getName()); existing.setPrice(dto.getPrice());
//            existing.setVeg(dto.getVeg()); existing.setImage(dto.getImage());
//            existing.setPublished(dto.getPublished()!=null?dto.getPublished():existing.getPublished());
//            existing.setRestaurantId(restId);
//            return ResponseEntity.ok(svc.update(existing));
//        }).orElseGet(()->ResponseEntity.notFound().build());
//    }
@PostMapping
public ResponseEntity<?> create(@PathVariable Long restId, @RequestBody CreateMenuItemDto dto){
    // check restaurant approval
    var maybeRest = restaurantService.findById(restId);
    if (maybeRest.isPresent()) {
        if (dto.getPublished() != null && dto.getPublished()) {
            if (!Boolean.TRUE.equals(maybeRest.get().getApproved())) {
                // cannot publish if restaurant not approved
                return ResponseEntity.status(403).body("Restaurant not yet approved; cannot publish menu items.");
            }
        }
    }
    MenuItemEntity e = new MenuItemEntity();
    e.setRestaurantId(restId); e.setName(dto.getName()); e.setPrice(dto.getPrice());
    e.setVeg(dto.getVeg()); e.setImage(dto.getImage()); e.setPublished(dto.getPublished()!=null?dto.getPublished():false);
    return ResponseEntity.ok(svc.create(e));
}

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long restId, @PathVariable Long id, @RequestBody CreateMenuItemDto dto){
        var maybeRest = restaurantService.findById(restId);
        if (maybeRest.isPresent()) {
            if (dto.getPublished() != null && dto.getPublished()) {
                if (!Boolean.TRUE.equals(maybeRest.get().getApproved())) {
                    return ResponseEntity.status(403).body("Restaurant not yet approved; cannot publish menu items.");
                }
            }
        }
        return svc.findById(id).map(existing -> {
            existing.setName(dto.getName()); existing.setPrice(dto.getPrice());
            existing.setVeg(dto.getVeg()); existing.setImage(dto.getImage());
            existing.setPublished(dto.getPublished()!=null?dto.getPublished():existing.getPublished());
            existing.setRestaurantId(restId);
            return ResponseEntity.ok(svc.update(existing));
        }).orElseGet(()->ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long restId, @PathVariable Long id){
        svc.delete(id);
        return ResponseEntity.ok().build();
    }
}
