class ResourceList {
    static BG = `./assets/bg.jpg`;
    static CARD = `./assets/card.png`;
    static RAPTOR_ANIM = `./assets/raptor/raptor-pro.json`;
    static EXPLOSION_ANIM = `./assets/explosion/ExplosionAnim.json`;

    static CUSTOM_RESOURCES: string[] = [];

    static LIST: string[] = [
        ResourceList.BG,
        ResourceList.CARD,
        ResourceList.EXPLOSION_ANIM,
        ...ResourceList.CUSTOM_RESOURCES,
    ];
}

export default ResourceList;