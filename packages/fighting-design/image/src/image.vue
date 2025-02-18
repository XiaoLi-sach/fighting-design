<script lang="ts" setup name="FImage">
  import { Props } from './props'
  import { onMounted, ref, computed } from 'vue'
  import { loadImage, sizeChange } from '../../_utils'
  import { useFilterProps } from '../../_hooks'
  import type { Ref, CSSProperties, ComputedRef } from 'vue'
  import type { ImagePropsType } from './props'
  import type {
    OrdinaryFunctionInterface,
    ClassListInterface
  } from '../../_interface'
  import type {
    LoadImagePropsInterface,
    LoadCallbackInterface
  } from '../../_utils/load-image/interface'

  const prop: ImagePropsType = defineProps(Props)

  // 是否加载成功
  const isSuccess: Ref<boolean> = ref<boolean>(true)
  const FImageImg: Ref<HTMLImageElement> = ref<HTMLImageElement>(
    null as unknown as HTMLImageElement
  )
  const isShowNode: Ref<boolean> = ref<boolean>(prop.lazy)

  /**
   * 开始加载图片
   */
  const loadAction: OrdinaryFunctionInterface = (): void => {
    const node: HTMLImageElement = FImageImg.value as HTMLImageElement
    const callback: LoadCallbackInterface = (params: boolean): void => {
      isSuccess.value = params
      isShowNode.value = params
    }

    const needProps: LoadImagePropsInterface = useFilterProps<
      ImagePropsType,
      LoadImagePropsInterface
    >(prop, ['src', 'errSrc', 'rootMargin', 'lazy', 'load', 'error'])

    loadImage(node, needProps, callback)
  }

  onMounted((): void => {
    loadAction()
  })

  /**
   * 类名列表
   */
  const classList: ComputedRef<ClassListInterface> = computed(
    (): ClassListInterface => {
      const { fit, noSelect } = prop

      return [
        'f-image__img',
        {
          [`f-image__${fit}`]: fit,
          'f-image__select': noSelect
        }
      ] as const
    }
  )

  /**
   * 样式列表
   */
  const styleList: ComputedRef<CSSProperties> = computed((): CSSProperties => {
    const { width, height, round } = prop

    return {
      '--f-image-width': sizeChange(width),
      '--f-image-height': sizeChange(height),
      '--f-image-border-radius': sizeChange(round)
    } as CSSProperties
  })
</script>

<template>
  <div
    v-if="isSuccess"
    role="img"
    :class="['f-image', { 'f-image__block': block }]"
    :style="styleList"
  >
    <!-- 真正展示的图片 -->
    <img
      v-show="isShowNode"
      ref="FImageImg"
      src=""
      :class="classList"
      :style="styleList"
      :draggable="draggable"
      :referrer-policy="referrerPolicy"
      :alt="alt"
      :title="title"
    />
  </div>

  <div v-else class="f-image__error">
    <slot name="error">
      <span class="f-image__error-text">{{ alt || '加载失败' }}</span>
    </slot>
  </div>
</template>
