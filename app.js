// 1. Registrar Service Worker para Modo Offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

let ejActual = null;
let textoActual = "";

// Cargar LocalStorage
let stats = JSON.parse(localStorage.getItem('ortografia_stats')) || {};
let historialErrores = JSON.parse(localStorage.getItem('ortografia_errores')) || [];

function inicializarStats() {
    EJERCICIOS.forEach(ej => {
        if (!stats[ej.categoria]) {
            stats[ej.categoria] = { intentos: 0, aciertos: 0 };
        }
    });
    localStorage.setItem('ortografia_stats', JSON.stringify(stats));
}

function switchTab(tabId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    document.getElementById('view-' + tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    if(tabId === 'practica' && !ejActual) cargarEjercicio();
    if(tabId === 'diagnostico') cargarDiagnostico();
    if(tabId === 'errores') cargarErrores();
}

function reproducirDictado() {
    if(!ejActual) return;
    window.speechSynthesis.cancel();
    let speech = new SpeechSynthesisUtterance(ejActual.pregunta);
    speech.lang = 'es-ES';
    window.speechSynthesis.speak(speech);
}

// Lógica del Teclado Virtual
function teclear(letra) {
    textoActual += letra;
    document.getElementById('pantalla-texto').innerText = textoActual;
}

function borrarLetra() {
    textoActual = textoActual.slice(0, -1);
    document.getElementById('pantalla-texto').innerText = textoActual;
}

// SISTEMA DE CICLO Y BLOQUEO DE PREGUNTAS
function obtenerSiguienteEjercicio() {
    let pendientesIds = JSON.parse(localStorage.getItem('ortografia_pendientes'));
    
    // Si no existe la lista o se vació (terminaste el ciclo), la llenamos con todos los IDs
    if (!pendientesIds || pendientesIds.length === 0) {
        pendientesIds = EJERCICIOS.map(ej => ej.id);
        // Si no es la primera vez que se carga, avisamos al usuario del reseteo
        if (localStorage.getItem('ortografia_pendientes') !== null) {
            alert("¡Felicidades! Has completado todas las palabras del diccionario. El ciclo se reiniciará para que sigas practicando.");
        }
    }

    // Buscamos la peor categoría para priorizar el aprendizaje
    let peorCategoria = null;
    let peorRendimiento = 101;
    for (const [cat, data] of Object.entries(stats)) {
        if (data.intentos > 0) {
            let rendimiento = (data.aciertos / data.intentos) * 100;
            if (rendimiento < peorRendimiento) {
                peorRendimiento = rendimiento;
                peorCategoria = cat;
            }
        }
    }

    let idElegido = null;
    
    // Filtrar los IDs pendientes que pertenecen a la peor categoría
    let posiblesPeorCat = pendientesIds.filter(id => {
        let ej = EJERCICIOS.find(e => e.id === id);
        return ej && ej.categoria === peorCategoria;
    });

    // 50% de probabilidad de dar una pregunta de la peor categoría (si quedan disponibles)
    if (posiblesPeorCat.length > 0 && Math.random() < 0.5) {
        idElegido = posiblesPeorCat[Math.floor(Math.random() * posiblesPeorCat.length)];
    } else {
        // Sino, elegimos cualquier pregunta pendiente al azar
        idElegido = pendientesIds[Math.floor(Math.random() * pendientesIds.length)];
    }

    // Bloqueamos la pregunta actual eliminándola de la lista de pendientes
    pendientesIds = pendientesIds.filter(id => id !== idElegido);
    localStorage.setItem('ortografia_pendientes', JSON.stringify(pendientesIds));

    // Retornamos el objeto completo del ejercicio elegido
    return EJERCICIOS.find(ej => ej.id === idElegido);
}

function cargarEjercicio() {
    document.getElementById('area-feedback').style.display = 'none';
    document.getElementById('area-ejercicio').style.display = 'block';
    document.getElementById('ui-dictado').style.display = 'none';
    document.getElementById('area-opciones').style.display = 'none';
    document.getElementById('area-texto-libre').style.display = 'none';
    
    textoActual = "";
    document.getElementById('pantalla-texto').innerText = "";
    document.getElementById('area-opciones').innerHTML = "";
    
    ejActual = obtenerSiguienteEjercicio();
    
    // Mostrar cuantas faltan en el ciclo
    let quedan = JSON.parse(localStorage.getItem('ortografia_pendientes')).length;
    document.getElementById('ej-categoria').textContent = `${ejActual.categoria} (Faltan: ${quedan})`;
    
    const ejPregunta = document.getElementById('ej-pregunta');
    
    if (ejActual.tipo === 'opcion') {
        ejPregunta.textContent = ejActual.pregunta;
        document.getElementById('area-opciones').style.display = 'block';
        
        let opciones = [...ejActual.opciones].sort(() => Math.random() - 0.5);
        opciones.forEach(op => {
            let btn = document.createElement('button');
            btn.className = 'btn-opcion';
            btn.textContent = op;
            btn.onclick = () => procesarRespuesta(op, btn);
            document.getElementById('area-opciones').appendChild(btn);
        });
    } else {
        document.getElementById('area-texto-libre').style.display = 'block';
        document.getElementById('teclado-virtual').style.display = 'block';
        
        if (ejActual.tipo === 'dictado') {
            ejPregunta.textContent = "¿Qué palabra escuchas?";
            document.getElementById('ui-dictado').style.display = 'block';
            reproducirDictado();
        } else {
            ejPregunta.textContent = ejActual.pregunta;
        }
    }
}

function comprobarTextoLibre() {
    if (textoActual.trim() === "") return;
    procesarRespuesta(textoActual, null);
}

function procesarRespuesta(respuestaUsuario, botonPresionado = null) {
    const respLimpia = respuestaUsuario.trim().toLowerCase();
    const corrLimpia = ejActual.respuesta.toLowerCase();
    const esCorrecto = (respLimpia === corrLimpia);
    
    // Analizador de Tildes
    let detalleError = "";
    if (!esCorrecto) {
        const respSinTildes = respLimpia.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const corrSinTildes = corrLimpia.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        if (respSinTildes === corrSinTildes) {
            detalleError = "<br><br><span style='color: #b91c1c;'>⚠️ <strong>Detalle:</strong> Tienes las letras correctas, pero te equivocaste en la <strong>tilde</strong>.</span>";
        }
    }
    
    // Guardar Estadísticas
    stats[ejActual.categoria].intentos += 1;
    if (esCorrecto) {
        stats[ejActual.categoria].aciertos += 1;
    } else {
        historialErrores.unshift({
            categoria: ejActual.categoria,
            pregunta: ejActual.pregunta,
            yo_escribi: respLimpia,
            era_correcta: corrLimpia
        });
        if (historialErrores.length > 50) historialErrores.pop();
        localStorage.setItem('ortografia_errores', JSON.stringify(historialErrores));
    }
    
    localStorage.setItem('ortografia_stats', JSON.stringify(stats));
    
    document.getElementById('teclado-virtual').style.display = 'none';
    if(botonPresionado) {
        document.querySelectorAll('.btn-opcion').forEach(b => b.disabled = true);
        botonPresionado.style.background = esCorrecto ? '#d1fae5' : '#fee2e2';
        botonPresionado.style.borderColor = esCorrecto ? 'var(--success)' : 'var(--error)';
    }
    
    document.getElementById('area-ejercicio').style.display = 'none';
    const fb = document.getElementById('area-feedback');
    fb.style.display = 'block';
    fb.className = 'feedback ' + (esCorrecto ? 'correct' : 'incorrect');
    
    document.getElementById('fb-titulo').textContent = esCorrecto ? "¡Correcto! ✅" : `❌ Era: ${ejActual.respuesta}`;
    document.getElementById('fb-explicacion').innerHTML = `<strong>Regla:</strong> ${ejActual.explicacion} ${detalleError}`;
}

function cargarDiagnostico() {
    const container = document.getElementById('stats-container');
    let html = '';
    
    for (const [cat, data] of Object.entries(stats)) {
        let porcentaje = data.intentos > 0 ? Math.round((data.aciertos / data.intentos) * 100) : 0;
        let color = porcentaje >= 80 ? 'var(--success)' : (porcentaje >= 50 ? '#f59e0b' : 'var(--error)');
        if(data.intentos === 0) { porcentaje = 0; color = '#cbd5e1'; }
        
        let txt = data.intentos === 0 ? "Faltan datos" : `${porcentaje}% (Bien: ${data.aciertos}/${data.intentos})`;
        
        html += `
            <div style="margin-bottom: 20px;">
                <div class="stat-row">
                    <span>${cat}</span>
                    <span style="color:${color}">${txt}</span>
                </div>
                <div class="stat-bar-container">
                    <div class="stat-bar" style="width: ${data.intentos > 0 ? porcentaje : 0}%; background-color: ${color};"></div>
                </div>
            </div>`;
    }
    container.innerHTML = html;
}

function generarTextoErrores() {
    if (historialErrores.length === 0) return "No tienes errores registrados aún.";
    let txt = "Analiza estos errores y genérame nuevos ejercicios en formato JSON enfocados en mis debilidades:\n\n";
    historialErrores.forEach((err, i) => {
        txt += `${i+1}. Categoría: [${err.categoria}]\n`;
        txt += err.pregunta.includes("¿") ? `   Audio/Dictado\n` : `   Pregunta: "${err.pregunta}"\n`;
        txt += `   Yo escribí: "${err.yo_escribi}" | Correcto: "${err.era_correcta}"\n\n`;
    });
    return txt;
}

function cargarErrores() {
    document.getElementById('texto-errores').textContent = generarTextoErrores();
}

function copiarErrores() {
    navigator.clipboard.writeText(generarTextoErrores()).then(() => {
        alert("¡Texto copiado!");
    }).catch(() => alert("Error al copiar."));
}

function limpiarErrores() {
    if(confirm("¿Borrar historial de errores?")) {
        historialErrores = [];
        localStorage.setItem('ortografia_errores', JSON.stringify(historialErrores));
        cargarErrores();
    }
}

inicializarStats();
cargarEjercicio();
          
