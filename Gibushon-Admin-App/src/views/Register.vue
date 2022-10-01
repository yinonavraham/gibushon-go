<template>
  <h1>Create an account</h1>
  <p><FormKit
      type="email"
      label="email address"
      help="Please enter your email address."
      validation="required|email"
      validation-visibility="live"
      placeholder="user@example.com"
      v-model="email"
  /></p>
  <!--p><input type="text" placeholder="email" v-model="email"></p-->
  <p><input type="password" placeholder="password" v-model="password"></p>
  <p><button @click="register">Register</button></p>
  <p><button @click="signInWithGoogle">Sign in with Google</button></p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  let auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        console.log("Successfully registered!");
        console.log(auth.currentUser)
        router.push("/feed");
      })
      .catch((err) => {
        console.log("Error while creating an account: " + err);
        alert(err);
      });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log("Successfully registered Google user");
        console.log(result.user);
        router.push("/feed");
      })
      .catch((err) => {
        console.log("Error while registering Google user: ", err);
        alert(err);
      });
};
</script>