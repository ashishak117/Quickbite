package com.quickbite.service;

import com.quickbite.entity.UserEntity;
import com.quickbite.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository){ this.userRepository = userRepository; }

    public UserEntity register(UserEntity user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<UserEntity> login(String email, String rawPassword){
        Optional<UserEntity> ou = userRepository.findByEmail(email);
        if (ou.isPresent()){
            if (passwordEncoder.matches(rawPassword, ou.get().getPassword())) return ou;
        }
        return Optional.empty();
    }
}
