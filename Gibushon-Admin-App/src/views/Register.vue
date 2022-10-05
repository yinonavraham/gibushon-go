<template>
  <div class="flex align-items-center justify-content-center" style="position: absolute;top: 0; bottom: 0; width: 100%;">
  <Card class="absolute">
    <template #header>
      <div class="flex justify-content-center w-full text-lg font-bold" style="padding: 10px">
        Gibushon
      </div>
    </template>
    <template #title>
      Create an account
    </template>
    <template #content>
      <div>
        Enter the join code:
        <div class="field" style="padding-top: 5px">
          <InputText id="code" type="password" v-model="code" placeholder="Code" class="w-full" style="min-width: 30ch"/>
        </div>
      </div>
      <div>Register using -</div>
      <div style="padding: 5px"/>
      <Accordion :activeIndex="0">
        <AccordionTab header="Identity provider">
          <div class="flex justify-content-center" style="padding-top: 10px">
            <Button @click="registerWithGoogle" icon="pi pi-google" class="p-button-rounded p-button-lg"/>
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
            <div class="field">
              <InputText id="passwordConfirm" type="password" placeholder="Confirm Password" v-model="passwordConfirm" class="w-full"/>
            </div>
          </div>
          <div class="flex justify-content-center">
            <Button @click="registerWithEmailAndPassword">Register</Button>
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
import {signInWithGoogle, createUserWithEmailAndPassword, SignInResult} from "@/services/AuthService";

const code = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const router = useRouter();

const registerWithGoogle = () => {
  doRegister(signInWithGoogle);
};

const registerWithEmailAndPassword = () => {
  doRegister(() => createUserWithEmailAndPassword(email.value, password.value));
};

const doRegister = (f: () => Promise<SignInResult>) => {
  f().then((result) => {
        console.log("Successfully registered user:", result);
        router.push("/");
  }).catch((err) => {
        console.log("Error while registering user:", err);
        alert(err);
  });
}
</script>