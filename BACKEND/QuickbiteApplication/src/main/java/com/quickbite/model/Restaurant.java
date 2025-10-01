package com.quickbite.model;

public class Restaurant {
    private Long id;
    private String name;
    private String about;
    private String address;
    private String email;
    private String phone;
    private String image;
    private Long ownerId;
    private Boolean approved;
    private String deniedMessage;

    public Restaurant() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }

    public Boolean getApproved() { return approved; }
    public void setApproved(Boolean approved) { this.approved = approved; }

    public String getDeniedMessage() { return deniedMessage; }
    public void setDeniedMessage(String deniedMessage) { this.deniedMessage = deniedMessage; }
}
