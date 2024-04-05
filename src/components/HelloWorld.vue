<template>
  
  <v-container>
    <v-card title="Visitantes" flat>
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
        <br />
        <v-btn
          color="success"
          prepend-icon="mdi-plus"
          size="x-large"
          @click="modalAccion(true, '')"
          title="Agregar Registro"
        >
          Agregar
        </v-btn>
      </template>

      <v-data-table :headers="headers" :items="visitante" :search="search">
        <template v-slot:item.accion="{ item }">
          <v-row align="center" justify="center">
            <v-col cols="auto">
              <v-btn
                density="compact"
                color="red"
                icon="mdi-delete"
                @click="eliminar(item)"
                title="Eliminar Registro"
              ></v-btn>
              &nbsp;
              <v-btn
                density="compact"
                color="warning"
                icon="mdi-pencil"
                @click="modalAccion(false, item)"
                title="Modificar Registro"
              ></v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="900">
      <v-card prepend-icon="mdi-account" :title="tituloModal">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Nombre"
                hint="Escriba el nombre del visitante"
                required
                v-model="inputs.nombre"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                hint="Escriba el apellido del visitante"
                label="Apellido"
                v-model="inputs.apellido"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                hint="Escriba el nro. de cedula del visitante"
                label="Cedula de Identidad"
                v-model="inputs.cedula"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Correo Electronico"
                v-model="inputs.correo"
                required
                type="email"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <!-- <v-text-field
              label="Fecha de Entrada"
              v-model="inputs.fEntrada"
              required
              type="date"
            ></v-text-field> -->
              <VueDatePicker v-model="inputs.fEntrada"></VueDatePicker>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Fecha de Salida"
                v-model="inputs.fSalida"
                required
                type="date"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Guardar"
            variant="tonal"
            @click="agregar(inputs)"
            v-if="tituloModal == 'Agregar Registro'"
          ></v-btn>
          <v-btn
            color="primary"
            text="modificar"
            variant="tonal"
            @click="modificar(inputs)"
            v-else
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const date = ref();
    const formulario = ref({
      id: "",
      name: "",
      calories: "",
      fat: "",
      carbs: "",
      protein: "",
      iron: "",
    });
    return {
      formulario,
      date,
    };
  },
  data() {
    return {
      inputs: {
        nombre: "",
        apellido: "",
        cedula: "",
        correo: "",
        fEntrada: "",
        fSalida: "",
      },
      loading: false,
      dialog: false,
      search: "",
      headers: [
        {
          align: "start",
          key: "nombre",
          title: "Nombres",
        },
        { key: "apellido", title: "Apellidos" },
        { key: "cedula", title: "Cedula de Identidad" },
        { key: "correo", title: "Correo electronico" },
        { key: "fEntrada", title: "Fecha de Entrada" },
        { key: "fSalida", title: "Fecha de Salida" },
        { key: "accion", title: "Accion", sortable: false },
      ],
      visitante: [],
      btnAction: true,
      tituloModal: "",
    };
  },
  //carga la informacion cuando crea la pagina
  created() {
    this.listaData();
  },
  methods: {
    async listaData() {
      this.loading = true;
      this.axios
        .get("https://660d9ef46ddfa2943b34dc36.mockapi.io/curso/visitantes")
        .then((response) => {
          //llena el arreglo con la data que trae la api
          this.visitante = response.data;
          // console.log(response)
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: "algo salio mal!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },

    limpiarForm() {
      this.inputs.id = "";
      this.inputs.nombre = "";
      this.inputs.apellido = "";
      this.inputs.cedula = "";
      this.inputs.correo = "";
      this.inputs.fEntrada = "";
      this.inputs.fSalida = "";
    },

    agregar(items) {
      this.axios
        .post(
          "https://660d9ef46ddfa2943b34dc36.mockapi.io/curso/visitantes",
          this.inputs
        )
        .then((response) => {
          console.log(response);
          this.visitante = [];
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro Guardado",
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialog = false;
          this.listaData();
          this.limpiarForm();
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: "Oops! Algo salio mal",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },

    eliminar(item) {
      const data = { ...item };
      this.$swal
        .fire({
          title: "Esta Seguro?",
          html: `Desea eliminar este registro: <FONT COLOR="magenta"><strong>${item.nombre}</strong></FONT>`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Eliminalo!",
          cancelButtonText: "Cancelar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.axios
              .delete(
                `https://660d9ef46ddfa2943b34dc36.mockapi.io/curso/visitantes/${data.id}`
              )
              .then((response) => {
                console.info(response);
                this.visitante = [];
                this.$swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Registro Eliminado",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.listaData();
              })
              .catch((error) => {
                console.error(error);
                this.$swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Opps! Algo salio mal!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
          }
        });
    },

    async modificar(item) {
      //console.log(error)
      this.axios
        .put(
          `https://660d9ef46ddfa2943b34dc36.mockapi.io/curso/visitantes/${item.id}`,
          item
        ) // Agrega https:// antes de la URL
        .then((response) => {
          //console.log(response)
          this.visitante = [];
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Datos Actualizados exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialog = false;
          this.listaData();
        })
        .catch((error) => {
          //  console.log(error)
          //console.log(error)
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Oops! Algo salio mal",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },

    modalModificar(item) {
      this.inputs.id = item.id;
      this.inputs.nombre = item.nombre;
      this.inputs.apellido = item.apellido;
      this.inputs.cedula = item.cedula;
      this.inputs.correo = item.correo;
      this.inputs.fEntrada = Date(item.fEntrada);
      this.inputs.fSalida = item.fSalida;
      this.dialog = true;
    },

    modalAccion(accion, item) {
      this.dialog = true;
      // console.log(this.inputs, item)
      //true agregar -- false modificar
      if (accion == true) {
        //agregar
        this.inputs.id = "";
        this.inputs.nombre = "";
        this.inputs.apellido = "";
        this.inputs.cedula = "";
        this.inputs.correo = "";
        this.inputs.fEntrada = "";
        this.inputs.fSalida = "";
        this.tituloModal = "Agregar Registro";
      } else {
        //modificar
        this.inputs.id = item.id;
        this.inputs.nombre = item.nombre;
        this.inputs.apellido = item.apellido;
        this.inputs.cedula = item.cedula;
        this.inputs.correo = item.correo;
        this.inputs.fEntrada = item.fEntrada;
        this.inputs.fSalida = item.fSalida;
        this.tituloModal = "Modificar Registro";
      }
    },
  },
};
</script>
