export class CacheManager {

    private static instance: CacheManager;
    static isAdmin: Boolean = false;

    private constructor() { }

    public static getInstance(): CacheManager {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }

        return CacheManager.instance;
    }
}