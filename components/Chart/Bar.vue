<template>
    <div v-if="chartStatus">
        <Bar
        id="my-chart-id"
        ref="chartRef"      
        :options="chartOptions"
        :data="chartData"
        />
    </div>

</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { ref, toRefs, onMounted, defineProps, defineEmits } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    props: ['chartData'], // 추가된 부분
    data() {
        return {
            chartStatus: true,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        display: true,
                    },
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true
                    },
                    animation: {
                        duration: 500,
                    }
                },
            }
        }
    },
    watch: {
        chartData: {
            deep: true,// 객체 안의 프로퍼티까지 감지
            handler(newVal, oldVal) {
                this.chartStatus = false
                setTimeout(() => {
                    this.chartStatus = true
                }, 200);
                // this.$refs.chartRef.chart.update()
                // this.$data._chart.update();
                // console.log('chartData changed:', newVal);
                // 여기에서 원하는 동작 수행
            },
        }
    }, 
}
</script>