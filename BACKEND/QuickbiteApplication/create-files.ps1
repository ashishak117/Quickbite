$structure = @(

    "src/main/java/com/quickbite/config/SecurityConfig.java",
    "src/main/java/com/quickbite/config/JwtAuthFilter.java",
    "src/main/java/com/quickbite/controller/AuthController.java",
    "src/main/java/com/quickbite/controller/RestaurantController.java",
    "src/main/java/com/quickbite/controller/MenuController.java",
    "src/main/java/com/quickbite/controller/OrderController.java",
    "src/main/java/com/quickbite/controller/AdminController.java",
    "src/main/java/com/quickbite/dto/AuthRequest.java",
    "src/main/java/com/quickbite/dto/AuthResponse.java",
    "src/main/java/com/quickbite/dto/RegisterUserDto.java",
    "src/main/java/com/quickbite/dto/CreateRestaurantDto.java",
    "src/main/java/com/quickbite/dto/CreateMenuItemDto.java",
    "src/main/java/com/quickbite/dto/PlaceOrderDto.java",
    "src/main/java/com/quickbite/entity/UserEntity.java",
    "src/main/java/com/quickbite/entity/RestaurantEntity.java",
    "src/main/java/com/quickbite/entity/MenuItemEntity.java",
    "src/main/java/com/quickbite/entity/OrderEntity.java",
    "src/main/java/com/quickbite/entity/OrderItemEntity.java",
    "src/main/java/com/quickbite/model/User.java",
    "src/main/java/com/quickbite/model/Restaurant.java",
    "src/main/java/com/quickbite/model/MenuItem.java",
    "src/main/java/com/quickbite/model/Order.java",
    "src/main/java/com/quickbite/repository/UserRepository.java",
    "src/main/java/com/quickbite/repository/RestaurantRepository.java",
    "src/main/java/com/quickbite/repository/MenuItemRepository.java",
    "src/main/java/com/quickbite/repository/OrderRepository.java",
    "src/main/java/com/quickbite/service/JwtService.java",
    "src/main/java/com/quickbite/service/AuthService.java",
    "src/main/java/com/quickbite/service/RestaurantService.java",
    "src/main/java/com/quickbite/service/MenuService.java",
    "src/main/java/com/quickbite/service/OrderService.java",
    "src/main/java/com/quickbite/util/Mapper.java",

    "src/main/resources/data.sql",
    "src/main/resources/schema.sql"

)

foreach ($path in $structure) {
    $folder = Split-Path $path
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
    }
    if (!(Test-Path $path)) {
        New-Item -ItemType File -Path $path -Force | Out-Null
    }
}

Write-Host "All folders and files have been created!"
