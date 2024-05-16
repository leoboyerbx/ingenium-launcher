<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
    releaseData: any
}>()

const os = ref('windows')
onMounted(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.includes('mac')) {
        os.value = 'mac'
    } else if (ua.includes('linux')) {
        os.value = 'linux'
    }
    console.log(

    );
})

const downloadData: Record<string, {
    icon: string,
    download: string,
    description: string
}> = {
    mac: {
        icon: 'i-uil-apple',
        download: props.releaseData.assets.find((asset: any) => asset.name.endsWith(".dmg"))?.browser_download_url,
        description: '.dmg universel'
    }
} as const

const activeDownloadData = computed(() => downloadData[os.value])
</script>
<template>
    <div>
        <div class="flex gap-2 relative items-stretch">
            <a class="btn btn-primary text-white flex items-center px-6 py-4 h-auto">
                <span class="text-[20px] mb-0.5" :class="activeDownloadData.icon" />
                <span class="w-px bg-current h-8 mx-2"></span>
                <span class="flex flex-col gap-1">
                    <span class="text-lg leading-none">
                        Télécharger
                    </span>
                    <span class="font-light text-xs">
                        {{ activeDownloadData.description }}
                    </span>
                </span>
            </a>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" title="Autres téléchargements"
                     class="btn btn-primary text-white flex h-[72px] w-[72px]">
                    <span
                          class="i-uil-angle-down text-[48px] mt-0.5"></span>
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 mt-2 shadow bg-base-300 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>