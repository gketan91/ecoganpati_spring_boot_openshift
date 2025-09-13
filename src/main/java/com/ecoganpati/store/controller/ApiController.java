package com.ecoganpati.store.controller;

import com.ecoganpati.store.model.CartItem;
import com.ecoganpati.store.model.Product;
import com.ecoganpati.store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/cart")
    public ResponseEntity<Map<String, String>> addToCart(@RequestBody CartItem cartItem) {
        // In a real application, you would store this in a database or session
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Item added to cart");
        return ResponseEntity.ok(response);
    }
}
