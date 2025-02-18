import type { PropType, ExtractPropTypes, VNode } from 'vue'
import type { TagSizeType, TagType } from './interface'
import type { HandleMouseEventInterface } from '../../_interface'

export const Props = {
  /**
   * 标签类型
   */
  type: {
    type: String as PropType<TagType>,
    default: (): TagType => 'default',
    validator: (val: TagType): boolean => {
      return (
        ['default', 'primary', 'success', 'danger', 'warning'] as const
      ).includes(val)
    }
  },
  /**
   * 是否可关闭
   */
  close: {
    type: Boolean,
    default: (): boolean => false
  },
  /**
   * 圆角
   */
  round: {
    type: Boolean,
    default: (): boolean => false
  },
  /**
   * 自定义背景色
   */
  background: {
    type: String,
    default: (): null => null
  },
  /**
   * 自定义文字颜色
   */
  color: {
    type: String,
    default: (): null => null
  },
  /**
   * 左侧 icon
   */
  beforeIcon: {
    type: Object as PropType<VNode>,
    default: (): null => null
  },
  /**
   * 右侧 icon
   */
  afterIcon: {
    type: Object as PropType<VNode>,
    default: (): null => null
  },
  /**
   * 标签大小
   */
  size: {
    type: String as PropType<TagSizeType>,
    default: (): TagSizeType => 'middle',
    validator: (val: TagSizeType): boolean => {
      return (['large', 'middle', 'small', 'mini'] as const).includes(val)
    }
  },
  /**
   * 是否为简约模式
   */
  simple: {
    type: Boolean,
    default: (): boolean => false
  },
  /**
   * 是否为块级元素
   */
  block: {
    type: Boolean,
    default: (): boolean => false
  },
  /**
   * 线性的
   */
  line: {
    type: Boolean,
    default: (): boolean => false
  },
  /**
   * 点击关闭按钮触发
   */
  closeEnd: {
    type: Function as PropType<HandleMouseEventInterface>,
    default: (): null => null
  }
} as const

export type TagPropsType = ExtractPropTypes<typeof Props>
