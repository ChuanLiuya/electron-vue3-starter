<script setup lang="ts">
import { ref, toRaw } from 'vue'
import type { CatCreateInput, CatDTO } from '@shared/types/cat'

const catForm = ref<CatCreateInput>({
  name: '',
  age: 0,
  breed: '',
})

const catData = ref<CatDTO[]>()

function handleClickAddBtn() {
  window.electronAPI.cat.create(toRaw(catForm.value))
}

async function handleClickLoadBtn() {
  catData.value = await window.electronAPI.cat.findAll()
}
</script>

<template>
  <main>
    <section style="margin-top: 2rem">
      <input type="text" v-model="catForm.name" placeholder="请输入猫的名字" />
      <input type="text" v-model="catForm.age" placeholder="请输入猫的年龄" />
      <input type="text" v-model="catForm.breed" placeholder="请输入猫的品种" />
      <button @click="handleClickAddBtn">存入</button>
    </section>
    <section style="margin-top: 2rem">
      <button @click="handleClickLoadBtn">读取猫信息</button>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>品种</th>
            <th>名称</th>
            <th>年龄</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="value in catData" :key="value.id">
            <tr>
              <th>{{ value.id }}</th>
              <th>{{ value.breed }}</th>
              <th>{{ value.name }}</th>
              <th>{{ value.age }}</th>
            </tr>
          </template>
        </tbody>
      </table>
    </section>
  </main>
</template>
