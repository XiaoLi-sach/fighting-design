# Checkbox 复选框

你可以有多个选择

- [源代码](https://github.com/FightingDesign/fighting-design/tree/master/packages/fighting-design/checkbox)
- [文档编辑](https://github.com/FightingDesign/fighting-design/blob/master/docs/docs/components/checkbox.md)

## 基础使用

绑定单个复选框，配合 `v-model` 绑定一个 `boolean` 值

::: demo

<template #source>
<f-checkbox v-model="option1" label="酸辣土豆丝" />
</template>

```html
<template>
  <f-checkbox v-model="option1" label="酸辣土豆丝" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const option1 = ref(false)
</script>
```

:::

## 复选组

多个选项可使用 `f-checkbox-group` 复选框组

::: demo

<template #source>
<f-checkbox-group v-model="option2">
<f-checkbox label="鸡肉卷" />
<f-checkbox label="鸡排" />
<f-checkbox label="汉堡" />
</f-checkbox-group>
</template>

```html
<template>
  <f-checkbox-group v-model="option2">
    <f-checkbox label="鸡肉卷" />
    <f-checkbox label="鸡排" />
    <f-checkbox label="汉堡" />
  </f-checkbox-group>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const option2 = ref(['汉堡'])
</script>
```

:::

## 全选及半选

给复选框添加 `indeterminate` 属性使其显示半选时的状态，且此属性仅控制样式

::: demo
<template #source>
<demo1-vue />
</template>

```html
<template>
  <div>
    <f-checkbox
      v-model="checkAll"
      label="全都要"
      :indeterminate="indeterminate"
      :change="onCheckboxChange"
    />
  </div>

  <f-checkbox-group v-model="checkedOptions" :change="onGroupChange">
    <f-checkbox
      v-for="(item, index) in optionList"
      :key="index"
      :label="item"
    />
  </f-checkbox-group>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const checkAll = ref(false)
  const indeterminate = ref(false)
  const checkedOptions = ref<string[]>([])
  const optionList = ref(['红buff', '蓝buff', '大龙', '小龙'])

  const onCheckboxChange = (e: boolean): void => {
    checkedOptions.value = e ? optionList.value : []
    indeterminate.value = false
  }

  const onGroupChange = (val: string[]): void => {
    const halfStatus = !!(val.length && val.length < optionList.value.length)
    if (val.length === optionList.value.length) {
      checkAll.value = true
    }
    indeterminate.value = halfStatus
  }
</script>
```

:::

## 禁用选项

直接添加`disabled` 属性即可，当在 `f-checkbox-group` 组件上使用 `disabled` 属性时，会将其内部组件全部禁用掉

::: demo

<template #source>
<f-checkbox label="选项一" disabled />

<br />

<f-checkbox-group v-model="option3" disabled>
<f-checkbox label="选项一"/>
<f-checkbox label="选项二"/>
<f-checkbox label="选项三"/>
</f-checkbox-group>

<br />

<f-checkbox-group v-model="option3">
  <f-checkbox label="选项一"/>
  <f-checkbox label="选项二" disabled/>
  <f-checkbox label="选项三"/>
</f-checkbox-group>
</template>

```html
<template>
  <f-checkbox label="选项一" disabled />

  <f-checkbox-group v-model="option3" disabled>
    <f-checkbox label="选项一" />
    <f-checkbox label="选项二" />
    <f-checkbox label="选项三" />
  </f-checkbox-group>

  <f-checkbox-group v-model="option3">
    <f-checkbox label="选项一" />
    <f-checkbox label="选项二" disabled />
    <f-checkbox label="选项三" />
  </f-checkbox-group>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const option3 = ref([])
</script>
```

:::

## 带边框

`border` 属性可设置边框

::: demo

<template #source>
<f-checkbox-group v-model="option4" border size="large">
<f-checkbox label="选项一" />
<f-checkbox label="选项二" />
<f-checkbox label="选项三" />
</f-checkbox-group>

<br />
<br />

<f-checkbox-group v-model="option4" border>
  <f-checkbox label="选项一" />
  <f-checkbox label="选项二" />
  <f-checkbox label="选项三" />
</f-checkbox-group>

<br />
<br />

<f-checkbox-group v-model="option4" border size="small">
  <f-checkbox label="选项一" />
  <f-checkbox label="选项二" />
  <f-checkbox label="选项三" />
</f-checkbox-group>

<br />
<br />

<f-checkbox-group v-model="option4" border size="mini">
  <f-checkbox label="选项一" />
  <f-checkbox label="选项二" />
  <f-checkbox label="选项三" />
</f-checkbox-group>
</template>

```html
<template>
  <f-checkbox-group v-model="option4" border size="large">
    <f-checkbox label="选项一" />
    <f-checkbox label="选项二" />
    <f-checkbox label="选项三" />
  </f-checkbox-group>

  <f-checkbox-group v-model="option4" border>
    <f-checkbox label="选项一" />
    <f-checkbox label="选项二" />
    <f-checkbox label="选项三" />
  </f-checkbox-group>

  <f-checkbox-group v-model="option4" border size="small">
    <f-checkbox label="选项一" />
    <f-checkbox label="选项二" />
    <f-checkbox label="选项三" />
  </f-checkbox-group>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const option4 = ref([])
</script>
```

:::

## CheckboxGroup Attributes

| 参数                   | 说明             | 类型            | 可选值                          | 默认值 |
| ---------------------- | ---------------- | --------------- | ------------------------------- | ------ |
| `modelValue / v-model` | 绑定值           | array           | ——                              | ——     |
| `disabled`             | 是否禁用         | boolean         | ——                              | false  |
| `border`               | 是否显示边框     | boolean         | ——                              | false  |
| `size`                 | 尺寸             | string          | `large` `middle` `small` `mini` | middle |
| `vertical`             | 是否纵向排列     | boolean         | ——                              | false  |
| `column-gap`           | 横向排列的间距   | string / number | ——                              | ——     |
| `row-gap`              | 纵向排列的间距   | string / number | ——                              | ——     |
| `change`               | 绑定值变化时触发 | Function        | ——                              | ——     |

## Checkbox Attributes

| 参数                   | 说明               | 类型                      | 可选值 | 默认值 |
| ---------------------- | ------------------ | ------------------------- | ------ | ------ |
| `modelValue / v-model` | 绑定值             | boolean                   | ——     | ——     |
| `disabled`             | 是否禁用           | boolean                   | ——     | false  |
| `label`                | 单选框对应的值     | string / number / boolean | ——     | ——     |
| `change`               | 绑定值变化时触发   | Function                  | ——     | ——     |
| `indeterminate`        | 是否为半选状态样式 | boolean                   | ——     | false  |

## Interface

组件导出以下类型定义：

```ts
import type {
  CheckboxInstance,
  CheckboxPropsType,
  CheckboxLabelType,
  CheckboxGroupInstance,
  CheckboxGroupPropsType,
  CheckboxGroupLabelType,
  CheckboxGroupSizeType,
  CheckboxGroupChangeEventInterface,
  CheckboxGroupChangeInterface,
  CheckboxGroupInjectPropsType
} from 'fighting-design'
```

## Contributors

<a href="https://github.com/Tyh2001" target="_blank">
  <f-avatar round src="https://avatars.githubusercontent.com/u/73180970?v=4" />
</a>

<a href="https://github.com/laine001" target="_blank">
  <f-avatar round src="https://avatars.githubusercontent.com/u/40457081?v=4" />
</a>

<script lang="ts" setup>
  import { ref } from 'vue'
  import demo1Vue from './_demos/checkbox/demo1.vue'

  const option1 = ref(false)
  const option2 = ref([])
  const option3 = ref([])
  const option4 = ref([])
</script>
