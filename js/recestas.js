// Capturamos el input donde el usuario escribe su búsqueda
const input = document.querySelector("#searchInput");

// Capturamos el botón que el usuario presiona para buscar
const button = document.querySelector("#search");

const recet = document.querySelector("#crear");
recet.addEventListener("click",)

// Cuando el usuario hace clic en el botón, llamamos a la función buscarAccion
button.addEventListener("click", buscarAccion);

// Cuando el usuario presiona una tecla en el input
input.addEventListener("keydown", (e) => {
    // Si la tecla que presiona es "Enter", llamamos a buscarAccion
    if (e.key === "Enter") {
        buscarAccion();
    }
});

// Función que normaliza el texto: elimina tildes, convierte en mayúsculas y quita espacios
const normalizarTexto = (texto) => {
    return texto
        .normalize("NFD") // Separa letras de sus acentos
        .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
        .toUpperCase() // Convierte todo a mayúsculas
        .trim(); // Elimina espacios al principio y final
};



    // Si el input está vacío, muestra una alerta y no sigue
if (texto === "") {
    alert("Escribe un simbolo o nombre para buscar");
    return; // Sale de la función
}

