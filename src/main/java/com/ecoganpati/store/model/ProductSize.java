package com.ecoganpati.store.model;

public class ProductSize {
    private String size;
    private int price;

    // Constructors
    public ProductSize() {}

    public ProductSize(String size, int price) {
        this.size = size;
        this.price = price;
    }

    // Getters and Setters
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
}
