<script lang="ts" setup name="FPopup">
  import { Props } from './props'
  import { computed } from 'vue'
  import { sizeChange, isBoolean } from '../../_utils'
  import type { ComputedRef, CSSProperties } from 'vue'
  import type {
    OrdinaryFunctionInterface,
    HandleMouseEventInterface
  } from '../../_interface'
  import type { PopupPropsType } from './interface'

  const prop: PopupPropsType = defineProps(Props)
  const emit = defineEmits({
    'update:visible': (visible: boolean): boolean => isBoolean(visible)
  })

  const closePopup: OrdinaryFunctionInterface = (): void => {
    if (!prop.maskClose) return
    emit('update:visible', false)
  }

  const handleOpen: HandleMouseEventInterface = (evt: MouseEvent): void => {
    prop.open && prop.open(evt)
  }

  const handleOpenEnd: HandleMouseEventInterface = (evt: MouseEvent): void => {
    prop.openEnd && prop.openEnd(evt)
  }

  const handleClose: HandleMouseEventInterface = (evt: MouseEvent): void => {
    prop.close && prop.close(evt)
  }

  const handleCloseEnd: HandleMouseEventInterface = (evt: MouseEvent): void => {
    prop.closeEnd && prop.closeEnd(evt)
  }

  /**
   * 样式列表
   */
  const styleList: ComputedRef<CSSProperties> = computed((): CSSProperties => {
    const { direction, popupSize, padding } = prop

    if (direction === 'top' || direction === 'bottom') {
      return {
        height: sizeChange(popupSize),
        padding: sizeChange(padding)
      } as const
    }

    return {
      width: sizeChange(popupSize),
      padding: sizeChange(padding)
    } as const
  })
</script>

<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition
      name="f-popup__transition"
      @before-enter="handleOpen"
      @after-enter="handleOpenEnd"
      @before-leave="handleClose"
      @after-leave="handleCloseEnd"
    >
      <div v-show="visible" class="f-popup" :style="{ zIndex }">
        <!-- 遮罩层 -->
        <div
          v-if="showMask"
          :class="['f-popup__mask', { 'f-popup__blur': maskBlur }]"
          :style="{ background: maskBackground, opacity: maskOpacity }"
        />

        <!-- 主容器 -->
        <div
          :class="[
            'f-popup__container',
            {
              [`f-popup__container-${direction}`]: direction
            }
          ]"
          @click.self="closePopup"
        >
          <!-- 主内容 -->
          <transition name="f-popup__wrapper-transition">
            <div
              v-show="visible"
              :class="[
                'f-popup__wrapper',
                {
                  [`f-popup__wrapper-${direction}`]: direction
                }
              ]"
              :style="styleList"
            >
              <slot />
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>
