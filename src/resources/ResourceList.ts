class ResourceList {
    static BG = `../assets/bg.jpg`;
    static CARD = `../assets/card.png`;
    static YOUTUBE = `../assets/youtube.png`;
    static LOGO = `../assets/logo.png`;


    static CUSTOM_RESOURCES: string[] = [];

    static LIST: string[] = [
        ResourceList.BG,
        ResourceList.CARD,
        ResourceList.YOUTUBE,
        ...ResourceList.CUSTOM_RESOURCES,
    ];
}

export default ResourceList;