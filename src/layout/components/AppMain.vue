<script setup>
import { useTagsViewStore } from "@/store/modules/tags-view";

import { useRoute} from "vue-router";
const tagsViewStore = useTagsViewStore();
const route = useRoute()
const key = computed(() => {
  return route.path+ Math.random();
})
</script>

<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }" :key="key">
      <transition name="router-fade" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--v3-header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--v3-header-height);
  }
}
</style>
