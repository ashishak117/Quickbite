package com.quickbite.security;

import com.quickbite.entity.UserEntity;
import com.quickbite.repository.UserRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthFilter(JwtService jwtService, UserRepository userRepository){
        this.jwtService = jwtService; this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        String header = req.getHeader("Authorization");
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")){
            String token = header.substring(7);
            if (jwtService.validate(token)){
                String email = jwtService.getSubject(token);
                Optional<UserEntity> ou = userRepository.findByEmail(email);
                if (ou.isPresent()){
                    UserEntity u = ou.get();
                    String role = "ROLE_" + (u.getRole()!=null?u.getRole().name():"CUSTOMER");
                    var auth = new UsernamePasswordAuthenticationToken(u.getEmail(), null, Collections.singletonList(new SimpleGrantedAuthority(role)));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        }
        chain.doFilter(req, res);
    }
}
