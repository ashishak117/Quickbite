package com.quickbite.dto;
import java.util.List;
public class PlaceOrderDto {
    private Long restaurantId;
    private Long customerId;
    private Double totalAmount;
    private Double deliveryCharge;
    private String paymentMethod;
    private List<OrderItemDto> items;
    public static class OrderItemDto {
        private Long itemId;
        private String name;
        private Double price;
        private Integer qty;
        private Boolean veg;
        public OrderItemDto(){}
        public Long getItemId(){return itemId;} public void setItemId(Long i){itemId=i;}
        public String getName(){return name;} public void setName(String n){name=n;}
        public Double getPrice(){return price;} public void setPrice(Double p){price=p;}
        public Integer getQty(){return qty;} public void setQty(Integer q){qty=q;}
        public Boolean getVeg(){return veg;} public void setVeg(Boolean v){veg=v;}
    }
    public PlaceOrderDto(){}
    public Long getRestaurantId(){return restaurantId;} public void setRestaurantId(Long r){restaurantId=r;}
    public Long getCustomerId(){return customerId;} public void setCustomerId(Long c){customerId=c;}
    public Double getTotalAmount(){return totalAmount;} public void setTotalAmount(Double t){totalAmount=t;}
    public Double getDeliveryCharge(){return deliveryCharge;} public void setDeliveryCharge(Double d){deliveryCharge=d;}
    public String getPaymentMethod(){return paymentMethod;} public void setPaymentMethod(String p){paymentMethod=p;}
    public List<OrderItemDto> getItems(){return items;} public void setItems(List<OrderItemDto> i){items=i;}
}
