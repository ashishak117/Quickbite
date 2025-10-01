//package com.quickbite.controller;
//
//import com.quickbite.entity.UserEntity;
//import com.quickbite.repository.UserRepository;
//import com.quickbite.dto.RegisterUserDto;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserController {
//    private final UserRepository repo;
//    public UserController(UserRepository repo) { this.repo = repo; }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody RegisterUserDto dto) {
//        Optional<UserEntity> ou = repo.findById(id);
//        if (ou.isEmpty()) return ResponseEntity.notFound().build();
//        UserEntity u = ou.get();
//        if (dto.getName() != null) u.setName(dto.getName());
//        if (dto.getPhone() != null) u.setPhone(dto.getPhone());
//        if (dto.getAddress() != null) u.setAddress(dto.getAddress());
//        // don't update password/email/role here for simplicity
//        repo.save(u);
//        return ResponseEntity.ok(u);
//    }
//}

// src/main/java/com/quickbite/controller/UserController.java
package com.quickbite.controller;

import com.quickbite.entity.UserEntity;
import com.quickbite.repository.UserRepository;
import com.quickbite.dto.RegisterUserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository repo;
    public UserController(UserRepository repo) { this.repo = repo; }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        Optional<UserEntity> ou = repo.findById(id);
        if (ou.isEmpty()) return ResponseEntity.notFound().build();
        UserEntity u = ou.get();
        // hide sensitive fields like password before returning
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody RegisterUserDto dto) {
        Optional<UserEntity> ou = repo.findById(id);
        if (ou.isEmpty()) return ResponseEntity.notFound().build();
        UserEntity u = ou.get();
        if (dto.getName() != null) u.setName(dto.getName());
        if (dto.getPhone() != null) u.setPhone(dto.getPhone());
        if (dto.getAddress() != null) u.setAddress(dto.getAddress());
        // don't update password/email/role here for simplicity
        repo.save(u);
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }
}
