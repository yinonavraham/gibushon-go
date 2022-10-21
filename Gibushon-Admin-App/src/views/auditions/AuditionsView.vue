<template>
  <main>
    <h1>Auditions</h1>
    <div class="flex gap-3">
      <Card>
        <template #title>
          Join Audition
        </template>
        <template #content>
          <div class="flex justify-content-center">
            <Button @click="joinAudition" icon="pi pi-plus" class="p-button-raised p-button-rounded" />
          </div>
        </template>
      </Card>
      <Card v-for="audition in auditions">
        <template #title>
          {{ audition.auditionName }}
        </template>
        <template #subtitle>
          {{ formatDate(audition.auditionCreatedAt) }}
        </template>
        <template #content>
          <div class="flex gap-2">
            <Button v-for="role in audition.roles.keys()" @click="goToAudition(audition.auditionID, role)">
              {{ role }}
            </Button>
          </div>
        </template>
      </Card>
    </div>
  </main>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {UserAuditionRole} from "@/datastore/models/users/UserAuditionRole";
import {getCurrentUser} from "@/services/AuthService";
import type {RoleType} from "@/datastore/models/auth/RoleType";
import {HumanResourcesRole, LeaderRole, ManagerRole, ReviewerRole} from "@/datastore/models/auth/RoleType";
import router from "@/router";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import {useAuditionStore} from "@/stores/audition";

const auditionStore = useAuditionStore();

const joinAudition = () => {
  window.alert("TODO: Join audition");
};

const goToAudition = (id: AuditionID, role: RoleType) => {
  console.log(`Go to audition ${id} as ${role}`);
  auditionStore.setCurrentAuditionID(id);
  switch (role) {
    case ReviewerRole:
      router.push("/reviewer/audition");
      break;
    case LeaderRole:
      router.push("/leader/audition");
      break;
    case ManagerRole:
      router.push("/manager/audition");
      break;
    case HumanResourcesRole:
      router.push("/hr/audition");
      break;
  }
};

const auditions = ref(new Array<UserAuditionRole>());
getCurrentUser()?.getAuditionRoles().then(auditionRoles => {
  console.log(auditionRoles);
  const result = new Array<UserAuditionRole>();
  for (let audition of auditionRoles.values()) {
    result.push(audition);
  }
  result.sort((a, b) => a.auditionCreatedAt.getTime() - b.auditionCreatedAt.getTime());
  auditions.value = result;
});

const formatDate = (date?: Date): string => {
  if (!date) return "";
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}
</script>