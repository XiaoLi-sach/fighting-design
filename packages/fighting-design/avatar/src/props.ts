import type { PropType, ExtractPropTypes, VNode, Component } from 'vue'
import type { AvatarFitType, AvatarSizeType } from './interface'
import type { HandleEventInterface } from '../../_interface'

export const Props = {
  /**
   * 图片路径
   */
  src: {
    type: String,
    default: (): null => null
  },
  /**
   * 加载失败时要显示的地址
   */
  errSrc: {
    type: String,
    default: (): null => null
  },
  /**
   * 图标头像
   */
  icon: {
    type: Object as PropType<VNode | Component>,
    default: (): null => null
  },
  /**
   * 原生 alt 属性
   * 
   * https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#attr-alt
   */
  alt: {
    type: String,
    default: (): null => null
  },
  /**
   * 是否为圆角
   */
  round: {
    type: Boolean,
    default: (): boolean => false
  },
  /**
   * 是否懒加载头像
   */
  lazy: {
    type: Boolean,
    default: (): boolean => false
  },
  /**
   * 如何适应容器
   * 
   * 原生样式属性
   * 
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit#try_it
   */
  fit: {
    type: String as PropType<AvatarFitType>,
    default: (): AvatarFitType => '',
    validator: (val: AvatarFitType): boolean => {
      return (
        ['fill', 'contain', 'cover', 'none', 'scale-down', ''] as const
      ).includes(val)
    }
  },
  /**
   * 图片大小
   * 
   * 可传入字符串使用内置大小
   * 
   * 也可以传入数字，数字将自动转换为 px 单位
   */
  size: {
    type: [String, Number] as PropType<AvatarSizeType | number>,
    default: (): AvatarSizeType => 'middle',
    validator: (val: AvatarSizeType | number): boolean => {
      if (typeof val === 'string') {
        return (['large', 'middle', 'small', 'mini'] as const).includes(val)
      } else if (typeof val === 'number') {
        return val >= 1
      }
      return false
    }
  },
  /**
   * 背景色
   */
  background: {
    type: String,
    default: (): null => null
  },
  /**
   * 字体大小
   */
  fontSize: {
    type: [String, Number] as PropType<string | number>,
    default: (): string => '15px'
  },
  /**
   * 字体的颜色
   */
  fontColor: {
    type: String,
    default: (): string => '#333'
  },
  /**
   * 文字头像
   */
  text: {
    type: String,
    default: (): null => null
  },
  /**
   * 触发懒加载的距离
   */
  rootMargin: {
    type: [String, Number] as PropType<string | number>,
    default: (): string => '100px'
  },
  /**
   * 图片加载成功触发的回调
   */
  load: {
    type: Function as PropType<HandleEventInterface>,
    default: (): null => null
  },
  /**
   * 图片加载失败触发的回调
   */
  error: {
    type: Function as PropType<HandleEventInterface>,
    default: (): null => null
  }
} as const

export type AvatarPropsType = ExtractPropTypes<typeof Props>
