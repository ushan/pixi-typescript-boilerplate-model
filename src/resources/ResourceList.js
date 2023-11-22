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

/* ResourceList.SND_CAUTCH = `./assets/sound/move.mp3`;
ResourceList.SND_FAIL = `./assets/sound/match.wav`;
ResourceList.SND_SCORE = `./assets/sound/paint.wav`; */


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
/*     ResourceList.SND_CAUTCH,
    ResourceList.SND_FAIL,
    ResourceList.SND_SCORE, */
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
