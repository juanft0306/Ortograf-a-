const EJERCICIOS = [
    // B vs V
    { id: 1, categoria: "B/V", tipo: "completar", pregunta: "Escribe el pasado de ir (nosotros í_amos).", opciones: [], respuesta: "íbamos", explicacion: "El verbo 'ir' en pasado siempre se escribe con B." },
    { id: 2, categoria: "B/V", tipo: "opcion", pregunta: "La oveja hace ___.", opciones: ["beee", "veee"], respuesta: "beee", explicacion: "El sonido de la oveja (balar) es con B." },
    { id: 3, categoria: "B/V", tipo: "opcion", pregunta: "El plomero cambió el ___ roto.", opciones: ["tubo", "tuvo"], respuesta: "tubo", explicacion: "Tubo es la pieza hueca. Tuvo es de tener." },
    { id: 4, categoria: "B/V", tipo: "opcion", pregunta: "Ella ___ mucha paciencia.", opciones: ["tuvo", "tubo"], respuesta: "tuvo", explicacion: "Tuvo es el pasado del verbo tener." },
    { id: 5, categoria: "B/V", tipo: "dictado", pregunta: "hervir", opciones: [], respuesta: "hervir", explicacion: "Termina en -vir. Las excepciones de la regla de la B son hervir, servir y vivir." },
    { id: 6, categoria: "B/V", tipo: "opcion", pregunta: "Tienes que ir a ___ en las elecciones.", opciones: ["votar", "botar"], respuesta: "votar", explicacion: "Votar es elegir. Botar es tirar a la basura." },
    { id: 7, categoria: "B/V", tipo: "opcion", pregunta: "No vayas a ___ esa comida.", opciones: ["botar", "votar"], respuesta: "botar", explicacion: "Botar es arrojar algo." },
    
    // C vs S vs Z
    { id: 8, categoria: "C/S/Z", tipo: "opcion", pregunta: "Tomó una ___ importante.", opciones: ["decisión", "desición", "decición"], respuesta: "decisión", explicacion: "Viene de decidir. Se escribe con C y termina en -sión." },
    { id: 9, categoria: "C/S/Z", tipo: "opcion", pregunta: "El león salió a ___.", opciones: ["cazar", "casar"], respuesta: "cazar", explicacion: "Cazar con Z es de atrapar animales." },
    { id: 10, categoria: "C/S/Z", tipo: "opcion", pregunta: "Fue la primera ___ que te vi.", opciones: ["vez", "ves"], respuesta: "vez", explicacion: "Vez con Z es tiempo u ocasión. Ves con S es del verbo ver." },
    { id: 11, categoria: "C/S/Z", tipo: "dictado", pregunta: "excepción", opciones: [], respuesta: "excepción", explicacion: "Primero X, luego C y termina en -ción." },
    { id: 12, categoria: "C/S/Z", tipo: "opcion", pregunta: "Vamos a ___ la carne.", opciones: ["cocer", "coser"], respuesta: "cocer", explicacion: "Cocer con C es cocinar." },
    { id: 13, categoria: "C/S/Z", tipo: "completar", pregunta: "Escribe el plural de lápiz.", opciones: [], respuesta: "lápices", explicacion: "Las palabras terminadas en Z cambian a C en plural." },
    
    // Uso de la H
    { id: 14, categoria: "Uso de H", tipo: "opcion", pregunta: "Lo ha ___ muy bien.", opciones: ["hecho", "echo"], respuesta: "hecho", explicacion: "Hecho con H viene del verbo hacer." },
    { id: 15, categoria: "Uso de H", tipo: "opcion", pregunta: "Yo siempre ___ la basura.", opciones: ["echo", "hecho"], respuesta: "echo", explicacion: "Echo sin H viene del verbo echar (arrojar)." },
    { id: 16, categoria: "Uso de H", tipo: "opcion", pregunta: "No sé si ___ pan.", opciones: ["hay", "ay", "ahí"], respuesta: "hay", explicacion: "Hay con H viene de haber." },
    { id: 17, categoria: "Uso de H", tipo: "opcion", pregunta: "¡___! Me dolió.", opciones: ["Ay", "Hay", "Ahí"], respuesta: "Ay", explicacion: "Ay sin H es una expresión de dolor." },
    { id: 18, categoria: "Uso de H", tipo: "dictado", pregunta: "zanahoria", opciones: [], respuesta: "zanahoria", explicacion: "Lleva H intercalada antes de la O." },
    
    // Juntas o Separadas
    { id: 19, categoria: "Juntas/Separadas", tipo: "opcion", pregunta: "Voy ___ qué pasa.", opciones: ["a ver", "haber"], respuesta: "a ver", explicacion: "'A ver' indica mirar. 'Haber' es el verbo." },
    { id: 20, categoria: "Juntas/Separadas", tipo: "opcion", pregunta: "Debe ___ mucha gente.", opciones: ["haber", "a ver"], respuesta: "haber", explicacion: "Haber es el verbo de existencia." },
    { id: 21, categoria: "Juntas/Separadas", tipo: "opcion", pregunta: "No entiendo el ___ de tu enojo.", opciones: ["porqué", "por qué", "porque"], respuesta: "porqué", explicacion: "El porqué (todo junto y con tilde) es un sustantivo (el motivo)." },
    { id: 22, categoria: "Juntas/Separadas", tipo: "opcion", pregunta: "¿___ no fuiste?", opciones: ["Por qué", "Porque"], respuesta: "Por qué", explicacion: "Para preguntar va separado y con tilde." },
    { id: 23, categoria: "Juntas/Separadas", tipo: "opcion", pregunta: "No fui ___ estaba lloviendo.", opciones: ["porque", "por qué"], respuesta: "porque", explicacion: "Para responder o dar causa, va todo junto y sin tilde." },
    
    // Tildes y Diacríticas
    { id: 24, categoria: "Tildes", tipo: "opcion", pregunta: "___ auto es rojo.", opciones: ["El", "Él"], respuesta: "El", explicacion: "El (sin tilde) es artículo." },
    { id: 25, categoria: "Tildes", tipo: "opcion", pregunta: "Me lo dio ___.", opciones: ["él", "el"], respuesta: "él", explicacion: "Él (con tilde) es pronombre personal." },
    { id: 26, categoria: "Tildes", tipo: "opcion", pregunta: "Quiero una taza de ___.", opciones: ["té", "te"], respuesta: "té", explicacion: "Té (con tilde) es la bebida." },
    { id: 27, categoria: "Tildes", tipo: "opcion", pregunta: "Yo lo ___ todo.", opciones: ["sé", "se"], respuesta: "sé", explicacion: "Sé (con tilde) viene del verbo saber." },
    { id: 28, categoria: "Tildes", tipo: "dictado", pregunta: "pájaro", opciones: [], respuesta: "pájaro", explicacion: "Es esdrújula. Todas llevan tilde." },
    { id: 29, categoria: "Tildes", tipo: "dictado", pregunta: "camión", opciones: [], respuesta: "camión", explicacion: "Aguda terminada en N. Lleva tilde." },
    
    // LL vs Y
    { id: 30, categoria: "LL/Y", tipo: "opcion", pregunta: "No cruces la ___.", opciones: ["valla", "vaya", "baya"], respuesta: "valla", explicacion: "Valla es una cerca. Vaya es de ir." },
    { id: 31, categoria: "LL/Y", tipo: "opcion", pregunta: "Quiero que él ___ a comprar.", opciones: ["vaya", "valla"], respuesta: "vaya", explicacion: "Vaya con Y es del verbo ir." },
    { id: 32, categoria: "LL/Y", tipo: "opcion", pregunta: "No cruces ese ___.", opciones: ["arroyo", "arrollo"], respuesta: "arroyo", explicacion: "Arroyo es un río pequeño. Arrollo es de arrollar." },
    
    // G vs J
    { id: 33, categoria: "G/J", tipo: "opcion", pregunta: "El coche está en el ___.", opciones: ["garaje", "garaje"], respuesta: "garaje", explicacion: "Las terminaciones -aje siempre van con J." },
    { id: 34, categoria: "G/J", tipo: "opcion", pregunta: "Me gusta ___ bufandas.", opciones: ["tejer", "teger"], respuesta: "tejer", explicacion: "Es una de las dos excepciones de verbos en -ger/-gir (tejer y crujir van con J)." }
        { id: 35, categoria: "Juntas/Separadas", tipo: "opcion", pregunta: "No es rojo, ___ azul.", opciones: ["sino", "si no"], respuesta: "sino", explicacion: "'Sino' todo junto se usa para oponer una idea a otra anterior negativa." },
    { id: 36, categoria: "Juntas/Separadas", tipo: "opcion", pregunta: "Llegarás tarde ___ te apuras.", opciones: ["si no", "sino"], respuesta: "si no", explicacion: "Se usa separado cuando introduce una condición ('si') seguida de una negación ('no')." },
    { id: 37, categoria: "Juntas/Separadas", tipo: "opcion", pregunta: "Avísame a ___ para ir a comer.", opciones: ["mediodía", "medio día"], respuesta: "mediodía", explicacion: "Cuando se refiere a las 12:00 del día, se escribe junto y con tilde." },
    { id: 38, categoria: "Juntas/Separadas", tipo: "opcion", pregunta: "Tardé ___ en arreglarlo.", opciones: ["medio día", "mediodía"], respuesta: "medio día", explicacion: "Cuando indica cantidad de tiempo (la mitad de un día), va separado." },
    { id: 39, categoria: "Juntas/Separadas", tipo: "opcion", pregunta: "Trajiste comida ___.", opciones: ["de más", "demás"], respuesta: "de más", explicacion: "Separado significa 'en exceso' o 'de sobra'." },
    { id: 40, categoria: "Juntas/Separadas", tipo: "opcion", pregunta: "Nosotros nos vamos, los ___ pueden quedarse.", opciones: ["demás", "de más"], respuesta: "demás", explicacion: "Junto significa 'los otros' o 'el resto'." },
    { id: 41, categoria: "Homófonas", tipo: "opcion", pregunta: "El documento me ___ en la verdad.", opciones: ["basa", "vaza", "vasa"], respuesta: "basa", explicacion: "Basar (apoyar algo en una base) se escribe con S y B." },
    { id: 42, categoria: "Homófonas", tipo: "opcion", pregunta: "Me sirvió agua en un ___.", opciones: ["vaso", "baso"], respuesta: "vaso", explicacion: "El recipiente para beber se escribe con V." },
    { id: 43, categoria: "Uso de H", tipo: "opcion", pregunta: "Voy ___ el supermercado.", opciones: ["hacia", "asia", "acia"], respuesta: "hacia", explicacion: "La preposición que indica dirección va con H y C." },
    { id: 44, categoria: "Uso de H", tipo: "opcion", pregunta: "El continente más grande es ___.", opciones: ["Asia", "Hacia"], respuesta: "Asia", explicacion: "El nombre del continente va sin H y con S." },
    { id: 45, categoria: "LL/Y", tipo: "opcion", pregunta: "Espero que no se ___ dado cuenta.", opciones: ["haya", "halla", "allá"], respuesta: "haya", explicacion: "Del verbo haber, se escribe con Y." },
    { id: 46, categoria: "LL/Y", tipo: "opcion", pregunta: "El tesoro se ___ en la isla.", opciones: ["halla", "haya"], respuesta: "halla", explicacion: "Del verbo hallar (encontrar o estar), se escribe con LL." },
    { id: 47, categoria: "LL/Y", tipo: "opcion", pregunta: "La casa está más ___.", opciones: ["allá", "haya", "halla"], respuesta: "allá", explicacion: "Adverbio de lugar. Lleva LL y tilde en la A final." },
    { id: 48, categoria: "B/V", tipo: "completar", pregunta: "Escribe la palabra: El barco es un vehículo na_al.", opciones: [], respuesta: "naval", explicacion: "Viene de nave, por lo tanto se escribe con V." },
    { id: 49, categoria: "B/V", tipo: "dictado", pregunta: "burbuja", opciones: [], respuesta: "burbuja", explicacion: "Las sílabas bur-, bus- y bu- siempre se escriben con B." },
    { id: 50, categoria: "B/V", tipo: "dictado", pregunta: "absoluto", opciones: [], respuesta: "absoluto", explicacion: "Las palabras que empiezan por ab-, ob- o sub- llevan B." },
    { id: 51, categoria: "B/V", tipo: "opcion", pregunta: "El ___ cantaba en la rama.", opciones: ["cuervo", "cuerbo"], respuesta: "cuervo", explicacion: "Termina en -ervo. Excepto descerbo y exacerbó, las terminaciones en -ervo/-erva van con V." },
    { id: 52, categoria: "C/S/Z", tipo: "completar", pregunta: "Plural de luz (escribe la palabra completa):", opciones: [], respuesta: "luces", explicacion: "Las palabras terminadas en Z forman el plural cambiando la Z por C (luz -> luces)." },
    { id: 53, categoria: "C/S/Z", tipo: "opcion", pregunta: "Se hizo un ___ en la mano.", opciones: ["rasguño", "razguño"], respuesta: "rasguño", explicacion: "Se escribe con S." },
    { id: 54, categoria: "Tildes", tipo: "completar", pregunta: "Coloca tilde si es necesario: facilmente", opciones: [], respuesta: "fácilmente", explicacion: "Los adverbios terminados en -mente conservan la tilde del adjetivo original (fácil lleva tilde, por ende fácilmente también)." },
    { id: 55, categoria: "Tildes", tipo: "opcion", pregunta: "Compré el libro ___ ti.", opciones: ["para", "pára"], respuesta: "para", explicacion: "La preposición 'para' es una palabra llana terminada en vocal, NO lleva tilde." },
    { id: 56, categoria: "Tildes", tipo: "dictado", pregunta: "examen", opciones: [], respuesta: "examen", explicacion: "Palabra llana terminada en N. NO lleva tilde (exámenes sí lleva por ser esdrújula)." },
    { id: 57, categoria: "Tildes", tipo: "dictado", pregunta: "imagen", opciones: [], respuesta: "imagen", explicacion: "Palabra llana terminada en N. NO lleva tilde (imágenes sí)." },
    { id: 58, categoria: "G/J", tipo: "dictado", pregunta: "geometría", opciones: [], respuesta: "geometría", explicacion: "Las palabras que empiezan por el prefijo geo- (tierra) siempre van con G." },
    { id: 59, categoria: "G/J", tipo: "opcion", pregunta: "Es un problema muy ___.", opciones: ["complejo", "complego"], respuesta: "complejo", explicacion: "Se escribe con J." },
    { id: 60, categoria: "G/J", tipo: "completar", pregunta: "El perro fue a reco_er la pelota.", opciones: [], respuesta: "recoger", explicacion: "Los verbos terminados en -ger/-gir se escriben con G (excepto tejer y crujir)." },
    { id: 61, categoria: "G/J", tipo: "dictado", pregunta: "pasajero", opciones: [], respuesta: "pasajero", explicacion: "Las palabras terminadas en -jero y -jería se escriben con J (excepto ligero)." },
    { id: 62, categoria: "Tildes", tipo: "opcion", pregunta: "¿___ es tu cumpleaños?", opciones: ["Cuándo", "Cuando"], respuesta: "Cuándo", explicacion: "En tono interrogativo o exclamativo, las palabras como cuándo, dónde, cómo llevan tilde diacrítica." },
    { id: 63, categoria: "Tildes", tipo: "opcion", pregunta: "Iré ___ me llames.", opciones: ["cuando", "cuándo"], respuesta: "cuando", explicacion: "Cuando funciona como adverbio relativo (sin pregunta), no lleva tilde." },
    { id: 64, categoria: "Homófonas", tipo: "opcion", pregunta: "Tengo un ___ en mi zapato.", opciones: ["agujero", "agugero"], respuesta: "agujero", explicacion: "Se escribe con J." }
}
