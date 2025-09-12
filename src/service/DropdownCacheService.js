import axios from "axios";

class DropdownCacheService {
    constructor() {
        this.cache = new Map();
        this.cacheExpiry = 5 * 60 * 1000; // 5 นาที
    }

    async getOrganizationZones(forceRefresh = false) {
        const cacheKey = "organization-zones";

        if (!forceRefresh && this.isCacheValid(cacheKey)) {
            return this.cache.get(cacheKey).data;
        }

        try {
            const response = await axios.get(
                "/organization-zone/selection?includeAll=false&isActive=1"
            );
            this.setCache(cacheKey, response.data.rows);
            return response.data.rows;
        } catch (error) {
            console.error("Error fetching organization zones:", error);
            return [];
        }
    }

    async getOrganizations(params = {}) {
        const cacheKey = `organizations-${JSON.stringify(params)}`;

        if (this.isCacheValid(cacheKey)) {
            return this.cache.get(cacheKey).data;
        }

        try {
            const response = await axios.get("/organization/selection", {
                params,
            });
            this.setCache(cacheKey, response.data.rows);
            return response.data.rows;
        } catch (error) {
            console.error("Error fetching organizations:", error);
            return [];
        }
    }

    async getProvinces(params = {}) {
        const cacheKey = `provinces-${JSON.stringify(params)}`;

        if (this.isCacheValid(cacheKey)) {
            return this.cache.get(cacheKey).data;
        }

        try {
            const response = await axios.get("/province/selection", { params });
            this.setCache(cacheKey, response.data.rows);
            return response.data.rows;
        } catch (error) {
            console.error("Error fetching provinces:", error);
            return [];
        }
    }

    async getAIZones(forceRefresh = false) {
        const cacheKey = "ai-zones";

        if (!forceRefresh && this.isCacheValid(cacheKey)) {
            return this.cache.get(cacheKey).data;
        }

        try {
            const response = await axios.get(
                "/ai-zone/selection?includeAll=false"
            );
            this.setCache(cacheKey, response.data.rows);
            return response.data.rows;
        } catch (error) {
            console.error("Error fetching AI zones:", error);
            return [];
        }
    }

    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });
    }

    isCacheValid(key) {
        const cached = this.cache.get(key);
        if (!cached) return false;

        return Date.now() - cached.timestamp < this.cacheExpiry;
    }

    clearCache() {
        this.cache.clear();
    }

    // ฟังก์ชันสำหรับ refresh cache เมื่อข้อมูลเปลี่ยนแปลง
    invalidateCache(pattern) {
        for (const key of this.cache.keys()) {
            if (key.includes(pattern)) {
                this.cache.delete(key);
            }
        }
    }
}

export default new DropdownCacheService()