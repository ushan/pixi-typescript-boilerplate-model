class ResourceList {
    static BG = `./assets/bg.jpg`;
    static CARD = `./assets/card.png`;
    static YOUTUBE = `./assets/youtube.png`;
    static LOGO = `./assets/logo.png`;
    static CART = `./assets/cart.png`;
    static GOOD_1 = `./assets/good_1.png`;
    static GOOD_2 = `./assets/good_2.png`;
    static GOOD_3 = `./assets/good_3.png`;
    static GOOD_4 = `./assets/good_4.png`;
    static GOOD_5 = `./assets/good_5.png`;


    static CUSTOM_RESOURCES: string[] = [];

    static LIST: string[] = [
        ResourceList.BG,
        ResourceList.CARD,
        ResourceList.CART,
        ResourceList.GOOD_1,
        ResourceList.GOOD_2,
        ResourceList.GOOD_3,
        ResourceList.GOOD_4,
        ResourceList.GOOD_5,
        ...ResourceList.CUSTOM_RESOURCES,
    ];

    static GOODS_LIST: string[] = [
        ResourceList.GOOD_1,
        ResourceList.GOOD_2,
        ResourceList.GOOD_3,
        ResourceList.GOOD_4,
        ResourceList.GOOD_5
    ];
}

export default ResourceList;