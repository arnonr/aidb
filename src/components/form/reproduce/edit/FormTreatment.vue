<template>
    <div class="mb-5">
        <h1 class="text-xl mb-2 font-light">การรักษา</h1>
        <p class="p-0 m-0 text-500">ป้อนรายละเอียดการรักษา</p>
    </div>
    <form class="grid">
        <div class="col-12 lg:col-12">
            <div class="formgrid grid">

                <div class="field col-12 sm:col-12">
                    <h5>วิธีการรักษา</h5>
                    <div class="field-checkbox">
                        <Checkbox id="city1" name="city" value="0" v-model="treatment" />
                        <label for="city1" class="pr-5">ฮอร์โมน</label>
                        <Checkbox id="city2" name="city" value="1" v-model="treatment" />
                        <label for="city2" class="pr-5">ยาปฏิชีวนะ</label>
                        <Checkbox id="city3" name="city" value="2" v-model="treatment" />
                        <label for="city3" class="pr-5">วิตามินบำรุง</label>
                        <Checkbox id="city4" name="city" value="3" v-model="treatment" />
                        <label for="city4" class="pr-5">ชะล้างมดลูก</label>
                    </div>
                </div>
                <label for="selectedUnit" class="block text-600 text-sm font-bold mb-2">
                    อื่น ๆ ระบุ</label>
                 <InputText type="text" class="w-full"  />

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
                pageIndex:5,
            });
        }; const prevPage = () => {
            emit('prev-page', { pageIndex: 3 });
        }
        const firstdate = ref();
        const lastdate = ref();
        const checkdate = ref();
        const treatment = ref();
        return {
            prevPage,
            nextPage,
            firstdate,
            lastdate,
            checkdate,
            treatment,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
