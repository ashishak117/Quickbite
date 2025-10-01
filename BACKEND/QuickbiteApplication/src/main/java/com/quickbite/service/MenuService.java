package com.quickbite.service;

import com.quickbite.entity.MenuItemEntity;
import com.quickbite.repository.MenuItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MenuService {
    private final MenuItemRepository repo;
    public MenuService(MenuItemRepository repo){ this.repo = repo; }

    public List<MenuItemEntity> listPublished(Long restId){ return repo.findByRestaurantIdAndPublishedTrue(restId); }
    public List<MenuItemEntity> listAll(Long restId){ return repo.findByRestaurantId(restId); }
    public MenuItemEntity create(MenuItemEntity e){ return repo.save(e); }
    public MenuItemEntity update(MenuItemEntity e){ return repo.save(e); }
    public void delete(Long id){ repo.deleteById(id); }
    public Optional<MenuItemEntity> findById(Long id){ return repo.findById(id); }
}
