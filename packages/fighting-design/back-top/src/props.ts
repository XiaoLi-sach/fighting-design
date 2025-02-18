import type { PropType, ExtractPropTypes } from 'vue'
import type { BackTopBehaviorType } from './interface'

export const Props = {
  /**
   * 是否为圆角
   */
  round: {
    type: Boolean,
    default: (): boolean => false
  },
  /**
   * 滚动模式
   */
  behavior: {
    type: String as PropType<BackTopBehaviorType>,
    default: (): BackTopBehaviorType => 'smooth',
    validator: (val: BackTopBehaviorType): boolean => {
      return (['smooth', 'auto'] as const).includes(val)
    }
  },
  /**
   * 滚动超出多少距离展示
   */
  visibleHeight: {
    type: Number,
    default: (): number => 200,
    validator: (val: number): boolean => val >= 0
  },
  /**
   * 距离右侧的距离
   */
  right: {
    type: [String, Number] as PropType<string | number>,
    default: (): string => '40px'
  },
  /**
   * 距离底部的距离
   */
  bottom: {
    type: [String, Number] as PropType<string | number>,
    default: (): string => '40px'
  },
  /**
   * 原生 z-index 属性
   * 
   * https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index
   */
  zIndex: {
    type: Number,
    default: (): number => 900,
    validator: (val: number): boolean => val >= 0
  },
  /**
   * 点击返回距离顶部的距离
   */
  top: {
    type: Number,
    default: (): number => 0,
    validator: (val: number): boolean => val >= 0
  },
  /**
   * 监视指定元素，需要传入指定的 class 或 id，如：.box #app
   */
  listenEl: {
    type: String,
    default: (): null => null
  },
  /**
   * 背景色
   */
  background: {
    type: String,
    default: (): string => '#fff'
  },
  /**
   * 文字颜色
   */
  color: {
    type: String,
    default: (): string => '#333'
  }
} as const

export type BackTopPropsType = ExtractPropTypes<typeof Props>
