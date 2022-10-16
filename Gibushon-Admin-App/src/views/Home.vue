<script setup lang="ts">
import {createExampleAudition, createExampleAuditionDefinition} from "@/datastore/example";

function createExampleData() {
  createExampleAuditionDefinition().then(audDef => {
    createExampleAudition(audDef).then(audition => {
      console.log("Created audition: ", audition);
    });
  });
}

function loadExampleData() {
  console.log("loadExampleData");
}
</script>

<template>
  <main>
    Hello
    <div>
      <button @click="createExampleData">Create Example Data</button>
    </div>
    <div>
      <button @click="loadExampleData">Load Example Data</button>
    </div>
  </main>
</template>
