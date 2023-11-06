class ResourceList {
    static BG = `./assets/bg.jpg`;
    static CARD = `./assets/card.png`;

    static CUSTOM_RESOURCES: string[] = [];

    static LIST: string[] = [
        ResourceList.BG,
        ResourceList.CARD,
        ...ResourceList.CUSTOM_RESOURCES,
    ];
}

export default ResourceList;