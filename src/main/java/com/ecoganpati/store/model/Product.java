package com.ecoganpati.store.model;

import java.util.List;

public class Product {
    private int id;
    private String name;
    private String description;
    private String image;
    private List<ProductSize> sizes;

    // Constructors
    public Product() {}

    public Product(int id, String name, String description, String image, List<ProductSize> sizes) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.sizes = sizes;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public List<ProductSize> getSizes() { return sizes; }
    public void setSizes(List<ProductSize> sizes) { this.sizes = sizes; }
}
