<template>
    <div class="mb-5">
        <h1 class="text-xl mb-2 font-light">สรุปผลการตรวจวินิจฉัย</h1>
        <p class="p-0 m-0 text-500">ป้อนรายละเอียดสรุปผลการตรวจวินิจฉัย</p>
    </div>
    <form class="grid">
        <div class="col-12 lg:col-12">
            <div class="formgrid grid">
                <div class="field col-12 sm:col-12">
                    <div class="field-radiobutton">
                        <RadioButton id="city1" name="city" value="Chicago" v-model="check" />
                        <label for="city1">การผสมซ้ำ</label>
                        <div class="pl-8">
                            <RadioButton id="city1" name="city" value="Chicago" v-model="check" />
                            <label for="city1">ไม่เป็นสัด</label>
                        </div>
                    </div>
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        มดลูก/ช่องคลอด*</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        มดลูก/ช่องคลอด*</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        รังไข่</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        รังไข่</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        อื่นๆ</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        อื่นๆ</label>
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
                pageIndex: 3,
            });
        }; const prevPage = () => {
            emit('prev-page', { pageIndex: 1 });
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
