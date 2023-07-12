<template>
    <div class="mb-5">
        <h1 class="text-xl mb-2 font-light">สาเหตุโน้มนำ</h1>
        <p class="p-0 m-0 text-500">ป้อนรายละเอียดสาเหตุโน้มนำ</p>
    </div>
    <form class="grid">
        <div class="col-12 lg:col-12">
            <div class="formgrid grid">
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        แม่โค</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        สิ่งแวดล้อม</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        การเลี้ยงและการจัดการ</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        สุขภาพ</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
            </div>
        </div>
        <div class="col-12 text-right mt-5 flex justify-content-between">
            <Button label="ย้อนกลับ" @click="prevPage()" icon="pi pi-angle-left"
                class="p-button-outlined p-button-secondary" />
            <Button label="ต่อไป" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
        </div>
    </form>
</template>

<script>
import { ref } from "vue";
export default {
    emits: ["next-page", "prev-page"],
    setup(_, { emit }) {
        const nextPage = () => {
            emit("next-page", {
                pageIndex: 4,
            });
        }; const prevPage = () => {
            emit('prev-page', { pageIndex: 2 });
        }
        const firstdate = ref();
        const lastdate = ref();
        const checkdate = ref();

        return {
            prevPage,
            nextPage,
            firstdate,
            lastdate,
            checkdate,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
