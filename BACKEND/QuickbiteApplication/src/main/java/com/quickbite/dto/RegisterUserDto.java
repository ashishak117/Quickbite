package com.quickbite.dto;
public class RegisterUserDto {
    private String name,email,password,phone,address,role;
    public RegisterUserDto(){}
    public String getName(){return name;} public void setName(String n){name=n;}
    public String getEmail(){return email;} public void setEmail(String e){email=e;}
    public String getPassword(){return password;} public void setPassword(String p){password=p;}
    public String getPhone(){return phone;} public void setPhone(String ph){phone=ph;}
    public String getAddress(){return address;} public void setAddress(String a){address=a;}
    public String getRole(){return role;} public void setRole(String r){role=r;}
}
