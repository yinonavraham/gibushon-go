<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script lang="ts">
import {createExampleAuditionDefinition, createExampleAudition} from "@/datastore/example";

const auditDef = createExampleAuditionDefinition();
const audit = createExampleAudition(auditDef);
console.log(audit);
</script>