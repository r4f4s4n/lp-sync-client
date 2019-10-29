<template>
  <div class="wrapper">
    <!--
        <div class="wrapper-vinilo">
      <div class="vinilo" :class="loading ? 'vinyl-rotate' : ''"></div>
      <div class="wrapper-aguja">
      <div class="aguja" :class="loading ? 'needle-movement' : ''"></div>
    </div></div>-->

    <img class="vinilo" :class="loading ? 'vinyl-rotate' : ''" src="../_assets/vinilo.png" />
    <img class="aguja" src="../_assets/aguja.png" />

    <div class="panel-login">
      <h1>Login</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <button class="btn-acceso">Click</button>
        </div>
        <div class="contenedor-usuario">
          <label for="username">Producido por</label>
          <input type="text" v-model="username" name="username" class="input-usuario" />
          <div class="input-usuario-error">
            <span v-if="submitted && !username">Introduce el usuario</span>
            <span v-else>&nbsp;</span>
          </div>
        </div>

        <div id="sticker" v-if="error" class="animate-sticker">
          <div class="reveal note-wrapper">
            <div class="note">
              <div class="texto-error">
                <p>
                  <span v-html="error"></span>
                </p>
              </div>
            </div>
          </div>

          <div class="sticky animate-sticker">
            <div class="front note-wrapper animate-sticker">
              <div class="note animate-sticker"></div>
            </div>
          </div>

          <h4>Error</h4>

          <div class="sticky animate-sticker">
            <div class="back note-wrapper animate-sticker">
              <div class="note animate-sticker"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { router } from "../_helpers";
import { userService } from "../_services";
import { EventBus } from "../event-bus.js";

export default {
  data() {
    return {
      username: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      error: ""
    };
  },
  created() {
    // reset login status
    userService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.$route.query.returnUrl || "/";

    // Escuchador del error de carga de LPs
    EventBus.$on("error-carga-lps", errorDevuelto => {
      this.loading = false;
      this.submitted = false;
      this.error = errorDevuelto;
    });
  },
  methods: {
    handleSubmit(e) {
      this.error = "";
      this.submitted = true;
      const { username } = this;

      // stop here if form is invalid
      if (!username) {
        return;
      }

      this.loading = true;
      userService.login(username).then(
        user => router.push(this.returnUrl),
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }
};
</script>

<style scope>
@font-face {
  font-family: "Bellybottom";
  src: url("../../static/bellybeans.ttf");
}

body {
  overflow-x: hidden;
  overflow: hidden;
  background-image: url("../_assets/wood.jpg");
  height: 100%;
}

.wrapper-vinilo {
  float: left;
  width: 80%;
}

.wrapper-aguja {
  float: right;
  width: 20%;
}

.vinilo,
.aguja,
.panel-login,
.btn-acceso {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.vinilo {
  z-index: 1;
  height: 100vh;
}

.aguja {
  z-index: 2;
  height: 90vh;
}

.panel-login,
.input-usuario {
  font-family: "Bellybottom";
  color: rgb(0, 73, 182);
}

.panel-login {
  width: 300px;
  height: 300px;
  border: 1px solid #cecece;
  border-radius: 50%;
  justify-items: center;
  padding: 20px;
  display: grid;
  background: #dfc800;
  z-index: 3;
}

.btn-acceso,
.input-usuario {
  outline: none;
}

.btn-acceso {
  background-color: black;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  border: none;
  cursor: pointer;
  color: #cecece;
}

.contenedor-usuario {
  text-align: center;
  margin-top: 100px;
}

.input-usuario {
  margin-left: 10px;
  font-size: 20px;
  border-top: none;
  border-right: none;
  border-left: none;
  background: transparent;
  width: 50%;
}

.input-usuario-error {
  margin-left: 90px;
  color: rgb(168, 53, 38);
}

.animate-sticker {
  transition: all 750ms ease-in-out;
}
#sticker,
#sticker .sticky,
#sticker .note-wrapper,
#sticker .note,
#sticker h4 {
  position: absolute;
}

#sticker {
  width: 200px;
  height: 200px;
  backface-visibility: hidden;
  color: white;
  font-weight: bold;
}

#sticker .sticky {
  top: 0;
  left: 0;
  width: 180px;
  height: 180px;
}

#sticker .reveal .note {
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.15);
  font-family: arial;
  font-weight: 200;
  cursor: pointer;
}

#sticker .reveal .note {
  background: #f89f9f;
  position: relative;
}

#sticker .reveal .note .texto-error {
  color: black;
  font-size: 10px;
  position: absolute;
  top: 0;
  padding: 5px;
}

#sticker .reveal .note .texto-error p {
  word-break: break-all;
  height: 110%;
}

#sticker .note-wrapper {
  width: 180px;
  height: 180px;
  left: 0px;
  top: 0px;
  overflow: hidden;
}

#sticker .note {
  width: 140px;
  height: 140px;
  margin: 20px;
  border-radius: 10px;
}

#sticker .back {
  height: 10px;
  top: 30px;
}

#sticker:hover .back {
  height: 90px;
  top: 110px;
}

#sticker .back .note {
  margin-top: -130px;
  background-color: #da3a3a;
  background-image: -webkit-linear-gradient(
    bottom,
    #da3a3a27,
    rgba(255, 255, 255, 0.8)
  );
}

#sticker:hover .back .note {
  margin-top: -50px;
}

#sticker .front {
  height: 150px;
  bottom: 0;
  top: auto;
  box-shadow: 0 -140px 20px -140px rgba(0, 0, 0, 0.3);
}

#sticker:hover .front {
  height: 70px;
  box-shadow: 0 -60px 10px -60px rgba(0, 0, 0, 0.1);
}

#sticker .front .note {
  margin-top: -10px;
  background-color: #da3a3a;
  background-image: -webkit-linear-gradient(
    bottom,
    rgba(251, 236, 63, 0) 75%,
    #b14848 95%
  );
  background-image: -moz-linear-gradient(
    bottom,
    rgba(251, 236, 63, 0) 75%,
    #b14848 95%
  );
  background-image: linear-gradient(
    bottom,
    rgba(251, 236, 63, 0) 75%,
    #b14848 95%
  );
}

#sticker h4 {
  font-family: arial;
  font-weight: 200;
  text-align: center;
  width: 180px;
  height: 140px;
  line-height: 140px;
  transition: opacity 50ms linear 400ms;
}

#sticker:hover h4 {
  opacity: 0;
  transition: opacity 50ms linear 300ms;
}

#sticker:hover .front .note {
  margin-top: -90px;
  background-color: #da3a3a;
  background-position: 0 100px;
}

.vinyl-rotate {
  -webkit-animation: vinyl-rotate 1.5s linear 0.3s infinite both;
  animation: vinyl-rotate 1.5s linear 0.3s infinite both;
}

/* ----------------------------------------------
 * Generated by Animista on 2019-10-23 9:22:52
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation vinyl-rotate
 * ----------------------------------------
 */
@-webkit-keyframes vinyl-rotate {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes vinyl-rotate {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* Needle rotate */
.needle-movement {
  -webkit-animation: needle-movement 1s linear both;
  animation: needle-movement 1s linear both;
}

/* ----------------------------------------------
 * Generated by Animista on 2019-10-23 10:26:18
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation needle-movement
 * ----------------------------------------
 */
@-webkit-keyframes needle-movement {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
    -webkit-transform-origin: left;
    transform-origin: left;
  }
  100% {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-transform-origin: left;
    transform-origin: left;
  }
}
@keyframes needle-movement {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
    -webkit-transform-origin: left;
    transform-origin: left;
  }
  100% {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-transform-origin: left;
    transform-origin: left;
  }
}
</style>
