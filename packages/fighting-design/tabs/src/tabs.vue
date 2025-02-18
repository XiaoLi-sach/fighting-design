<script lang="ts" setup name="FTabs">
  import { Props, TabsProvideKey } from './props'
  import {
    onMounted,
    ref,
    provide,
    computed,
    getCurrentInstance,
    watch,
    nextTick,
    useSlots
  } from 'vue'
  import { TabsNav } from './components'
  import { debugWarn, __DEV__ } from '../../_utils'
  import { getChildrenComponent } from './utils'
  import type {
    TabsPropsType,
    TabsNavInstance,
    TabsProvide,
    TabsPaneName
  } from './interface'
  import type { ComponentInternalInstance } from 'vue'

  const prop: TabsPropsType = defineProps(Props)
  const emits = defineEmits<{
    (e: 'update:modelValue', name: TabsPaneName): void
    (e: 'edit', action: 'remove' | 'add', name?: TabsPaneName, i?: number): void
  }>()

  const instance: ComponentInternalInstance | null = getCurrentInstance()

  /**
   * 当前选中的pane
   */
  const currentName = ref<TabsPaneName>(0)

  function setCurrentName(name: TabsPaneName): void {
    // 如果用户没有设置v-model, 这里可以直接在内部修改
    currentName.value = name
    emits('update:modelValue', name)
  }
  /**
   * 触发用户的emit
   */
  function edit(
    action: 'remove' | 'add',
    name?: TabsPaneName,
    i?: number
  ): void {
    emits('edit', action, name, i)
  }
  /**
   * panes集合
   */
  const panes = ref<ComponentInternalInstance[]>([])
  /**
   * 更新pane列表
   * @param pane
   */
  function updatePaneList(): void {
    nextTick(() => {
      if (!instance) return
      panes.value = getChildrenComponent(instance, 'FTabsPane').map(
        (e) => e.component as ComponentInternalInstance
      )
    })
  }
  /**
   * nav列表
   */
  const navs = computed<TabsNavInstance[]>(() => {
    return panes.value.map((e, i) => {
      return {
        name: (e.props.name || (e.props.name = i)) as TabsPaneName, // name如果没填，用下标代替
        label: e.slots['label'] || e.props.label
      }
    })
  })
  /**
   * 将prop.modelValue同步到currentName中
   */
  watch(
    () => prop.modelValue,
    (val) => {
      currentName.value = val

      if (
        __DEV__ &&
        navs.value.length &&
        navs.value.every((e) => e.name !== val)
      ) {
        debugWarn('FTabs', `未找到名为 ${val} 的标签`)
      }
    },
    {
      immediate: true
    }
  )

  onMounted(async () => {
    await nextTick()
    currentName.value = prop.modelValue || navs.value[0].name // 如果没有传value，默认选中第一个
  })

  const _position = computed(() => {
    const { position, type } = prop

    let _position = position
    if (type === 'segment' && (position === 'right' || position === 'left')) {
      _position = 'top'
      debugWarn('FTabs', 'segment 风格只支持 top、bottom 两种方向')
    }
    return _position
  })

  const styleList = computed(() => {
    return [`f-tabs__position_${_position.value}`]
  })

  /**
   * 通过refs 抛出当前选中的值
   */
  defineExpose({
    currentName
  })

  /**
   * 将信息传递给子组件
   */
  provide<TabsProvide>(TabsProvideKey, {
    currentName,
    updatePaneList
  })

  const slots = useSlots()
</script>

<template>
  <div class="f-tabs" :class="styleList">
    <tabs-nav
      v-if="navs.length"
      :navs="navs"
      :type="type"
      :current-name="currentName"
      :position="_position"
      :edit-status="editStatus"
      :justify-content="justifyContent"
      :before-enter="beforeEnter"
      :trigger="trigger"
      @set-current-name="setCurrentName"
      @edit="edit"
    >
      <template v-if="slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-if="slots.suffix" #suffix>
        <slot name="suffix"></slot>
      </template>
    </tabs-nav>
    <div class="f-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>
