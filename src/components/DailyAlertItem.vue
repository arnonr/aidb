<template>
    <router-link to="/activity/daily-alert/show">
        <div class="list-alert grid align-items-center pl-2 xl:pl-8 pr-2 md:pr-3 py-3 border-round-3xl">
            <div class="col-12 sm:col-8">
                <div class="flex justify-content-start align-items-center">
                    <img class="max-w-5rem" :src="image">
                    <div>
                        <h4 class="mb-0 ml-3 text-indigo-800 text-xl md:text-2xl font-medium line-height-3">{{ title }}
                        </h4>
                    </div>
                </div>
            </div>
            <div class="col-12 sm:col-4">
                <div class="flex justify-content-between align-items-center">
                    <span class="text-base text-indigo-800">
                        <Tag :value="alert" icon="pi pi-bell pr-1" class="bg-red-50 text-red-500 font-bold text-base">
                        </Tag>
                        <span class="inline ml-2 text-sm">การแจ้งเตือน</span>
                    </span>
                    <Button icon="pi pi-eye" class="p-button-rounded p-button-text p-button-sm" />
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        alert: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.list-alert {
    transition: all .3s;

    &:hover {
        background-color: rgba($color: #dadafc, $alpha: 0.2);
    }

    &:active,
    &:focus {
        background-color: rgba($color: #dadafc, $alpha: 0.3);
        transform: scale(0.99);
    }
}
</style>