<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { getRecommendationAPI, getRouteAPI } from '../../api/routes'
import { computed, onMounted, reactive, ref } from 'vue'
import type { Route } from '../../model/routes.ts'
import { IconSchedule, IconCompass, IconBulb, IconLeft, IconLocation } from '@arco-design/web-vue/es/icon'
import InfoListItem from './info-list-item.vue'

const route = useRoute()
const router = useRouter()

const route_id = route.params.route_id

const route_info = reactive({
  locations: []
} as Route)

const recommendations = reactive<Route[]>([])

const route_more_info = computed(() => {
  const activities = new Set()
  const locations = new Set()
  let totalDuration = 0

  for (const location of route_info.locations) {
    locations.add(location.name)
    totalDuration += location.duration

    for (const activity of location.activities) {
      activities.add(activity.name)
    }
  }

  if (totalDuration > 24 * 60) {
    totalDuration = 0
  }

  return {
    locations: Array.from(locations),
    activities: Array.from(activities),
    totalDuration
  }
})

const durationString = (m) => {
  const hour = Math.floor(m / 60)
  const minute = m % 60

  return (hour ? `${hour} 小时 ` : '') + (minute ? `${minute} 分钟` : '')
}

const loading = ref(false)

onMounted(async () => {
  loading.value = true

  try {
    const getRouteResp = await getRouteAPI(route_id)
    console.log(getRouteResp)

    const getRecommendResp = await getRecommendationAPI(route_id)
    console.log(getRecommendResp)

    Object.assign(route_info, getRouteResp.data)
    for (const item of getRecommendResp.data) {
      if (item.city === route_info.city) {
        recommendations.push(item)
      }
    }
    for (const item of getRecommendResp.data) {
      if (item.city !== route_info.city) {
        recommendations.push(item)
      }
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <a-spin :loading="loading" class="h-screen w-full">
    <div class="flex flex-col gap-8">
      <div
        class="text-gray-400 cursor-pointer hover:text-blue-700"
        @click="router.back()"
      >
        <icon-left />
        返回上一页
      </div>
      <div class="bg-gray-100 px-4 py-5 flex items-center">
        <div class="flex-1">
          <div class="text-[16px] font-medium pt-2 pb-4">行程概要</div>
          <div class="flex flex-col gap-2 pl-2">
            <info-list-item label="城市" :value="route_info.city" />
            <info-list-item label="总耗时" :value="`共 ${durationString(route_more_info.totalDuration)}`"
                            v-show="route_more_info.totalDuration" />
            <info-list-item label="游玩景点"
                            :value="`共 ${route_info.locations?.length} 个，${route_more_info.locations.slice(0, 4).join('、') } ${route_more_info.locations.length > 4 ? '等' : ''}`" />
            <info-list-item label="游玩项目"
                            :value="`${route_more_info.activities.slice(0, 4).join(' | ')} ${route_more_info.activities.length > 4 ? ' | ...' : ''}`"
                            v-show="route_info.total_duration" />
          </div>
        </div>
        <div class="max-h-40 flex justify-end">
          <a-image :src="route_info.cover?.url" height="160px" />
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <div>
          <div class="text-xl pb-8">{{ route_info.title }}</div>
          <a-steps direction="vertical" changeable>
            <a-step
              v-for="location of route_info.locations"
            >
              {{ location.name }}
              <template #description>
                <div class="flex flex-col gap-1 pb-4 text-sm text-gray-400">
                  <div>
                    <div v-for="trans of location.transportation">
                      <icon-compass />
                      {{ trans.mode }} {{ trans.duration }} 分钟
                    </div>
                  </div>
                  <div v-show="route_more_info.totalDuration && location.duration && location.duration <= 180">
                    <icon-schedule />
                    游玩时长 {{ durationString(location.duration) }}
                  </div>
                  <div
                    class="flex flex-col gap-1 text-gray-500"
                    v-show="location.activities?.length"
                  >
                    <div class="text-gray-600">
                      <icon-bulb />
                      游玩项目：
                    </div>
                    <div
                      v-for="activitie of location.activities"
                      class="flex gap-2 pl-1 items-center"
                    >
                      <div class="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                      {{ activitie.name }}: {{ activitie.description }}
                    </div>
                  </div>
                  <div class="text-gray-700">
                    {{ location.description }}
                  </div>
                </div>
              </template>
            </a-step>
          </a-steps>
        </div>
        <div class="w-80">
          <div class="border p-4 flex flex-col gap-3">
            <div class="text-lg">相关推荐</div>
            <a
              v-for="(recommendation, idx) in recommendations.slice(0, 10)"
              class="cursor-pointer hover:text-blue-700"
              :href="`/route/${recommendation.id}`"
            >
              <div class="pb-1 pr-2 flex items-center gap-2">
                <span>{{ Number(idx) + 1 }}.</span>
                <span class="truncate">{{ recommendation.title }}</span>
                <span class="text-gray-700 text-xs whitespace-nowrap"><icon-location /> {{ recommendation.city }}</span>
              </div>
              <div class="text-gray-500 text-xs truncate">
                {{ recommendation.summary }}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<style scoped>

</style>