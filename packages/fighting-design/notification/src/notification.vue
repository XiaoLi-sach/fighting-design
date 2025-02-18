<script lang="ts" setup name="FMessage">
  import { Props } from './props'
  import { computed, onMounted, ref, isVNode, nextTick } from 'vue'
  import { FSvgIcon } from '../../svg-icon'
  import { FCloseBtn } from '../../close-btn'
  import { isString } from '../../_utils'
  import {
    FIconSmileLineVue,
    FIconLightbulbVue,
    FIconThumbUpVue,
    FIconCircleCrossVue,
    FIconWarningVue
  } from '../../_svg'
  import type { VNode, CSSProperties, ComputedRef, Ref } from 'vue'
  import type {
    OrdinaryFunctionInterface,
    ClassListInterface
  } from '../../_interface'
  import type { NotificationPropsType } from './props'
  import { massageManage } from '../../_hooks'

  const prop: NotificationPropsType = defineProps(Props)
  const emit = defineEmits({
    destroy: (): boolean => true
  })

  const notificationDefaultIcon = {
    default: FIconSmileLineVue,
    primary: FIconLightbulbVue,
    success: FIconThumbUpVue,
    danger: FIconCircleCrossVue,
    warning: FIconWarningVue
  } as const

  /**
   * 默认icon
   */
  const _icon: ComputedRef<String | null | VNode> = computed(
    (): String | null | VNode => {
      if (prop.icon) {
        return prop.icon
      } else if (prop.type) {
        return notificationDefaultIcon[prop.type]
      }
      return null
    }
  )

  const notificationRef = ref<HTMLDivElement>()
  const notificationHeight: Ref<number> = ref<number>(0)
  const visible: Ref<boolean> = ref<boolean>(false)

  const isTop: ComputedRef<boolean> = computed((): boolean =>
    prop.placement.includes('top')
  )

  const isRight: ComputedRef<boolean> = computed((): boolean =>
    prop.placement.includes('right')
  )

  const siblingOffset: ComputedRef<number> = computed((): number =>
    massageManage.getSiblingOffset(prop.placement, prop.id, !isTop.value)
  )

  const offset: ComputedRef<number> = computed(
    (): number => prop.offset + siblingOffset.value
  )

  const bottom: ComputedRef<number> = computed(
    (): number => notificationHeight.value + offset.value
  )

  onMounted((): void => {
    nextTick((): void => {
      notificationHeight.value = (
        notificationRef.value as HTMLDivElement
      ).getBoundingClientRect().height
    })
  })

  const classList: ComputedRef<ClassListInterface> = computed(
    (): ClassListInterface => {
      const { type, round, close, placement } = prop

      return [
        'f-notification',
        {
          [`f-notification__${type}`]: type,
          [`f-notification__${placement}`]: placement,
          'f-notification__round': round,
          'f-notification__hasClose': close
        }
      ] as const
    }
  )

  const styleList: ComputedRef<CSSProperties> = computed((): CSSProperties => {
    const { color, background, zIndex } = prop

    const styles: CSSProperties = {
      color,
      background,
      zIndex
    } as const

    if (prop.placement.includes('bottom')) {
      styles.bottom = offset.value + 'px'
    } else {
      styles.top = offset.value + 'px'
    }

    return styles
  })

  const timer = ref<NodeJS.Timeout>()

  const clearTimer: OrdinaryFunctionInterface = (): void => {
    if (!timer.value) return
    clearTimeout(timer.value)
  }

  const closeMessage: OrdinaryFunctionInterface = (): void => {
    clearTimer()
    visible.value = false
  }
  const closeMessageEnd: OrdinaryFunctionInterface = (): void => {
    massageManage.removeInstance(prop.placement, prop.id)
  }

  const startTime: OrdinaryFunctionInterface = (): void => {
    if (!prop.duration) return
    timer.value = setTimeout((): void => {
      closeMessage()
    }, prop.duration)
  }

  onMounted((): void => {
    startTime()
    visible.value = true
  })

  defineExpose({
    visible,
    bottom,
    close: closeMessage
  })
</script>

<template>
  <transition
    mode="out-in"
    :name="`f-notification-fade` + (isRight ? '-right' : '-left')"
    @before-leave="closeMessageEnd"
    @after-leave="emit('destroy')"
  >
    <div
      v-show="visible"
      ref="notificationRef"
      :class="classList"
      :style="styleList"
      @mouseleave="startTime"
      @mouseenter="clearTimer"
    >
      <!-- icon -->
      <div v-if="showIcon && _icon" class="f-notification__icon">
        <f-svg-icon :icon="_icon" :size="28">
          <component :is="_icon" v-if="isVNode(_icon)" />
        </f-svg-icon>
      </div>

      <!-- 主体内容 -->
      <div class="f-notification__info">
        <!-- 标题 -->
        <div class="f-notification__title">
          <component :is="title" v-if="isVNode(title)" />
          <h3 v-else class="f-notification__title-text">
            {{ title }}
          </h3>
        </div>

        <!-- 消息文本 -->
        <component :is="message" v-if="isVNode(message)" />
        <div v-else class="f-notification__text">
          {{ message }}
        </div>
      </div>

      <!-- 关闭按钮 -->
      <div
        v-if="prop.close"
        class="f-notification__close"
        @click="closeMessage"
      >
        <template v-if="isString(closeBtn)">{{ closeBtn }}</template>
        <f-close-btn v-else :size="16" />
      </div>
    </div>
  </transition>
</template>
