// Clave API de RAWG integrada
const API_KEY = 'be359b624fbc470190c657e8f7f5c0f7'; 
const BASE_URL = 'https://api.rawg.io/api';
const contenedor = document.getElementById('app');

// Función auxiliar para mostrar alertas de SweetAlert2
function mostrarNotificacion(titulo, texto, icono = 'info') {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,
    confirmButtonText: 'Aceptar'
  });
}

// -------------------------------------------------------------
// METODOS INTEGRANTE 1: JUEGOS Y BUSQUEDA
// -------------------------------------------------------------
// Método 1: Lista de videojuegos principales
async function obtenerJuegos() {
  try {
    const res = await fetch(`${BASE_URL}/games?key=${API_KEY}`);
    const data = await res.json();
    mostrarJuegosEnPantalla(data.results);
    mostrarNotificacion('¡Éxito!', 'Juegos cargados correctamente', 'success');
  } catch (error) {
    mostrarNotificacion('Error', 'No se pudieron cargar los juegos', 'error');
  }
}

// Método 2: Buscar juego por nombre
async function buscarJuego(nombre) {
  try {
    const res = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${nombre}`);
    const data = await res.json();
    mostrarJuegosEnPantalla(data.results);
  } catch (error) {
    mostrarNotificacion('Error', 'Error en la búsqueda', 'error');
  }
}

function mostrarJuegosEnPantalla(juegos) {
  contenedor.innerHTML = '';
  juegos.forEach(juego => {
    contenedor.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card bg-secondary text-white h-100">
          <img src="${juego.background_image || 'https://via.placeholder.com/300'}" class="card-img-top" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${juego.name}</h5>
            <p class="card-text">Rating: ⭐ ${juego.rating}</p>
          </div>
        </div>
      </div>
    `;
  });
}

// -------------------------------------------------------------
//// Trabajo realizado por Erick: Detalles, capturas y creadores,
// -------------------------------------------------------------
// Método 3: Detalle de un juego por ID
async function obtenerDetalleJuego(id) {
  try {
    const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
    const juego = await res.json();
    mostrarNotificacion('Detalle', `${juego.name}: ${juego.description_raw ? juego.description_raw.slice(0, 100) : 'Sin descripción'}`);
  } catch (error) {
    mostrarNotificacion('Error', 'Error al obtener detalle', 'error');
  }
}

// Método 4: Screenshots de un juego
async function obtenerCapturasJuego(id) {
  try {
    const res = await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
    const data = await res.json();
    mostrarNotificacion('Capturas', `Se encontraron ${data.results.length} imágenes`);
  } catch (error) {
    mostrarNotificacion('Error', 'Error al obtener capturas', 'error');
  }
}

// Método 5: Lista de Creadores
async function obtenerCreadores() {
  try {
    const res = await fetch(`${BASE_URL}/creators?key=${API_KEY}`);
    const data = await res.json();
    mostrarNotificacion('Creadores', `Cargados ${data.results.length} creadores`);
  } catch (error) {
    mostrarNotificacion('Error', 'Error al obtener creadores', 'error');
  }
}

// -------------------------------------------------------------
// Trabajo realizado por Yamil: Géneros, plataformas y editores,
// -------------------------------------------------------------
// Método 6: Géneros
async function obtenerGeneros() {
  try {
    const res = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
    const data = await res.json();
    mostrarNotificacion('Géneros', `Se obtuvieron ${data.results.length} géneros`);
  } catch (error) {
    mostrarNotificacion('Error', 'Error al obtener géneros', 'error');
  }
}

// Método 7: Plataformas (Consolas)
async function obtenerPlataformas() {
  try {
    const res = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`);
    const data = await res.json();
    mostrarNotificacion('Plataformas', `Cargadas ${data.results.length} plataformas`);
  } catch (error) {
    mostrarNotificacion('Error', 'Error al obtener plataformas', 'error');
  }
}

// Método 8: Editores (Publishers)
async function obtenerEditores() {
  try {
    const res = await fetch(`${BASE_URL}/publishers?key=${API_KEY}`);
    const data = await res.json();
    mostrarNotificacion('Editores', `Cargados ${data.results.length} editores`);
  } catch (error) {
    mostrarNotificacion('Error', 'Error al obtener editores', 'error');
  }
}

// -------------------------------------------------------------
// Trabajo realizado por Leo: Tiendas y etiquetas,
// -------------------------------------------------------------
// Método 9: Tiendas
async function obtenerTiendas() {
  try {
    const res = await fetch(`${BASE_URL}/stores?key=${API_KEY}`);
    const data = await res.json();
    mostrarNotificacion('Tiendas', `Cargadas ${data.results.length} tiendas`);
  } catch (error) {
    mostrarNotificacion('Error', 'Error al obtener tiendas', 'error');
  }
}

// Método 10: Etiquetas (Tags)
async function obtenerEtiquetas() {
  try {
    const res = await fetch(`${BASE_URL}/tags?key=${API_KEY}`);
    const data = await res.json();
    mostrarNotificacion('Etiquetas', `Cargadas ${data.results.length} etiquetas`);
  } catch (error) {
    mostrarNotificacion('Error', 'Error al obtener etiquetas', 'error');
  }
}

// Carga inicial al abrir la página
obtenerJuegos();
