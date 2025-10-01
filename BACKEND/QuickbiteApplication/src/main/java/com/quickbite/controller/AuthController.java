package com.quickbite.controller;

import com.quickbite.dto.AuthRequest;
import com.quickbite.dto.AuthResponse;
import com.quickbite.dto.RegisterUserDto;
import com.quickbite.entity.UserEntity;
import com.quickbite.repository.UserRepository;
import com.quickbite.security.JwtService;
import com.quickbite.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    public AuthController(AuthService authService, JwtService jwtService, UserRepository userRepository){
        this.authService=authService; this.jwtService=jwtService; this.userRepository=userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto dto){
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) return ResponseEntity.badRequest().body("Email exists");
        UserEntity e = new UserEntity();
        e.setName(dto.getName()); e.setEmail(dto.getEmail()); e.setPassword(dto.getPassword());
        e.setPhone(dto.getPhone()); e.setAddress(dto.getAddress());
        try { e.setRole(UserEntity.Role.valueOf(dto.getRole())); }
        catch (Exception ex) { e.setRole(UserEntity.Role.CUSTOMER); }
        UserEntity saved = authService.register(e);
        String token = jwtService.generateToken(saved.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, saved.getId(), saved.getEmail(), saved.getRole().name()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req){
        Optional<UserEntity> ou = authService.login(req.getEmail(), req.getPassword());
        if (ou.isPresent()){
            UserEntity u = ou.get();
            String token = jwtService.generateToken(u.getEmail());
            return ResponseEntity.ok(new AuthResponse(token, u.getId(), u.getEmail(), u.getRole().name()));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
