<script lang="ts" setup name="FLoadingBar">
  import { Props } from './props'
  import { computed } from 'vue'
  import type { ComputedRef } from 'vue'
  import type { ClassListInterface } from '../../_interface'
  import type { LoadingBarPropsType } from './props'

  const prop: LoadingBarPropsType = defineProps(Props)

  /**
   * 样式列表
   */
  const classList: ComputedRef<ClassListInterface> = computed(
    (): ClassListInterface => {
      const { type } = prop

      return ['f-loading-bar', { [`f-loading-bar__${type}`]: type }] as const
    }
  )
</script>

<template>
  <div :class="classList" />
</template>
