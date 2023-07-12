<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >จำนวนสัตว์ทั้งหมด</span
            >
            <div class="text-900 font-medium text-xl">6,300 ตัว</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <!-- <i class="pi pi-shopping-cart text-blue-500 text-xl"></i> -->
            <i class="pi pi-chart-line text-blue-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0" style="background-color: #593e25">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-blue-50 font-medium mb-3">โคเนื้อ</span>
            <div class="text-blue-50 font-medium text-xl">2,100 ตัว</div>
          </div>
          <div
            class="flex align-items-center justify-content-center"
            style="width: 2.5rem; height: 2.5rem"
          >
            <!-- <i class="pi pi-map-marker text-orange-500 text-xl"></i> -->
            <img src="../../assets/images/logo/cow.png" alt="cow logo" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0" style="background-color: #267365">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-blue-50 font-medium mb-3">แพะ</span>
            <div class="text-blue-50 font-medium text-xl">2,100 ตัว</div>
          </div>
          <div
            class="flex align-items-center justify-content-center"
            style="width: 2.5rem; height: 2.5rem"
          >
            <!-- <i class="pi pi-map-marker text-orange-500 text-xl"></i> -->
            <img src="../../assets/images/logo/goat.png" alt="goat logo" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0" style="background-color: #f2e3d5">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-gray-900 font-medium mb-3">กระบือ</span>
            <div class="text-gray-900 font-medium text-xl">2,100 ตัว</div>
          </div>
          <div
            class="flex align-items-center justify-content-center"
            style="width: 2.5rem; height: 2.5rem"
          >
            <!-- <i class="pi pi-map-marker text-orange-500 text-xl"></i> -->
            <img
              src="../../assets/images/logo/buffalo.png"
              alt="buffalo logo"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>ข้อมูลทั้งหมด 6 ฟาร์ม</h5>
        <DataTable
          :value="data"
          :rows="10"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <Column
            field="no"
            header="ลำดับ"
            :sortable="true"
            class="text-center"
            style="width: 35%"
          >
          </Column>
          <Column
            field="name"
            header="ชื่อฟาร์ม"
            :sortable="true"
            class="text-center"
            style="width: 35%"
          >
          </Column>
          <Column
            field="qty"
            header="จำนวนสัตว์"
            :sortable="true"
            class="text-center"
            style="width: 35%"
          >
          </Column>
          <Column style="width: 15%" class="text-center">
            <template #header> View </template>
            <template #body>
              <Button
                icon="pi pi-search"
                type="button"
                class="p-button-text"
              ></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="grid col-12 xl:col-6">
      <div class="col-12 xl:col-6">
        <div class="card">
          <h5>จำนวนโคเนื้อ</h5>
          <Chart
            type="pie"
            :data="pieData1"
            :options="pieOptions"
            style="width: 100%"
          />
        </div>
      </div>

      <div class="col-12 xl:col-6">
        <div class="card">
          <h5>จำนวนกระบือ</h5>
          <Chart
            type="pie"
            :data="pieData2"
            :options="pieOptions"
            style="width: 100%"
          />
        </div>
      </div>
      <div class="col-12 xl:col-6">
        <div class="card">
          <h5>จำนวนแพะ</h5>
          <Chart
            type="pie"
            :data="pieData3"
            :options="pieOptions"
            style="width: 100%"
          />
        </div>
      </div>
      <!-- <div class="col-12 xl:col-12">
        <div class="card grid">
          <div class="col-12 xl:col-6">
            <h5>จำนวนสัตว์แพะ</h5>
            <Chart
              type="pie"
              :data="pieData3"
              :options="pieOptions"
              style="width: 100%"
            />
          </div>
          <div class="col-12 xl:col-6 p-8">
            <p class="text-xl">
              การตั้งท้อง <span class="mx-5">10</span> ครั้ง
            </p>
            <p class="text-xl">การแท้ง <span class="mx-5">2</span>ครั้ง</p>
            <p class="text-xl">คลอดลูกสําเร็จ <span class="mx-5">80%</span></p>
          </div>
        </div>
      </div> -->
    </div>

    <!-- <div class="col-12 xl:col-6 mt-2"> -->
    <!-- <div class="grid"> -->
    <!-- <div class="card grid">
                <div class="col-12 md:col-6 xl:col-6">
                    <h5>สรุปร้อยละการแท้ง </h5>
                    <Chart type="pie" :data="pieData1" :options="pieOptions" style="width: 80%" />
                </div>
                <div class="col-12 xl:col-6">
                    <h5>สรุปร้อยละการคลอด</h5>
                    <Chart type="pie" :data="pieData2" :options="pieOptions" style="width: 80%" />
                </div>

            </div> -->
    <!-- <div class="card col-12 xl:col-6 md:col-6">

                </div> -->
    <!-- <div class="card  col-12 xl:col-12 mx-2">
                    <h5>สรุปร้อยละการคลอด</h5>
                    <Chart type="pie" :data="pieData2" :options="pieOptions" style="width: 100%" />
                    <div>
                        <h5> การตั้งท้อง 10 ครั้ง</h5>
                        <h5> การแท้ง 2 ครั้ง</h5>
                        <h5> คลอดลูกสําเร็จ 80%</h5>
                    </div>


                </div> -->
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>
<!-- <div class="grid p-fluid">
        <div class="col-12 lg:col-3">
            <div class="card grid">
                <div class="col">
                    <h5>จำนวนสัตว์ทั้งหมด</h5>
                    <h2>2565 ตัว</h2>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-3">
            <div class="card grid" style="background-color: #267365;">
                <div class="col-2">
                    <img src="../../assets/images/logo/cow.png" alt="cow logo" />
                </div>
                <div class="col pl-3">
                    <h5> กระบือ </h5>
                    <h2>2565ตัว</h2>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-3">
            <div class="card grid" style="background-color: #593E25;">
                <div class="col-2">
                    <img src="../../assets/images/logo/buffalo.png" alt="buffalo logo" />
                </div>
                <div class="col pl-3">
                    <h5> กระบือ </h5>
                    <h2>2565ตัว</h2>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-3">
            <div class="card grid " style="background-color: #F2E3D5;">
                <div class="col-2">
                    <img src="../../assets/images/logo/goat.png" alt="goat logo" />
                </div>
                <div class="col pl-3">
                    <h5> แพะ </h5>
                    <h2>2565ตัว</h2>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6">
            <div class="card">
                <h5>Linear Chart</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
            </div>

            <div class="card flex flex-column align-items-center">
                <h5 class="align-self-start">Pie Chart</h5>
                <Chart type="pie" :data="pieData" :options="pieOptions" style="width: 50%" />
            </div>

            <div class="card  flex flex-column align-items-center">
                <h5 class="align-self-start">Polar Area Chart</h5>
                <Chart type="polarArea" :data="polarData" :options="polarOptions" style="width: 50%" />
            </div>
        </div>
    </div> -->
<script>
import { reactive } from "vue";

export default {
  themeChangeListener: null,
  setup() {
    const data = reactive([
      {
        no: "1",
        name: "โชคชัย 5",
        qty: "235",
      },
      {
        no: "2",
        name: "ใจดีฟาร์ม",
        qty: "165",
      },
      {
        no: "3",
        name: "โคมั่นคง",
        qty: "134",
      },
      {
        no: "4",
        name: "ยิ้มแย้ม",
        qty: "94",
      },
      {
        no: "5",
        name: "รุ่งอรุณฟาร์มแพะ",
        qty: "62",
      },
      {
        no: "6",
        name: "สดใสฟาร์ม",
        qty: "52",
      },
    ]);
    return {
      data,
    };
  },
  data() {
    return {
      pieData1: {
        labels: ["ตัวผู้", "ตัวเมีย"],
        datasets: [
          {
            data: [300, 100],
            backgroundColor: ["#FF6384", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#FFCE56"],
          },
        ],
      },
      pieData2: {
        labels: ["ตัวผู้", "ตัวเมีย"],
        datasets: [
          {
            data: [300, 500],
            backgroundColor: ["#FF6384", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#FFCE56"],
          },
        ],
      },
      pieData3: {
        labels: ["ตัวผู้", "ตัวเมีย"],
        datasets: [
          {
            data: [430, 435],
            backgroundColor: ["#FF6384", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#FFCE56"],
          },
        ],
      },
    };
  },
};
</script>
