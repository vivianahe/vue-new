
<script setup>
defineEmits(['update:email','update:password','login']);
defineProps(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
    }
);
</script>

<template>
  <form action="" @submit.prevent="login" class="form_iniciar_sesion">
    <div class="card_iniciar_sesion card mt-5">
      <p class="title_iniciar_sesion">Iniciar sesión</p>
      <div class="col-12 mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Correo electrónico</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          @input="$emit('update:email',$event.target.value)"
          :value="email"
          required
        />
      </div>
      <div class="col-12 mb-5">
        <label for="exampleFormControlTextarea1" class="form-label"
          >Contraseña</label
        >
        <input
          type="password"
          class="form-control"
          id="exampleFormControlInput1"
          @input="$emit('update:password',$event.target.value)"
          :value="password"
          required
        />
      </div>
      <div class="col-12 mb-5">
        <button type="submit" class="btn btn-success btn_iniciar_sesion" @click="$emit('login')">Ingresar</button>
      </div>
    </div>
  </form>
</template>


<style  scoped>
.title_iniciar_sesion{
    text-align: center;
    padding: 30px 0;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 30px;
  }
  .form_iniciar_sesion{
    margin: 70px 0;

    border-radius:15px;
    width: 40%;
    margin: auto;
}
.card_iniciar_sesion{
    padding: 40px;
}
.btn_iniciar_sesion{
    display: flex;
    justify-content: center;
    margin: auto;
}


</style>
