import type { PropType, ExtractPropTypes } from 'vue'

export const Props = {
  /**
   * 自定义宽度
   */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: (): number => 200
  },
  /**
   * 自定义内边距
   */
  padding: {
    type: [String, Number] as PropType<string | number>,
    default: (): null => null
  }
} as const

export type AsidePropsType = ExtractPropTypes<typeof Props>
