package com.ecoganpati.store.model;

public class CartItem {
    private long id;
    private int productId;
    private String name;
    private String size;
    private int price;
    private String image;
    private int quantity;

    // Constructors
    public CartItem() {}

    public CartItem(long id, int productId, String name, String size, int price, String image, int quantity) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.size = size;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
    }

    // Getters and Setters
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
