package com.quickbite.service;

import com.quickbite.entity.RestaurantEntity;
import com.quickbite.repository.RestaurantRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RestaurantService {
    private final RestaurantRepository repo;
    public RestaurantService(RestaurantRepository repo){ this.repo = repo; }

    public List<RestaurantEntity> listApproved(){ return repo.findByApprovedTrue(); }
    public Optional<RestaurantEntity> findById(Long id){ return repo.findById(id); }
    public RestaurantEntity create(RestaurantEntity r){ r.setApproved(false); return repo.save(r); }
    public List<RestaurantEntity> findByOwner(Long ownerId){ return repo.findByOwnerId(ownerId); }
    public void approve(Long id){ repo.findById(id).ifPresent(r->{ r.setApproved(true); repo.save(r); }); }
    public void deny(Long id, String msg){ repo.findById(id).ifPresent(r->{ r.setDeniedMessage(msg); repo.save(r); }); }
    public List<RestaurantEntity> pending(){ return repo.findAll().stream().filter(r-> (r.getApproved()==null || !r.getApproved()) && (r.getDeniedMessage()==null || r.getDeniedMessage().isEmpty())).collect(Collectors.toList()); }
}
