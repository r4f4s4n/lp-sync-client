<template>
  <div>
    <h1>Hi {{usuaria.nombre}}!</h1>
    <img :src="usuaria.avatarUrl" />
    <h3>LPs from secure api end point:</h3>
    <ul v-if="lps != undefined && lps.length">
      <li v-for="lp in lps" :key="lp.id">
        <img :src="lp.portadaUrl" :alt="lp.titulo" />
        <span>{{lp.titulo + ' ' + lp.anoEdicion}}</span>
      </li>
    </ul>
    <p>
      <router-link to="/login">Logout</router-link>
    </p>
  </div>
</template>

<script>
import { router } from "../_helpers";
import { userService } from "../_services";
import { EventBus } from "../event-bus.js";

let usuaria;
let lps;

export default {
  data() {
    return {
      usuaria,
      lps
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      usuaria = JSON.parse(localStorage.getItem("user"));
      lps = JSON.parse(localStorage.getItem("collection"));
      if (lps == undefined) {
        lps = await userService.getCollection(usuaria.username);
      }

      next();
    } catch (errorDevuelto) {
      EventBus.$emit("error-carga-lps", errorDevuelto);
    }
  }
};
</script>