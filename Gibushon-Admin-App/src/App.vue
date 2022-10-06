<script setup lang="ts">
import {RouterLink, RouterView} from "vue-router";
import {addCurrentUserChangedListener, getCurrentUser, signOut} from "@/services/AuthService";
import {ref} from "vue";
import router from "@/router";

const isLoggedIn = ref(false);
const showSidebar = ref(false);

addCurrentUserChangedListener((user) => isLoggedIn.value = (user != null));

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
  },
  {
    key: "manager",
    label: "Manager",
    icon: "pi pi-briefcase",
  },
  {
    key: "human_resources",
    label: "Human Resources",
    icon: "pi pi-user-edit",
  },
  {
    key: "reviewer",
    label: "Reviewer",
    icon: "pi pi-eye",
  },
]);

router.beforeResolve((to, from, next) => {
  console.log("Current user profile:", getCurrentUser()?.profile);
  console.log("Current user audition roles:", getCurrentUser()?.auditionRoles);
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
</style>
