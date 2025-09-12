// src/mixins/DropdownMixin.js
import { mapState, mapActions } from "vuex";
import DropdownCacheService from "@/service/DropdownCacheService";

export default {
    data() {
        return {
            dropdownLoading: false,
        };
    },

    computed: {
        ...mapState(["dropdownCache"]),
    },

    methods: {
        ...mapActions(["fetchDropdownData"]),

        async loadOrganizationZones(forceRefresh = false) {
            this.dropdownLoading = true;
            try {
                const data = await DropdownCacheService.getOrganizationZones(
                    forceRefresh
                );
                return data;
            } finally {
                this.dropdownLoading = false;
            }
        },

        async loadOrganizations(params = {}) {
            this.dropdownLoading = true;
            try {
                const data = await DropdownCacheService.getOrganizations(
                    params
                );
                return data;
            } finally {
                this.dropdownLoading = false;
            }
        },

        async loadAIZones(forceRefresh = false) {
            this.dropdownLoading = true;
            try {
                const data = await DropdownCacheService.getAIZones(
                    forceRefresh
                );
                return data;
            } finally {
                this.dropdownLoading = false;
            }
        },

        async loadProvinces(params = {}) {
            this.dropdownLoading = true;
            try {
                const data = await DropdownCacheService.getProvinces(
                    params
                );
                return data;
            } finally {
                this.dropdownLoading = false;
            }
        },
    },
};
