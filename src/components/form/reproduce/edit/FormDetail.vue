<template>
    <div class="mb-5">
        <h1 class="text-xl mb-2 font-light">ประวัติทั่วไป</h1>
        <p class="p-0 m-0 text-500">ป้อนรายละเอียดประวัติทั่วไป</p>
    </div>
    <form class="grid">
        <div class="col-12 lg:col-12">
            <div class="formgrid grid">
                <div class="field col-12 sm:col-6">
                    <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
                        วันที่ตรวจ</label>
                    <Calendar class="w-full" id="dateRange" v-model="checkdate" :manualInput="false"
                        placeholder="" :showIcon="true"/>
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        คะแนนความสมบูรณ์ร่างกาย</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
                        วันที่เป็นสัดครั้งแรก</label>
                    <Calendar class="w-full" id="dateRange" v-model="firstdate" :manualInput="false"
                        placeholder="" :showIcon="true"/>
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        อาการเป็นสัด</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        ลักษณะเมือก</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2"> ระบุ</label>
                    <InputText type="text" class="w-full" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="dateRange" class="block text-600 text-sm font-bold mb-2">
                        วันที่เป็นสัดครั้งล่าสุด</label>
                    <Calendar class="w-full" id="dateRange" v-model="lastdate" :manualInput="false"
                        placeholder="" :showIcon="true"/>
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        อาการเป็นสัด</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        ลักษณะเมือก</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2"> ระบุ</label>
                    <InputText type="text" class="w-full" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                        วงรอบการเป็นสัด</label>
                    <Dropdown class="w-full" id="selectedUnit" />
                </div>
                <div class="field col-12 sm:col-6">
                    <label class="block text-600 text-sm font-bold mb-2">อาการผิดปกติที่เกษตรกรพบ</label>
                    <InputText type="text" class="w-full" />
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
                pageIndex: 2,
            });
        }; const prevPage = () => {
            emit('prev-page', { pageIndex: 0 });
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
