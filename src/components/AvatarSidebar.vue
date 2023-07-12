<template>
    <div class="avatar-sidebar mb-6">
        <div class="flex align-items-center ">
            <Avatar :image="user.Staff.StaffImage" class="mr-3 relative z-1" size="xlarge" shape="circle" />
            <div class="avatar-sidebar__content">
                <h4 class="mb-1 text-xl font-normal line-height-1">{{ full_name }}</h4>
                <span class="text-sm font-light">{{ user.Staff.StaffEmail }}</span>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters({
            user: "user"
        }),
        full_name() {
            return `${this.user.Staff.StaffGivenName} ${this.user.Staff.StaffSurname}`
        }
    },
}
</script>
