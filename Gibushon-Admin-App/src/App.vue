<script setup lang="ts">
import {RouterView} from "vue-router";
import {addCurrentUserChangedListener, getCurrentUser, LoggedInUser, signOut} from "@/services/AuthService";
import {ref} from "vue";
import router from "@/router";
import type {AuditionID} from "@/datastore/models/audition/Audition";
import {UserAuditionRole} from "@/datastore/models/users/UserAuditionRole";
import {HumanResourcesRole, ManagerRole, ReviewerRole} from "@/datastore/models/auth/RoleType";

const isLoggedIn = ref(false);
const showSidebar = ref(false);
const profilePhotoUrl = ref("");
const auditionRoles = ref(new Map<AuditionID, UserAuditionRole>());
const isAdmin = ref(false);
const isManager = ref(false);
const isHR = ref(false);
const isReviewer = ref(false);

addCurrentUserChangedListener((user) => {
  console.log("User profile: ", user?.profile);
  isLoggedIn.value = false;
  isAdmin.value = false;
  isManager.value = false;
  isHR.value = false;
  isReviewer.value = false;
  if (user == null) {
    return;
  }
  isLoggedIn.value = true;
  profilePhotoUrl.value = (user.profile?.photoUrl) ? user.profile.photoUrl : "";
  user.getAuditionRoles().then((audRoles) => {
    auditionRoles.value = audRoles;
    audRoles.forEach((userRole, audId) => {
      if (userRole.roles.has(ManagerRole)) isManager.value = true;
      if (userRole.roles.has(HumanResourcesRole)) isHR.value = true;
      if (userRole.roles.has(ReviewerRole)) isReviewer.value = true;
    });
  }).catch((err) => {
    console.warn("could not get audition roles for user: ", err);
    auditionRoles.value = new Map<AuditionID, UserAuditionRole>();
  });
  isAdmin.value = true;
});

const doSignOut = () => {
  showSidebar.value = false;
  signOut().then(() => {
    console.log("Signed out.");
    router.push("/sign-in");
  }).catch(err => {
    console.log("Could not sign out:", err);
  });
}

const menuItems = ref([
  {
    key: "admin",
    label: "Admin",
    icon: "pi pi-building",
    to: "/adminapp",
    visible: isAdmin,
  },
  {
    key: "manager",
    label: "Manager",
    icon: "pi pi-briefcase",
    to: "/managerapp",
    visible: isManager,
  },
  {
    key: "human_resources",
    label: "Human Resources",
    icon: "pi pi-user-edit",
    to: "/hrapp",
    visible: isHR,
  },
  {
    key: "reviewer",
    label: "Reviewer",
    icon: "pi pi-eye",
    to: "/reviewerapp",
    visible: isReviewer,
  },
]);

router.beforeResolve((to, from, next) => {
  console.log("Current user profile:", getCurrentUser()?.profile);
  if (getCurrentUser() == null && to.path != "/sign-in" && to.path != "/register") {
    console.log("Not signed-in, redirect to sign-in page (original to: '" + to.path + "').");
    next("/sign-in");
    return;
  }
  if (getCurrentUser() != null && (to.path == "/sign-in" || to.path == "/register")) {
    console.log("Already signed in, won't route to '" + to.path + "', need to sign-out first.");
    if (from.path == "/sign-in" || from.path == "/register") {
      next("/");
      return;
    }
    next(from.path);
    return;
  }
  next();
});
</script>

<template>
  <div class="flex justify-content-baseline align-items-center
                px-1 surface-0 border-bottom-1 surface-border relative lg:static"
       style="height: 60px;">
    <Button icon="pi pi-bars" class="p-button-rounded p-button-text"
            v-show="isLoggedIn"
            @click="showSidebar = true"/>
    <div class="px5" v-show="!isLoggedIn">&nbsp;</div>
    <span>Gibushon</span>
  </div>
  <Sidebar v-model:visible="showSidebar" :baseZIndex="10000">
    <template #header>
      <div class="flex max-w-full align-items-center">
        <Avatar v-if="!profilePhotoUrl" icon="pi pi-user" size="large" shape="circle" />
        <Avatar v-if="profilePhotoUrl" :image="profilePhotoUrl" size="large" shape="circle" />
        <span class="ml-3">
          {{ getCurrentUser().user.displayName }}
        </span>
      </div>
    </template>
    <div class="flex flex-column">
      <div class="flex-grow-1">&nbsp;</div>
      <PanelMenu :model="menuItems"/>
      <Divider/>
      <div>
        <Button label="Sign Out" icon="pi pi-sign-out" @click="doSignOut"/>
      </div>
    </div>
  </Sidebar>
  <div>
    <RouterView/>
  </div>
</template>

<style>
.p-sidebar-header-content {
  width: 100%;
}
</style>
