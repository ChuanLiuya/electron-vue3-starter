<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CounterButton from '../components/CounterButton.vue'

const notes = ref<NoteRow[]>([])

async function load() {
  notes.value = await window.electronAPI.test.list()
}

async function add() {
  await window.electronAPI.test.add('测试笔记', '你好，SQLite！')
  await load()
}

onMounted(load)
</script>

<template>
  <main>
    <CounterButton />
    <section style="margin-top: 2rem">
      <h2>SQLite 测试</h2>
      <button @click="add">存一条</button>
      <button @click="load">读出来</button>
      <pre>{{ JSON.stringify(notes, null, 2) }}</pre>
    </section>
  </main>
</template>
