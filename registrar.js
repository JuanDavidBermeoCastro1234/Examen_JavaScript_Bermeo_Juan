let recetas = JSON.parse(localStorage.getItem('recetas')) || [];

const categoriasValidas = ["Desayuno", "Almuerzo", "Cena", "Postre"];
const dificultadesValidas = ["Fácil", "Medio", "Difícil"];

function guardarEnStorage() {
    localStorage.setItem('recetas', JSON.stringify(recetas));
}

function registrar() {
    const nombre = prompt('Nombre de la receta:');
    if (!nombre || nombre.trim() === "") {
        alert("El nombre no puede estar vacío.");
        return;
    }

    const ingredientes = prompt('Ingredientes (separados por comas):');
    const instrucciones = prompt('Instrucciones de preparación:');

    let tiempoPreparacion = prompt('Tiempo de preparación (en minutos):');
    if (isNaN(tiempoPreparacion) || Number(tiempoPreparacion) <= 0) {
        alert("El tiempo debe ser un número positivo.");
        return;
    }

    let porciones = prompt('Número de porciones:');
    if (!Number.isInteger(Number(porciones)) || Number(porciones) <= 0) {
        alert("El número de porciones debe ser un entero positivo.");
        return;
    }

    let categoria = prompt('Categoría (Desayuno, Almuerzo, Cena, Postre):');
    if (!categoriasValidas.includes(categoria)) {
        alert("Categoría inválida. Debe ser: " + categoriasValidas.join(", "));
        return;
    }

    let dificultad = prompt('Dificultad (Fácil, Medio, Difícil):');
    if (!dificultadesValidas.includes(dificultad)) {
        alert("Dificultad inválida. Debe ser: " + dificultadesValidas.join(", "));
        return;
    }

    const nuevaReceta = {
        id: Date.now(),
        Nombre: nombre,
        ingredientes,
        Instrucciones: instrucciones,
        tiempoPreparacion: Number(tiempoPreparacion),
        porciones: Number(porciones),
        Categoría: categoria,
        dificultad
    };

    recetas.push(nuevaReceta);
    guardarEnStorage();
    console.log("Receta registrada:", nuevaReceta);
    alert("Receta registrada exitosamente.");
}

function actualizarReceta(id) {
    const receta = recetas.find(r => r.id === id);
    if (!receta) return;

    receta.Nombre = prompt('Nuevo nombre:', receta.Nombre) || receta.Nombre;
    receta.ingredientes = prompt('Nuevos ingredientes:', receta.ingredientes) || receta.ingredientes;
    receta.Instrucciones = prompt('Nuevas instrucciones:', receta.Instrucciones) || receta.Instrucciones;

    let nuevoTiempo = prompt('Nuevo tiempo de preparación:', receta.tiempoPreparacion);
    if (!isNaN(nuevoTiempo) && Number(nuevoTiempo) > 0) receta.tiempoPreparacion = Number(nuevoTiempo);

    let nuevasPorciones = prompt('Nuevo número de porciones:', receta.porciones);
    if (!isNaN(nuevasPorciones) && Number(nuevasPorciones) > 0 && Number.isInteger(Number(nuevasPorciones))) receta.porciones = Number(nuevasPorciones);

    let nuevaCategoria = prompt('Nueva categoría:', receta.Categoría);
    if (categoriasValidas.includes(nuevaCategoria)) receta.Categoría = nuevaCategoria;

    let nuevaDificultad = prompt('Nueva dificultad:', receta.dificultad);
    if (dificultadesValidas.includes(nuevaDificultad)) receta.dificultad = nuevaDificultad;

    guardarEnStorage();
    alert("Receta actualizada exitosamente.");
}

function eliminarReceta(id) {
    recetas = recetas.filter(r => r.id !== id);
    guardarEnStorage();
    alert("Receta eliminada exitosamente.");
}

export { registrar, recetas, actualizarReceta, eliminarReceta };
