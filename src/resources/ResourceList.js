class ResourceList {
}
ResourceList.BG = `./assets/bg.jpg`;
ResourceList.LOGO = `./assets/logo.png`;
ResourceList.CART = `./assets/cart.png`;
ResourceList.CART_OVER = `./assets/cart-over.png`;
ResourceList.GOOD_1 = `./assets/good_1.png`;
ResourceList.GOOD_2 = `./assets/good_2.png`;
ResourceList.GOOD_3 = `./assets/good_3.png`;
ResourceList.GOOD_4 = `./assets/good_4.png`;
ResourceList.GOOD_5 = `./assets/good_5.png`;
ResourceList.CUSTOM_RESOURCES = [];

ResourceList.LIST = [
    ResourceList.BG,
    ResourceList.CART,
    ResourceList.CART_OVER,
    ResourceList.GOOD_1,
    ResourceList.GOOD_2,
    ResourceList.GOOD_3,
    ResourceList.GOOD_4,
    ResourceList.GOOD_5,
    ...ResourceList.CUSTOM_RESOURCES,
];

ResourceList.GOODS_LIST = [
    ResourceList.GOOD_1,
    ResourceList.GOOD_2,
    ResourceList.GOOD_3,
    ResourceList.GOOD_4,
    ResourceList.GOOD_5
];
export default ResourceList;