<template>
  <div class="flex align-items-center justify-content-center" style="position: absolute;top: 0; bottom: 0; width: 100%;">
    <Card class="absolute" style="min-width: 400px">
      <template #header>
        <div class="flex justify-content-center w-full text-lg font-bold" style="padding: 10px">
          Gibushon
        </div>
      </template>
      <template #title>
        Sign In
      </template>
      <template #content>
        <div>Sign in using -</div>
        <div style="padding: 5px"/>
        <Accordion :activeIndex="0">
          <AccordionTab header="Identity provider">
            <div class="flex justify-content-center" style="padding-top: 10px">
              <Button @click="signInWithGoogle" icon="pi pi-google" class="p-button-rounded p-button-lg"/>
            </div>
          </AccordionTab>
          <AccordionTab header="Email and password">
            <div>
              <div class="field">
                <InputText id="email" type="text" placeholder="Email" v-model="email" class="w-full"/>
              </div>
              <div class="field">
                <InputText id="password" type="password" placeholder="Password" v-model="password" class="w-full"/>
              </div>
            </div>
            <div class="flex justify-content-center">
              <Button @click="signInWithEmailAndPassword">Sign In</Button>
            </div>
          </AccordionTab>
        </Accordion>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {signInWithGoogle as doSignInWithGoogle, signInUserWithEmailAndPassword, SignInResult} from "@/services/AuthService";

const email = ref("");
const password = ref("");
const router = useRouter();

const signInWithGoogle = () => {
  doSignIn(doSignInWithGoogle);
};

const signInWithEmailAndPassword = () => {
  doSignIn(() => signInUserWithEmailAndPassword(email.value, password.value));
};

const doSignIn = (f: () => Promise<SignInResult>) => {
  f().then((result) => {
    console.log("Successfully signed in user:", result);
    router.push("/");
  }).catch((err) => {
    console.log("Error while signing in user:", err);
    alert(err);
  });
}
</script>