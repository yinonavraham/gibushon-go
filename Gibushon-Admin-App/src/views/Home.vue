<script setup lang="ts">
import {createExampleAudition, createExampleAuditionDefinition} from "@/datastore/example";
import {fetchAuditions} from "@/datastore/services/AuditionsDao";
import {fetchAuditionCandidates} from "@/datastore/services/CandidatesDao";
import {fetchCandidateStatus} from "@/datastore/services/CandidateStatusesDao";
import {fetchAuditionReviewers} from "@/datastore/services/ReviewersDao";

function createExampleData() {
  createExampleAuditionDefinition().then(audDef => {
    createExampleAudition(audDef).then(audition => {
      console.log("Created audition: ", audition);
    });
  });
}

function loadExampleData() {
  console.log("loadExampleData");
  fetchAuditions().then(auditions => {
    for (let audition of auditions) {
      console.log("Audition: ", audition);
      fetchAuditionCandidates(audition.id).then(candidates => {
        console.log(`Got ${candidates.length} candidates:`, candidates);
        for (let candidate of candidates) {
          fetchCandidateStatus(candidate.id).then(candidateStatus => {
            let team = audition.getTeam(candidateStatus.teamID);
            console.log(`Candidate ${candidateStatus.number} in team ${team?.number}`);
          })
        }
      })
      fetchAuditionReviewers(audition.id).then(reviewers => {
        for (let reviewer of reviewers) {
          let team = audition.getTeam(reviewer.teamID);
          let role = reviewer.watcher ? `${reviewer.role} (watcher)` : `${reviewer.role}`;
          console.log(`Reviewer ${reviewer.name} is a ${role} in team ${team?.number}`)
        }
      });
    }
  })
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
