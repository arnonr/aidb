<template>
    <div class="mb-5">
        <h1 class="text-xl mb-2 font-light">คำแนะนำ</h1>
        <p class="p-0 m-0 text-500">ป้อนรายละเอียดคำแนะนำ</p>
    </div>
    <form class="grid">
        <div class="col-12 lg:col-12">
            <div class="formgrid grid">

                <div class="field col-12 sm:col-12">
                    <div class="field-radiobutton">
                        <RadioButton id="city1" name="city" value="Chicago" v-model="check" />
                        <label for="city1">ตัดทิ้ง</label>
                        <div class="pl-8">
                            <RadioButton id="city1" name="city" value="Chicago" v-model="check" />
                            <label for="city1">ไม่เป็นสัด</label>
                        </div>
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
            <Button label="บันทึก" @click="save()" icon="pi pi-save"
                class="p-button-outlined p-button-secondary" />
            
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
                pageIndex:0,
            });
        }; const prevPage = () => {
            emit('prev-page', { pageIndex: 4 });
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
    methods: {
        save() {
            console.log("save");
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
