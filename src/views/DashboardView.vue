<script setup>
import { reactive, ref, onMounted, watch } from "vue";
defineEmits(["cerrar-sesion"]);
const articles = ref([]);
let titleN = ref([]);

let new_a = reactive({
  title: "",
  description: "",
  urlToImage: "",
  url: "",
});

let band = reactive({
  news: true,
});

watch(
  articles,
  () => {
    guardarLocalStorage();
  },
  {
    deep: true,
  }
);
const guardarLocalStorage = () => {
  localStorage.setItem("articles", JSON.stringify(articles));
};

onMounted(() => {
  const apiKey = "884a3f573a2f414ca9342eb7f1b38840";
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  //Se consume la api de news
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Verificar si la imagen es null antes de agregarla
      const filteredArticles = data.articles.filter(
        (article) => article.urlToImage !== null
      );

      articles.value = filteredArticles;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
//Se cargan los datos al editar o se valida si es agregar
function validarAgregarEditar(title, title_id) {
  titleN.value = title;
  band.news = false;
  if (title == "Editar") {
    const dataEdit = articles.value.filter(
      (article) => article.title === title_id
    )[0];
    new_a.title = dataEdit.title;
    new_a.description = dataEdit.description;
    new_a.urlToImage = dataEdit.urlToImage;
    new_a.url = dataEdit.url;
  } else {
    new_a = [];
  }
}
//Se agrega una nueva noticia o se edita dependiendo la selección
function agregarNoticias(titleN, titleData) {
  if (titleN === "Editar") {
    articles.value = articles.value.filter(
      (article) => article.title !== titleData
    );
    articles.value.push(new_a);
    band.news = true;
    new_a = [];
  } else {
    articles.value.push(new_a);
    band.news = true;
    new_a = [];
  }
  Swal.fire("Ok!", "Noticia guardada con éxito.", "success");
}
//Se elimina la noticia seleccionada
function eliminarDta(titleData) {
  articles.value = articles.value.filter(
    (article) => article.title !== titleData
  );
  Swal.fire("Ok!", "Noticia eliminada con éxito.", "success");
}
</script>

<template>
  <div class="header">
    <h2>Noticias <i class="bi bi-newspaper"></i></h2>
    <button class="btn btn-success" @click="validarAgregarEditar('Agregar', 'null')">
      Agregar <i class="bi bi-plus-circle"></i>
    </button>
    <button class="btn btn-secondary" @click="$emit('cerrar-sesion')">
      Cerrar sesión <i class="bi bi-box-arrow-left"></i>
    </button>
  </div>
  <div class="container mt-5">
    <div class="row row-cols-1 row-cols-md-3 g-4" v-if="band.news">
      <div class="col" v-for="items in articles" :key="items.id">
        <div class="card">
          <img
            class="card-img-top"
            :src="items.urlToImage"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{{ items.title }}</h5>
            <p class="card-text">{{ items.description }}</p>
            <a :href="items.url" target="_blank" class="btn btn-primary"
              ><i class="bi bi-info-circle"></i> Ver más </a
            >&nbsp;
            <button
              class="btn btn-secondary"
              @click="validarAgregarEditar('Editar', items.title)"
            >
              <i class="bi bi-pencil-square"></i></button
            >&nbsp;
            <button class="btn btn-danger" @click="eliminarDta(items.title)">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-8 m-auto">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-5">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="band.news = true"
                >
                  <i class="bi bi-arrow-left-short"></i> Regresar
                </button>
              </div>
              <div class="col-7">
                <h5 class="card-title justify-content-center">
                  {{ titleN }} noticia
                </h5>
              </div>
            </div>
            <div class="mb-3 mt-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Título:</label
              >
              <input
                type="text"
                class="form-control"
                v-model="new_a.title"
                :disabled="titleN==='Editar'"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Descripción:</label
              >
              <textarea
                class="form-control"
                rows="3"
                v-model="new_a.description"
              ></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Url Imagen:</label>
              <input
                type="text"
                class="form-control"
                v-model="new_a.urlToImage"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Url noticia:</label>
              <input type="text" class="form-control" v-model="new_a.url" />
            </div>
            <button
              type="button"
              class="btn btn-success mt-2"
              @click="agregarNoticias(titleN, new_a.title)"
            >
              Guardar <i class="bi bi-save-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.header {
  background-color: #a8bae3;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 40px 150px;
}
</style>
