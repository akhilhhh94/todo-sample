<template>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div v-if="signUp" class="fadeIn first">
        <h3 style="padding: 30px">Registration</h3>
      </div>
      <div v-else class="fadeIn first">
        <h3 style="padding: 30px">Login</h3>
      </div>

      <!-- registration Form -->
      <form @submit.prevent="createAccount()" v-if="signUp">
        <input
          type="email"
          id="login"
          class=""
          required
          name="login"
          placeholder="email"
          v-model="reg.email"
        />
        <input
          type="password"
          id="password"
          class=""
          required
          name="login"
          v-model="reg.password"
          placeholder="password"
        />
        <input
          type="text"
          id="login"
          class=""
          required
          name="First Name"
          placeholder="First Name"
          v-model="reg.firstName"
        />
        <input
          type="text"
          id="login"
          class=""
          required
          name="First Name"
          placeholder="First Name"
          v-model="reg.lastName"
        />
        <input type="submit" class="fadeIn fourth" value="Sign Up!" />
      </form>
      <form @submit.prevent="onSubmit()" v-else>
        <input
          type="email"
          id="login"
          class=""
          required
          name="login"
          placeholder="email"
          v-model="loginform.email"
        />
        <input
          type="password"
          id="password"
          class=""
          required
          name="login"
          v-model="loginform.password"
          placeholder="password"
        />
        <input type="submit" class="fadeIn fourth" value="Log In" />
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <a
          v-if="signUp"
          class="underlineHover"
          @click.prevent="signup(false)"
          href="#"
          >Login</a
        >
        <a v-else class="underlineHover" @click.prevent="signup(true)" href="#"
          >Sign Up</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginform: {
        email: "",
        password: "",
      },
      reg: {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
      },
      signUp: false,
      inProgress: false,
    };
  },

  methods: {
    async onSubmit() {
      if (!this.inProgress) {
        this.inProgress = true;
      } else {
        return;
      }
      try {
        await this.$auth
          .loginWith("local", {
            data: {
              email: this.loginform.email,
              password: this.loginform.password,
            },
          })
          .then(async (res) => {
            this.$toast.success("Logged In!");
            //  this.$router.push('/') // redirecting after login
          })
          .catch((err) => {
            this.inProgress = false;
            this.$toast.error("Login Failed!");
            console.log(err);
          });

        console.log("Logged in successfully", "success");
      } catch (error) {
        this.inProgress = false;
        console.log(error);
        if (error.response) {
          console.log(error.response);
        } else console.log("Incorrect Email or Password", "error");
      }
    },
    signup(val) {
      this.signUp = val;
    },
    hasWhiteSpace(s) {
      return s.indexOf(" ") >= 0;
    },
    async createAccount() {
      if (this.hasWhiteSpace(this.reg.password)) {
           this.$toast.success("Spaces are not accepting in password field", {
            duration: "2000",
            fullWidth: true,
          });
          return;
      }
      if (!this.inProgress) {
        this.inProgress = true;
      } else {
        return;
      }
      await this.$axios
        .$post("auth/register", this.reg)
        .then(() => {
          this.inProgress = false;
          this.$toast.success("Registration success. Please login!", {
            duration: "2000",
            fullWidth: true,
          });
          this.reg = {
            firstName: "",
            lastName: "",
            password: "",
            email: "",
          };
          this.signUp = false;
        })
        .catch((err) => {
          this.inProgress = false;
          if (err.response.data) {
            var errcode = err.response.data;
            if (errcode.data.length) {
              this.$toast.error(errcode.data[0]["msg"], {
                duration: "1200",
                fullWidth: true,
              });
            } else {
              this.$toast.error("Registration Failed!");
            }
          } else {
            this.$toast.error("Registration Failed!");
          }
        });
    },
  },
};
</script>
<style lang="css" scoped>
html {
  background-color: #56baed;
}

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
  height: 100vh;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #39ace7;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type="text"],
input[type="email"],
input[type="password"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type="text"]:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 60%;
}
</style>
