package com.quickbite.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // serve /uploads/** from the filesystem uploads/ directory (relative to app root)
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:./uploads/"); // <-- use ./uploads/ for clarity
    }
}
