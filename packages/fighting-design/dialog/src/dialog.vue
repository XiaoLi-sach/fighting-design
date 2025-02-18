<script lang="ts" setup name="FDialog">
  import { Props } from './props'
  import { FCloseBtn } from '../../close-btn'
  import { FPopup } from '../../popup'
  import { ref, watch } from 'vue'
  import { sizeChange, isBoolean } from '../../_utils'
  import type { Ref } from 'vue'
  import type { OrdinaryFunctionInterface } from '../../_interface'
  import type { DialogPropsType } from './props'

  const prop: DialogPropsType = defineProps(Props)
  const emit = defineEmits({
    'update:visible': (visible: boolean): boolean => isBoolean(visible)
  })

  const isVisible: Ref<boolean> = ref<boolean>(prop.visible)

  /**
   * 关闭时
   */
  const closeDialog: OrdinaryFunctionInterface = (): void => {
    emit('update:visible', false)
  }

  watch(
    (): boolean => isVisible.value,
    (newVal: boolean): void => {
      if (!newVal) {
        closeDialog()
      }
    }
  )

  watch(
    (): boolean => prop.visible,
    (newVal: boolean): void => {
      isVisible.value = newVal
    }
  )
</script>

<template>
  <f-popup
    v-model:visible="isVisible"
    :append-to-body="appendToBody"
    :show-mask="showMask"
    :mask-close="maskClose"
    :z-index="zIndex"
    :mask-blur="maskBlur"
    :open="open"
    :open-end="openEnd"
    :close="close"
    :close-end="closeEnd"
  >
    <div
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      :class="['f-dialog', { 'f-dialog__fullscreen': fullscreen }]"
      :style="{ width: sizeChange(width) }"
    >
      <!-- 头部 -->
      <header class="f-dialog__header">
        <slot name="header">
          <span class="f-dialog__header-title">{{ title }}</span>
          <f-close-btn
            v-if="showCloseIcon"
            :icon="closeIcon"
            @click="closeDialog"
          >
            <slot name="closeIcon" />
          </f-close-btn>
        </slot>
      </header>

      <!-- 身体 -->
      <section v-if="$slots.default" class="f-dialog__body">
        <slot />
      </section>

      <!-- 页脚 -->
      <footer v-if="$slots.footer" class="f-dialog__footer">
        <slot name="footer" />
      </footer>
    </div>
  </f-popup>
</template>
