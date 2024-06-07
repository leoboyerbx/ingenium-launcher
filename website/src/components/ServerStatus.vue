<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useIntervalFn } from '@vueuse/core'

const serverData = ref<{
    players?: ({ id: string, name: string })[],
    online: boolean
}>({
    players: [],
    online: true
})
async function updateServerData() {
    try {
        const data = await fetch('https://ingenium.pnk.network/online/query').then(d => d.json())
        serverData.value = data
    } catch (e) {
        serverData.value = { online: false }
    }
}
async function startUpdateLoop() {
    await updateServerData()
    setTimeout(() => startUpdateLoop(), 1000)
}
onMounted(startUpdateLoop)

const playerCount = computed(() => (serverData.value.online ? serverData.value.players?.length : 0) ?? 0)
const connectedMessage = computed(() => playerCount.value + ' ' + 'joueur connecté'.split(' ').map(w => w + (playerCount.value > 1 ? 's' : '')).join(' '))
</script>
<template>
    <article class="bg-black/50 px-5 py-4 rounded-lg text-xs flex flex-col">
        <header class="flex items-center gap-2 font-semibold">
            <span class="rounded-full w-2 h-2" :class="serverData.online ? 'bg-green-500' : 'bg-red-500'"></span>
            <span>Le serveur est {{ serverData.online ? 'en ligne' : 'hors ligne' }}</span>
        </header>
        <section class="mt-4 font-light flex flex-col gap-2">
            <h1 class="mb-1">{{ connectedMessage }}</h1>
            <div class="flex items-center gap-2" v-if="playerCount" v-for="player in serverData.players"
                 :key="player.id">
                <img :src="`https://crafatar.com/avatars/${player.id}`" class="w-6 rounded"
                     :alt="`Avatar of player ${player.name}`">
                <span class="">{{ player.name }}</span>
            </div>
        </section>
    </article>
</template>