package com.ecoganpati.store.service;

import com.ecoganpati.store.model.Product;
import com.ecoganpati.store.model.ProductSize;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductService {

    private final List<Product> products;

    public ProductService() {
        this.products = initializeProducts();
    }

    public List<Product> getAllProducts() {
        return new ArrayList<>(products);
    }

    public Product getProductById(int id) {
        return products.stream()
                .filter(product -> product.getId() == id)
                .findFirst()
                .orElse(null);
    }

    private List<Product> initializeProducts() {
        List<Product> productList = new ArrayList<>();

        // Product 1: Classic Seated Ganpati
        List<ProductSize> sizes1 = Arrays.asList(
                new ProductSize("Small (6\")", 899),
                new ProductSize("Medium (10\")", 1599),
                new ProductSize("Large (14\")", 2899)
        );
        productList.add(new Product(1, "Classic Seated Ganpati - Eco Edition",
                "Handcrafted from natural grass fibers and lime plaster. Traditional seated pose with intricate details. 100% biodegradable.",
                "4927287a-b2b7-4d46-9118-3d25cc8c5c6e", sizes1));

        // Product 2: Majestic Standing Ganpati
        List<ProductSize> sizes2 = Arrays.asList(
                new ProductSize("Small (8\")", 1199),
                new ProductSize("Medium (12\")", 2199),
                new ProductSize("Large (16\")", 3899)
        );
        productList.add(new Product(2, "Majestic Standing Ganpati",
                "Elegant standing pose crafted from sustainable grass-based materials. Perfect for home temples and offices.",
                "ef53c80c-92b4-4dfc-95bb-3a2040262ebe", sizes2));

        // Product 3: Divine Dancing Ganpati
        List<ProductSize> sizes3 = Arrays.asList(
                new ProductSize("Small (7\")", 1399),
                new ProductSize("Medium (11\")", 2599),
                new ProductSize("Large (15\")", 4299)
        );
        productList.add(new Product(3, "Divine Dancing Ganpati",
                "Dynamic dancing pose representing joy and celebration. Made from eco-friendly grass plaster with natural pigments.",
                "af79bbb3-0ba6-441a-8675-0149db3df535", sizes3));

        // Product 4: Lotus Bliss Ganpati
        List<ProductSize> sizes4 = Arrays.asList(
                new ProductSize("Small (5\")", 749),
                new ProductSize("Medium (8\")", 1399),
                new ProductSize("Large (12\")", 2499)
        );
        productList.add(new Product(4, "Lotus Bliss Ganpati",
                "Serene Ganpati on lotus base. Compact design perfect for small spaces. Completely biodegradable after festivals.",
                "ab4ce778-be52-44c0-b148-9d35366a051b", sizes4));

        return productList;
    }
}
