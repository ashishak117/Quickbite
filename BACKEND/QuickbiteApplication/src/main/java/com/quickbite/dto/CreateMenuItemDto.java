package com.quickbite.dto;
public class CreateMenuItemDto {
    private String name;
    private Double price;
    private Boolean veg;
    private String image;
    private Boolean published;
    public CreateMenuItemDto(){}
    public String getName(){return name;} public void setName(String n){name=n;}
    public Double getPrice(){return price;} public void setPrice(Double p){price=p;}
    public Boolean getVeg(){return veg;} public void setVeg(Boolean v){veg=v;}
    public String getImage(){return image;} public void setImage(String i){image=i;}
    public Boolean getPublished(){return published;} public void setPublished(Boolean p){published=p;}
}
