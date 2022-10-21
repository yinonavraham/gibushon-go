<template>
  <main>
    <div>
      <h1>Human Resources Home (Audition: {{ auditionStore.auditionID }})</h1>
    </div>
  </main>
</template>

<script setup lang="ts">
import {useAuditionStore} from "@/stores/audition";

const auditionStore = useAuditionStore();
</script>