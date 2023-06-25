<script setup>
import { reactive, watch, onMounted } from "vue";
import LoginView from "./views/LoginView.vue";
import DashboardView from "./views/DashboardView.vue";

let entry = reactive({
  ingreso: true,
});

const user = reactive({
  email: "",
  password: "",
});
//Escuchador del estado de entry para realizar la validación de logueo
watch(
  entry,
  () => {
    guardarLocalStorage();
  },
  {
    deep: true,
  }
);
onMounted(() => {
  const entryStorage = localStorage.getItem("entry");
  if (entryStorage) {
    entry.ingreso = JSON.parse(entryStorage);
  }
});
//Se guarda variable local que valida estado de sesión
const guardarLocalStorage = () => {
  localStorage.setItem("entry", JSON.stringify(entry.ingreso));
};

//Se comparan los valores de los input para iniciar sesión
function login() {
  if (user.email == "vivianaherrera@gmail.com" && user.password == "123") {
    entry.ingreso = false;
  } else {
    Swal.fire("Atención!", "Usuario o contraseña incorrectos.", "warning");
  }
}
//Se cambia el estado de la variable de la sesión
function cerrarSesion() {
  entry.ingreso = true;
}
</script>

<template>
  <div v-if="entry.ingreso == true">
    <LoginView
      v-model:email="user.email"
      v-model:password="user.password"
      @login="login"
    />
  </div>
  <div v-else>
    <DashboardView @cerrar-sesion="cerrarSesion" />
  </div>
</template>
