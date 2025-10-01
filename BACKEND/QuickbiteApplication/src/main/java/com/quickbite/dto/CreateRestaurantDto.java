package com.quickbite.dto;
public class CreateRestaurantDto {
    private String name, about, address, email, phone, image;
    private Long ownerId;
    public CreateRestaurantDto(){}
    public String getName(){return name;} public void setName(String n){name=n;}
    public String getAbout(){return about;} public void setAbout(String a){about=a;}
    public String getAddress(){return address;} public void setAddress(String a){address=a;}
    public String getEmail(){return email;} public void setEmail(String e){email=e;}
    public String getPhone(){return phone;} public void setPhone(String p){phone=p;}
    public String getImage(){return image;} public void setImage(String i){image=i;}
    public Long getOwnerId(){return ownerId;} public void setOwnerId(Long o){ownerId=o;}
}
