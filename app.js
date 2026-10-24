// app.js
let ejActual = null;
let ultimoId = null;
let textoActual = "";

// Cargar LocalStorage
let stats = JSON.parse(localStorage.getItem('ortografia_stats')) || {};

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
}

function reproducirDictado() {
    if(!ejActual) return;
    window.speechSynthesis.cancel();
    let speech = new SpeechSynthesisUtterance(ejActual.pregunta);
    speech.lang = 'es-ES';
    window.speechSynthesis.speak(speech);
}

// Logica del Teclado Virtual
function teclear(letra) {
    textoActual += letra;
    document.getElementById('pantalla-texto').innerText = textoActual;
}

function borrarLetra() {
    textoActual = textoActual.slice(0, -1);
    document.getElementById('pantalla-texto').innerText = textoActual;
}

function obtenerSiguienteEjercicio() {
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

    let posibles = [];
    if (peorCategoria && Math.random() < 0.5) {
        posibles = EJERCICIOS.filter(ej => ej.categoria === peorCategoria && ej.id !== ultimoId);
    }
    if (posibles.length === 0) {
        posibles = EJERCICIOS.filter(ej => ej.id !== ultimoId);
    }
    if (posibles.length === 0) posibles = EJERCICIOS;

    return posibles[Math.floor(Math.random() * posibles.length)];
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
    ultimoId = ejActual.id;
    
    document.getElementById('ej-categoria').textContent = ejActual.categoria;
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
        // Modalidad completar o dictado (Usan el Teclado Virtual)
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
    const esCorrecto = (respuestaUsuario.trim().toLowerCase() === ejActual.respuesta.toLowerCase());
    
    // Guardar stats
    stats[ejActual.categoria].intentos += 1;
    if (esCorrecto) stats[ejActual.categoria].aciertos += 1;
    localStorage.setItem('ortografia_stats', JSON.stringify(stats));
    
    // Ocultar zonas activas
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
    document.getElementById('fb-explicacion').innerHTML = `<strong>Regla:</strong> ${ejActual.explicacion}`;
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

// Inicializar
inicializarStats();
cargarEjercicio();
