import app from "./app";

const PORT = process.env.PORT || 3000; // Definimos el puerto en el que se ejecutará la aplicación

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`); // Mostramos un mensaje en la consola cuando el servidor está listo
});
// Este archivo es el punto de entrada de la aplicación, donde se inicia el servidor Express.
