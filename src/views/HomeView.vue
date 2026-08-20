<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CounterButton from '../components/CounterButton.vue'
import type { CatDTO } from '@shared/types/cat'

const cats = ref<CatDTO[]>([])

async function load() {
  cats.value = await window.electronAPI.cat.findAll()
}

async function add() {
  await window.electronAPI.cat.create({ name: '测试猫', age: 2, breeds: '中华田园猫' })
  await load()
}

onMounted(load)
</script>

<template>
  <main>
    <CounterButton />
    <section style="margin-top: 2rem">
      <h2>SQLite 测试</h2>
      <button @click="add">存一只猫</button>
      <button @click="load">读出来</button>
      <pre>{{ JSON.stringify(cats, null, 2) }}</pre>
    </section>
  </main>
</template>
