<script setup lang="ts">
import { searchAPI } from '../../api/routes'
import { onMounted, reactive } from 'vue'
import type { Route } from '../../model/routes.ts'
import { IconLocation, IconHeart, IconArrowRight } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'
import { useHomeStore } from '../../store/home.ts'

const cities = ['北京', '上海', '广州', '深圳', '成都', '杭州', '茂名', '佛山']
const routes: Route[] = []
const router = useRouter()
const homeStore = useHomeStore()

const searchRoute = async (reset?: boolean = false) => {
  if (reset) {
    homeStore.searchCfg.page = 1
  }

  homeStore.searchCfg.loading = true

  try {
    const resp = await searchAPI({
      keyword: homeStore.searchCfg.keyword,
      city: homeStore.searchCfg.city,
      page: homeStore.searchCfg.page,
      page_size: homeStore.searchCfg.pageSize
    })

    console.log(resp)

    routes.splice(0)
    routes.push(...resp.data)
    homeStore.searchCfg.total = resp.total

    console.log(routes)
  } finally {
    homeStore.searchCfg.loading = false
  }
}

onMounted(() => {
  searchRoute()
})
</script>

<template>
  <a-spin class="h-screen w-full" :loading="homeStore.searchCfg.loading">
    <div class="flex justify-between">
      <div class="text-3xl px-4 pt-2 pb-10 font-medium">CityWalk 指南</div>
      <div>
        <div class="p-2 border rounded-md flex gap-2">
          <a-select
            style="width: 160px"
            placeholder="城市"
            allow-search
            allow-create
            v-model="homeStore.searchCfg.city"
            @change="searchRoute(true)"
          >
            <a-option v-for="city of cities" :value="city">{{ city }}</a-option>
          </a-select>
          <a-input-search
            style="width: 320px"
            placeholder="搜索"
            allow-clear
            v-model="homeStore.searchCfg.keyword"
            @input="searchRoute(true)"
            @clear="searchRoute(true)"
            @search="searchRoute(true)"
          />
        </div>
      </div>
    </div>
    <a-list
      class="list-demo-action-layout flex-1 overflow-y-auto"
      :bordered="false"
      :pagination-props="{
          defaultPageSize: homeStore.searchCfg.pageSize,
          total: homeStore.searchCfg.total
        }"
      @page-change="page => {homeStore.searchCfg.page = page; searchRoute()}"
      @page-size-change=" pageSize => {homeStore.searchCfg.pageSize = pageSize; searchRoute()}"
    >
      <a-list-item
        v-for="route in routes"
        action-layout="vertical"
      >
        <div class="flex flex-col gap-2">
          <div class="font-medium text-[16px] pb-1" @click="router.push(`/route/${route.id}`)">{{ route.title }}</div>
          <div class="flex gap-1">
            <div
              v-for="location of route.locations.slice(0, 3)"
              class="bg-gray-100 text-xs px-1 py-0.5"
            >
              {{ location.name }}
            </div>
            <div class="text-sm">
              <icon-arrow-right />
            </div>
            <div
              class="bg-gray-100 text-xs px-1 py-0.5"
            >
              {{ route.locations[route.locations.length - 1]?.name || '' }}
            </div>
          </div>
          <div>{{ route.summary }}</div>
          <div class="text-gray-500 text-xs">PS: {{ route.notes }}</div>
          <div class="flex gap-3 pt-4 text-gray-600 text-xs">
            <span><icon-location /> {{ route.city }}</span>
            <span><icon-heart /> {{ route.liked_count }}</span>
            <div>{{ route.published_at }}</div>
          </div>
        </div>
        <template #extra>
          <div class="flex items-center h-full">
            <img alt="arco-design" class="max-h-32 max-w-32" :src="route.cover.url" />
          </div>
        </template>
      </a-list-item>
    </a-list>
  </a-spin>
</template>

<style scoped>

</style>