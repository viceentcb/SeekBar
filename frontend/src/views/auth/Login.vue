<template>
  <ion-page class="sb-login-page">
    <section>
      <article>
        <img
          class="sb-login-page--logo"
          v-bind:src="imageSrc"
          :alt="'logo seekBar'"
          :content="'Logo blanco SeekBAR'"
        />
      </article>
      <article>
        <ion-title class="sb-login-page--title">INICIAR SESIÓN</ion-title>
        <ion-button color="dark" className="sb-login-page--homebtn">
          <a :href="'/home'">INICIO</a>
        </ion-button>
      </article>
    </section>
    <section>
      <article className="sb-login-page-form">
        <form @submit.prevent="onSubmit(username, password)">
          <input
            class="inputFieldLogin"
            type="username"
            v-model="username"
            placeholder="username"
            required
          />
          <span
            class="inputFieldLogin-error"
            v-if="errors.some((error) => error.name === 'log_username', value)"
            >{{
              errors.filter((error) => error.name === "log_username")[0].value
            }}</span
          >
          <span class="inputFieldLogin-error"
            v-if="errors.some((error) => error.name === 'logUserBack', value)"
            >{{
              errors.filter((error) => error.name === "logUserBack")[0].value
            }}</span
          >

          <input
            class="inputFieldLogin"
            type="password"
            v-model="password"
            placeholder="password"
            required
          />
          <span class="inputFieldLogin-error"
            v-if="errors.some((error) => error.name === 'log_password', value)"
            >{{
              errors.filter((error) => error.name === "log_password")[0].value
            }}</span
          >
          <button class="sb-login-page--loginbtn">INICIAR SESION</button>

          <ion-label class="sb-login-page--account">
            Aún no tienes una cuenta?
            <ion-label class="sb-login-page--signin">
              <a :href="'/register'">Resgistrate</a>
            </ion-label>
          </ion-label>

          <ion-button color="dark" className="sb-login-page--activebtn">
            <a :href="'/activate'">ACTIVAR USUARIO</a>
          </ion-button>
        </form>
      </article>
    </section>
  </ion-page>
</template>

<script>
import { IonPage, IonTitle, IonButton } from "@ionic/vue";
import { mapState } from "vuex";
import { ActionsType } from "@/store/actions.type";
import { LoginFormErrors } from "../../utils/utils";
export default {
  components: { IonPage, IonTitle, IonButton },
  name: "SBlogin",
  data() {
    return {
      errors: [],
      username: null,
      password: null,
    };
  },
  methods: {
    onSubmit(username, password) {
      this.errors = [];
      const regexErrors = LoginFormErrors(this);
      if (regexErrors.length > 0) {
        this.errors = regexErrors;
      } else {
        console.log(username);
        this.$store
          .dispatch(ActionsType.LOGIN, { username, password })
          .then(() => {
            this.$router.push({ name: "SBhome" });
          })
          .catch((response) => {
            response.data.errors.error
              ? this.errors.push({
                  name: "logUserBack",
                  value: response.data.errors.error[0],
                })
              : alert(response.data.errors.error[0]);
          });
      }
    },
  },
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
    }),
    imageSrc: function () {
      return `https://raw.githubusercontent.com/alexzarazuaa/SeekBar/main/frontend/src/assets/img/SEEK_BAR_BLANCO.png`;
    },
  },
};
</script>

<style scoped>
/***************************************
*             LOGIN PAGE               *
***************************************/

/* VARIABLES */

/* :root {
  --align--center: center;
  --margin--auto: auto;
} */

/* PAGE  CONTENT */
.sb-login-page {
  background-color: #fa9950;
  height: 100vh;
  width: 100vw;
}

/* LOGO SEEKBAR */
.sb-login-page--logo {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
}
/* PAGE TITLE */
.sb-login-page--title {
  font-family: Rubik One;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 45px;
  text-align: center;
  color: #000000;
  display: flex;
  justify-content: center;
  margin: 75px auto;
}

/* HOME BTN */

.sb-login-page--homebtn a {
  background-color: black;
  color: white;
  width: 10vw;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  margin: auto;
}
.sb-login-page--activebtn a {
  background-color: black;
  color: white;
  width: 15vw;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  margin: auto;
}

/* LOGIN FORM */
.sb-login-page-form {
  margin-top: 25px;
}
/*  LOGIN INPUTS */
.inputFieldLogin {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  margin: 5px auto 20px;
  width: 20vw;
}
.inputFieldLogin-error {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  margin: 5px auto 20px;
  width: 20vw;
  color:red;
}

/* LOGIN BTN */
.sb-login-page--loginbtn {
  background-color: black;
  color: white;
  width: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  margin: auto;
  margin-top: 15px;
}
.sb-login-page--account {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 25px auto;
  font-size: 20px;
  font-weight: 500;
}
/* SIGN UP LABEL LINK*/

.sb-login-page--signin {
  background-color: transparent;
  margin-left: 5px;
  font-size: 20px;
  font-weight: bold;
}

.sb-login-page--signin a {
  text-decoration: none;
  color: white;
}
/***************************************
*         QUERIES RESPONSIVE           *
***************************************/

@media only screen and (max-width: 980px) and (min-width: 821px) {
  /*  LOGIN INPUTS */
  .inputFieldLogin {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    margin: 5px auto 20px;
    width: 28vw;
  }

  /* LOGIN BTN */
  .sb-login-page--loginbtn {
    background-color: black;
    color: white;
    width: 35vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-top: 15px;
  }
  /* HOME BTN */

  .sb-login-page--homebtn {
    background-color: black;
    color: white;
    width: 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-top: 5px;
  }
  /* LOGO SEEKBAR */
  .sb-login-page--logo {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
  }
}

@media only screen and (max-width: 820px) and (min-width: 621px) {
  /*  LOGIN INPUTS */
  .inputFieldLogin {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    margin: 5px auto 20px;
    width: 35vw;
  }
  /* LOGIN BTN */
  .sb-login-page--loginbtn {
    background-color: black;
    color: white;
    width: 40vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-top: 15px;
  }

  /* HOME BTN */

  .sb-login-page--homebtn {
    background-color: black;
    color: white;
    width: 25vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-top: 5px;
  }

  /* LOGO SEEKBAR */
  .sb-login-page--logo {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  }
  .sb-login-page--activebtn a {
    background-color: black;
    color: white;
    width: 22vw;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
  }
}

@media only screen and (max-width: 620px) and (min-width: 501px) {
  /*  LOGIN INPUTS */
  .inputFieldLogin {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    margin: 5px auto 20px;
    width: 40vw;
  }
  /* LOGIN BTN */
  .sb-login-page--loginbtn {
    background-color: black;
    color: white;
    width: 45vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-top: 15px;
  }
  /* HOME BTN */

  .sb-login-page--homebtn {
    background-color: black;
    color: white;
    width: 15vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-top: 5px;
  }
  /* LOGO SEEKBAR */
  .sb-login-page--logo {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 65%;
  }
  .sb-login-page--activebtn a {
    background-color: black;
    color: white;
    width: 22vw;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
  }
}

@media only screen and (max-width: 500px) and (min-width: 341px) {
  /*  LOGIN INPUTS */
  .inputFieldLogin {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    margin: 5px auto 20px;
    width: 55vw;
  }
  /* LOGIN BTN */
  .sb-login-page--loginbtn {
    background-color: black;
    color: white;
    width: 65vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-top: 15px;
  }
  /* HOME BTN */

  .sb-login-page--homebtn {
    background-color: black;
    color: white;
    width: 25vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-top: 5px;
  }
  /* PAGE TITLE */
  .sb-login-page--title {
    font-family: "Rubik Mono One", sans-serif;
    font-size: 35px;
    font-weight: bold;
    text-align: center;
    margin: 75px auto;
  }
  /* LOGO SEEKBAR */
  .sb-login-page--logo {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
  }
  .sb-login-page--activebtn a {
    background-color: black;
    color: white;
    width: 22vw;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
  }
}

@media only screen and (max-width: 340px) and (min-width: 5px) {
  /*  LOGIN INPUTS */
  .inputFieldLogin {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    margin: 5px auto 20px;
    width: 90vw;
  }
  /* LOGIN BTN */
  .sb-login-page--loginbtn {
    background-color: black;
    color: white;
    width: 95vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-top: 15px;
  }
  /* HOME BTN */

  .sb-login-page--homebtn {
    background-color: black;
    color: white;
    width: 35vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-top: 5px;
  }
  /* PAGE TITLE */
  .sb-login-page--title {
    font-family: "Rubik Mono One", sans-serif;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin: 75px auto;
  }

  /* LOGO SEEKBAR */
  .sb-login-page--logo {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85%;
  }
}
</style>
