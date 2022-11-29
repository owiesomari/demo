export class CacheManager {

    private static instance: CacheManager;
     isAdmin: Boolean = false;
     isLogin = false;

    private constructor() { }

    public static getInstance(): CacheManager {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }

        return CacheManager.instance;
    }
}