const FLOW_DATA = {
  control_garra: {
    title: "🕹️ Control Manual (Bluetooth)",
    desc: "Este diagrama representa el bucle principal de la Garra (Kit C). El cerebro del robot lee continuamente el puerto Serie esperando un comando. Utiliza una cascada de condiciones lógicas ('if-else') para decidir qué acción tomar basado en la letra que recibe.\n\n👈 Haz clic en cualquier bloque a tu izquierda para aislar y entender su fragmento de código exacto.",
    fullCode: `// ==========================================
// KIT C - ROBOT GARRA BLUETOOTH (Estructura Completa)
// ==========================================
#include <Servo.h>

// 1. DECLARACIÓN DE VARIABLES Y PINES (Músculos y Sentidos)
const int IN1 = 5;  // Motor Izquierdo Adelante
const int IN2 = 6;  // Motor Izquierdo Atrás
const int IN3 = 9;  // Motor Derecho Adelante
const int IN4 = 10; // Motor Derecho Atrás

Servo servoBase;
Servo servoBrazo;
Servo servoGarra;

int speedmax = 255;
int speed = speedmax;

// 2. CONFIGURACIÓN INICIAL (Setup)
void setup() {
  Serial.begin(9600); // Inicia comunicación Bluetooth
  
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  
  servoBase.attach(3);
  servoBrazo.attach(11);
  servoGarra.attach(12);
  
  detener();
}

// 3. CEREBRO DEL ROBOT (El Diagrama Lógico Interactivo)
// Esta es la parte que enseñamos visualmente en el diagrama
void loop() {
  if (Serial.available() > 0) {
    char Dato = Serial.read();
    
    if (Dato == 'F') { avanzar(speed); }
    else if (Dato == 'B') { retroceder(speed); }
    else if (Dato == 'R') { rotar_derecha(speed); }
    else if (Dato == 'L') { rotar_izquierda(speed); }
    else if (Dato == 'o') { abrir_garra(); }
    else if (Dato == 'c') { cerrar_garra(); }
    else if (Dato == 'u') { subir_brazo(); }
    else if (Dato == 'd') { bajar_brazo(); }
    else if (Dato == 'r') { girar_base_derecha(); }
    else if (Dato == 'l') { girar_base_izquierda(); }
    else if (Dato == 'X') { speed = 0.33 * speedmax; }
    else if (Dato == 'Y') { speed = 0.66 * speedmax; }
    else if (Dato == 'Z') { speed = speedmax; }
    else { detener(); }
    
    verificar_modo();
  }
}

// 4. FUNCIONES DE ACCIÓN (Las cientos de líneas restantes...)
// Aquí se define el código interno de CADA acción de los motores.
// Por esto el archivo original llega a +500 líneas.

void avanzar(int v) {
  analogWrite(IN1, v);
  analogWrite(IN2, 0);
  analogWrite(IN3, v);
  analogWrite(IN4, 0);
}

void retroceder(int v) {
  analogWrite(IN1, 0);
  analogWrite(IN2, v);
  analogWrite(IN3, 0);
  analogWrite(IN4, v);
}

void abrir_garra() {
  servoGarra.write(180);
}

void cerrar_garra() {
  servoGarra.write(90);
}

// ... Y así sucesivamente para rotar_derecha, subir_brazo, etc.`,
    nodes: [
      { id: 1, type: 'input', name: '🏁 Inicio Controlado', x: 50, y: 400, data: { title: "Inicio y Detención", desc: "El robot detiene todos los motores por seguridad y enciende el LED Azul para indicar que está listo para comandos.", code: "detener();\nencender_azul();\n// Listo para comandos Serial/Bluetooth" } },
      
      { id: 2, type: 'logic', name: '📡 ¿Datos Disponibles?', x: 400, y: 400, data: { title: "Lectura del Puerto Serie", desc: "Verifica si el módulo Bluetooth ha enviado un carácter.", code: "if (Serial.available() > 0) {\n  char dato = Serial.read();\n}" } },
      
      { id: 3, type: 'logic', name: "Dato == 'F'", x: 750, y: 400, data: { title: "Evaluación: Hacia Adelante", desc: "Comprueba si el comando es 'F' (Forward).", code: "if (dato == 'F')" } },
      { id: 4, type: 'action', name: '⬆️ Avanzar', x: 1100, y: 250, data: { title: "Acción: Avanzar", desc: "Motores en marcha hacia adelante. (Luego vuelve al inicio)", code: "avanzar(speed);\nverificar_modo();" } },

      { id: 5, type: 'logic', name: "Dato == 'B'", x: 1100, y: 550, data: { title: "Evaluación: Reversa", desc: "Comprueba si el comando es 'B' (Backward).", code: "else if (dato == 'B')" } },
      { id: 6, type: 'action', name: '⬇️ Retroceder', x: 1450, y: 400, data: { title: "Acción: Reversa", desc: "Los motores giran en sentido inverso. (Luego vuelve al inicio)", code: "retroceder(speed);\nverificar_modo();" } },

      { id: 7, type: 'logic', name: "Dato == 'R'", x: 1450, y: 700, data: { title: "Evaluación: Derecha", desc: "Comprueba si el comando es 'R' (Right).", code: "else if (dato == 'R')" } },
      { id: 8, type: 'action', name: '➡️ Rotar Derecha', x: 1800, y: 550, data: { title: "Acción: Giro Rápido", desc: "Rotar sobre su propio eje a la derecha. (Luego vuelve al inicio)", code: "rotar_derecha(speed);\nverificar_modo();" } },

      { id: 9, type: 'logic', name: "Dato == 'L'", x: 1800, y: 850, data: { title: "Evaluación: Izquierda", desc: "Comprueba si el comando es 'L' (Left).", code: "else if (dato == 'L')" } },
      { id: 10, type: 'action', name: '⬅️ Rotar Izquierda', x: 2150, y: 700, data: { title: "Acción: Giro Rápido", desc: "Rotar hacia la izquierda. (Luego vuelve al inicio)", code: "rotar_izquierda(speed);\nverificar_modo();" } },

      { id: 11, type: 'logic', name: "Dato == 'o'", x: 2150, y: 1000, data: { title: "Evaluación: Open", desc: "Verifica si se debe abrir la garra.", code: "else if (dato == 'o')" } },
      { id: 12, type: 'action', name: '👐 Abrir Garra', x: 2500, y: 850, data: { title: "Acción: Servo de Garra", desc: "Abre las pinzas. (Luego vuelve al inicio)", code: "abrir_garra();\nverificar_modo();" } },

      { id: 13, type: 'logic', name: "Dato == 'c'", x: 2500, y: 1150, data: { title: "Evaluación: Close", desc: "Verifica si se debe cerrar la garra.", code: "else if (dato == 'c')" } },
      { id: 14, type: 'action', name: '✊ Cerrar Garra', x: 2850, y: 1000, data: { title: "Acción: Servo de Garra", desc: "Cierra las pinzas. (Luego vuelve al inicio)", code: "cerrar_garra();\nverificar_modo();" } },

      { id: 15, type: 'logic', name: "Dato == 'u'", x: 2850, y: 1300, data: { title: "Evaluación: Up", desc: "Verifica si se debe subir el brazo.", code: "else if (dato == 'u')" } },
      { id: 16, type: 'action', name: '🦾 Subir Brazo', x: 3200, y: 1150, data: { title: "Acción: Servo Central", desc: "Eleva el brazo robótico.", code: "subir_brazo();\nverificar_modo();" } },

      { id: 17, type: 'logic', name: "Dato == 'd'", x: 3200, y: 1450, data: { title: "Evaluación: Down", desc: "Verifica si se debe bajar el brazo.", code: "else if (dato == 'd')" } },
      { id: 18, type: 'action', name: '🦿 Bajar Brazo', x: 3550, y: 1300, data: { title: "Acción: Servo Central", desc: "Desciende el brazo robótico.", code: "bajar_brazo();\nverificar_modo();" } },

      { id: 19, type: 'logic', name: "Dato == 'r'", x: 3550, y: 1600, data: { title: "Evaluación: Base Derecha", desc: "Verifica si la base debe girar.", code: "else if (dato == 'r')" } },
      { id: 20, type: 'action', name: '🔄 Base a Derecha', x: 3900, y: 1450, data: { title: "Acción: Servo Base", desc: "Gira la base del brazo.", code: "girar_base_derecha();\nverificar_modo();" } },

      { id: 21, type: 'logic', name: "Dato == 'l'", x: 3900, y: 1750, data: { title: "Evaluación: Base Izquierda", desc: "Verifica si la base debe girar.", code: "else if (dato == 'l')" } },
      { id: 22, type: 'action', name: '🔄 Base a Izquierda', x: 4250, y: 1600, data: { title: "Acción: Servo Base", desc: "Gira la base del brazo.", code: "girar_base_izquierda();\nverificar_modo();" } },

      { id: 23, type: 'logic', name: "Dato == 'X'", x: 4250, y: 1900, data: { title: "Multiplicador de Velocidad", desc: "Velocidad al 33%", code: "else if (dato == 'X')" } },
      { id: 24, type: 'action', name: '🐢 Velocidad 33%', x: 4600, y: 1750, data: { title: "Velocidad Lenta", desc: "Aplica velocidad reducida.", code: "speed = 0.33 * speedmax;\nverificar_modo();" } },

      { id: 25, type: 'logic', name: "Dato == 'Y'", x: 4600, y: 2050, data: { title: "Multiplicador de Velocidad", desc: "Velocidad al 66%", code: "else if (dato == 'Y')" } },
      { id: 26, type: 'action', name: '🚶 Velocidad 66%', x: 4950, y: 1900, data: { title: "Velocidad Media", desc: "Aplica velocidad media.", code: "speed = 0.66 * speedmax;\nverificar_modo();" } },

      { id: 27, type: 'logic', name: "Dato == 'Z'", x: 4950, y: 2200, data: { title: "Multiplicador de Velocidad", desc: "Velocidad al 100%", code: "else if (dato == 'Z')" } },
      { id: 28, type: 'action', name: '🚀 Velocidad 100%', x: 5300, y: 2050, data: { title: "Velocidad Máxima", desc: "Aplica toda la potencia.", code: "speed = speedmax;\nverificar_modo();" } },

      { id: 29, type: 'action', name: '🛑 Comando Desconocido', x: 5300, y: 2350, data: { title: "Por Defecto", desc: "Cualquier otra tecla detiene el robot.", code: "else {\n  detener();\n  verificar_modo();\n}" } }
    ],
    connections: [
      { from: 1, to: 2 },
      { from: 2, to: 3, out: 'output_1', in: 'input_1' },  
      
      { from: 3, to: 4, out: 'output_1', in: 'input_1' },  
      { from: 3, to: 5, out: 'output_2', in: 'input_1' },  
      
      { from: 5, to: 6, out: 'output_1', in: 'input_1' },  
      { from: 5, to: 7, out: 'output_2', in: 'input_1' },  
      
      { from: 7, to: 8, out: 'output_1', in: 'input_1' },  
      { from: 7, to: 9, out: 'output_2', in: 'input_1' },  
      
      { from: 9, to: 10, out: 'output_1', in: 'input_1' }, 
      { from: 9, to: 11, out: 'output_2', in: 'input_1' }, 
      
      { from: 11, to: 12, out: 'output_1', in: 'input_1' },
      { from: 11, to: 13, out: 'output_2', in: 'input_1' },
      
      { from: 13, to: 14, out: 'output_1', in: 'input_1' },
      { from: 13, to: 15, out: 'output_2', in: 'input_1' },
      
      { from: 15, to: 16, out: 'output_1', in: 'input_1' },
      { from: 15, to: 17, out: 'output_2', in: 'input_1' },
      
      { from: 17, to: 18, out: 'output_1', in: 'input_1' },
      { from: 17, to: 19, out: 'output_2', in: 'input_1' },
      
      { from: 19, to: 20, out: 'output_1', in: 'input_1' },
      { from: 19, to: 21, out: 'output_2', in: 'input_1' },
      
      { from: 21, to: 22, out: 'output_1', in: 'input_1' },
      { from: 21, to: 23, out: 'output_2', in: 'input_1' },
      
      { from: 23, to: 24, out: 'output_1', in: 'input_1' },
      { from: 23, to: 25, out: 'output_2', in: 'input_1' },
      
      { from: 25, to: 26, out: 'output_1', in: 'input_1' },
      { from: 25, to: 27, out: 'output_2', in: 'input_1' },
      
      { from: 27, to: 28, out: 'output_1', in: 'input_1' },
      { from: 27, to: 29, out: 'output_2', in: 'input_1' }
      // Hemos removido las conexiones de retorno (Beta) para que el diagrama
      // se vea como un elegante árbol diagonal sin líneas cruzándose.
    ]
  },

  control_carro: {
    title: "🤖 Menú Principal (Selector IR)",
    desc: "Este diagrama es el Programa Principal del Kit B. Funciona como un selector de modos: el robot 'escucha' el control remoto Infrarrojo y, dependiendo de qué botón presiones (1 al 5), entra a un modo de operación distinto (Bluetooth, Evasor, Líneas, etc.).\n\n👈 Haz clic en cada bloque para ver cómo se programa.",
    fullCode: `// ==========================================
// KIT B - PROGRAMA PRINCIPAL (Selector de Modos IR)
// ==========================================
#include <IRremote.h>

// Declaración de variables y funciones
int RECV_PIN = 2; // Pin del sensor infrarrojo
IRrecv irrecv(RECV_PIN);
decode_results results;

void setup() {
  Serial.begin(9600);
  irrecv.enableIRIn(); // Inicia el receptor IR
  detener();
}

void loop() {
  // Esperar Dato IR y comprobar si se recibió
  if (irrecv.decode(&results)) {
    unsigned long dato = results.value;
    
    // Cascada de selección de modos
    // (Nota: En tu diagrama original los códigos IR se repiten, aquí mostramos esa misma lógica)
    if (dato == 16738455) { // Botón 1
      control_bluetooth();
    }
    else if (dato == 16750695) { // Botón 2
      control_infrarrojos();
    }
    else if (dato == 16738455) { // Botón 3
      evasor_obstaculos();
    }
    else if (dato == 16738455) { // Botón 4
      seguidor();
    }
    else if (dato == 16738455) { // Botón 5
      seguidor_lineas();
    }
    
    // Volver a escuchar el sensor (retorno Beta)
    irrecv.resume();
  }
}`,
    nodes: [
      { id: 1, type: 'input', name: '🏁 Inicio Programa Principal', x: 50, y: 300, data: { title: "Inicio", desc: "El punto de partida del robot al encenderse.", code: "void setup() {\n  // Inicia sistema\n}" } },
      { id: 2, type: 'action', name: '📦 Declaración de variables', x: 300, y: 300, data: { title: "Variables y Funciones", desc: "Define las librerías necesarias para el sensor Infrarrojo (IR).", code: "#include <IRremote.h>\nint RECV_PIN = 2;\nIRrecv irrecv(RECV_PIN);\ndecode_results results;" } },
      { id: 3, type: 'action', name: '🛑 Detener', x: 550, y: 300, data: { title: "Apagar Motores", desc: "Garantiza que el robot no se mueva sin recibir instrucciones.", code: "detener();" } },
      { id: 4, type: 'action', name: '⏳ Esperar Dato IR', x: 800, y: 300, data: { title: "Escuchar Sensor", desc: "El sensor infrarrojo se queda atento a la luz del control remoto.", code: "irrecv.enableIRIn();\n// Esperando señal luminosa..." } },
      
      { id: 5, type: 'logic', name: '¿Se recibió algún dato IR?', x: 1100, y: 300, data: { title: "Comprobación IR", desc: "Verifica si una señal fue captada exitosamente.", code: "if (irrecv.decode(&results)) {\n  unsigned long dato = results.value;\n}" } },
      
      { id: 6, type: 'logic', name: 'Dato IR= 16738455 (Botón 1)', x: 1400, y: 300, data: { title: "Evaluación Botón 1", desc: "Si presionas el botón 1, entra al modo manual por celular.", code: "if (dato == 16738455) { // Botón 1" } },
      { id: 7, type: 'action', name: '📱 Control Bluetooth', x: 1700, y: 150, data: { title: "Ejecutar Subrutina", desc: "El robot cambia a control por app móvil.", code: "control_bluetooth();" } },

      { id: 8, type: 'logic', name: 'Dato IR= 16750695 (Botón 2)', x: 1700, y: 450, data: { title: "Evaluación Botón 2", desc: "Activa el control manual con el mismo control de TV/IR.", code: "else if (dato == 16750695) { // Botón 2" } },
      { id: 9, type: 'action', name: '🕹️ Control Infrarrojos', x: 2000, y: 300, data: { title: "Ejecutar Subrutina", desc: "Control manual a través del control infrarrojo.", code: "control_infrarrojos();" } },

      { id: 10, type: 'logic', name: 'Dato IR= 16738455 (Botón 3)', x: 2000, y: 600, data: { title: "Evaluación Botón 3", desc: "Entra en modo autónomo de evasión.", code: "else if (dato == 16738455) { // Botón 3" } },
      { id: 11, type: 'action', name: '🦇 Evasor Obstáculos', x: 2300, y: 450, data: { title: "Ejecutar Subrutina", desc: "El robot anda solo evitando chocar e incorpora anticaídas.", code: "evasor_obstaculos_y_anticaidas();" } },

      { id: 12, type: 'logic', name: 'Dato IR= 16738455 (Botón 4)', x: 2300, y: 750, data: { title: "Evaluación Botón 4", desc: "Entra al modo para seguir objetos/mascotas.", code: "else if (dato == 16738455) { // Botón 4" } },
      { id: 13, type: 'action', name: '🐕 Seguidor', x: 2600, y: 600, data: { title: "Ejecutar Subrutina", desc: "Persigue un objeto manteniendo la distancia.", code: "seguidor();" } },

      { id: 14, type: 'logic', name: 'Dato IR= 16738455 (Botón 5)', x: 2600, y: 900, data: { title: "Evaluación Botón 5", desc: "Activa el modo rastreador de pistas.", code: "else if (dato == 16738455) { // Botón 5" } },
      { id: 15, type: 'action', name: '🏎️ Seguidor de lineas', x: 2900, y: 750, data: { title: "Ejecutar Subrutina", desc: "Sigue una pista negra en el suelo.", code: "seguidor_lineas();" } }
    ],
    connections: [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      
      { from: 5, to: 6, out: 'output_1', in: 'input_1' },
      
      { from: 6, to: 7, out: 'output_1', in: 'input_1' },
      { from: 6, to: 8, out: 'output_2', in: 'input_1' },
      
      { from: 8, to: 9, out: 'output_1', in: 'input_1' },
      { from: 8, to: 10, out: 'output_2', in: 'input_1' },
      
      { from: 10, to: 11, out: 'output_1', in: 'input_1' },
      { from: 10, to: 12, out: 'output_2', in: 'input_1' },
      
      { from: 12, to: 13, out: 'output_1', in: 'input_1' },
      { from: 12, to: 14, out: 'output_2', in: 'input_1' },
      
      { from: 14, to: 15, out: 'output_1', in: 'input_1' }
    ]
  },

  seguidor_kit_b: {
    title: "🐕 Seguidor de Objetos",
    desc: "El robot intenta mantener una distancia constante con un objeto frente a él (como si fuera una mascota). Si te alejas, te persigue; si te acercas demasiado, retrocede.\n\n👈 Selecciona los bloques lógicos para ver cómo se programa este comportamiento.",
    fullCode: `void f_seguidor() {
  distancia = medirDistancia();
  
  if (distancia >= 30) {
    detener();
  } 
  else if (distancia >= 25 && distancia < 30) {
    avanzar(200);
  } 
  else if (distancia >= 15 && distancia < 20) {
    detener(); // Zona muerta (confort)
  } 
  else {
    retroceder(160);
  }
}`,
    nodes: [
      { id: 1, type: 'input', name: '👀 Distancia', x: 50, y: 200, data: { title: "Leer Objetivo", desc: "Medición constante de la distancia.", code: "distancia = medirDistancia();" } },
      { id: 2, type: 'logic', name: '>= 30cm', x: 400, y: 200, data: { title: "Objetivo lejos", desc: "Objeto perdido o muy lejos.", code: "if (distancia >= 30) {}" } },
      { id: 3, type: 'action', name: '🛑 Detener', x: 750, y: 50, data: { title: "Acción: Reposo", desc: "Motores apagados.", code: "detener();" } },
      
      { id: 4, type: 'logic', name: '25 a 30cm', x: 750, y: 350, data: { title: "Aproximación Rápida", desc: "El objeto se aleja. Acelerar.", code: "else if (distancia >= 25 && distancia < 30) {}" } },
      { id: 5, type: 'action', name: '🏃 Avanzar Rápido', x: 1100, y: 200, data: { title: "Velocidad Alta", desc: "Avanza rápido.", code: "avanzar(200);" } },
      
      { id: 6, type: 'logic', name: '15 a 20cm', x: 1100, y: 500, data: { title: "Zona de Confort", desc: "Rango ideal. Deadband.", code: "else if (distancia >= 15 && distancia < 20) {}" } },
      { id: 7, type: 'action', name: '🛑 Mantener Distancia', x: 1450, y: 350, data: { title: "Mantener Distancia", desc: "Detenido.", code: "detener();" } },
      
      { id: 8, type: 'logic', name: '< 15cm', x: 1450, y: 650, data: { title: "Muy cerca", desc: "Objetivo muy cerca.", code: "else {}" } },
      { id: 9, type: 'action', name: '🔙 Retroceder', x: 1800, y: 500, data: { title: "Retroceso", desc: "Marcha atrás.", code: "retroceder(160);" } }
    ],
    connections: [
      { from: 1, to: 2 },
      { from: 2, to: 3, out: 'output_1' },
      { from: 2, to: 4, out: 'output_2' },
      { from: 4, to: 5, out: 'output_1' },
      { from: 4, to: 6, out: 'output_2' },
      { from: 6, to: 7, out: 'output_1' },
      { from: 6, to: 8, out: 'output_2' },
      { from: 8, to: 9, out: 'output_1' }
    ]
  },

  linea_kit_b: {
    title: "🏎️ Seguidor de Línea",
    desc: "Utiliza 3 sensores infrarrojos (IR) apuntando al suelo para detectar el contraste entre una pista negra y el fondo blanco. Basado en las lecturas lógicas, corrige sus motores para mantenerse en la pista.\n\n👈 Haz clic en los nodos para inspeccionar el código fuente.",
    fullCode: `void f_seguidor_lineas() {
  escanear_sensores();
  // SM = Sensor Medio
  
  if (SM == 1) {
    // La línea está en el centro, avanzar recto
    avanzar(180);
  } else {
    // Si la perdió, retrocede o gira para buscarla
    retroceder(180);
  }
}`,
    nodes: [
      { id: 1, type: 'input', name: '👁️ Sensores IR', x: 50, y: 200, data: { title: "Matriz IR", desc: "3 Sensores (0 = Blanco, 1 = Negro)", code: "escanear_sensores();" } },
      { id: 2, type: 'logic', name: 'SM == 1', x: 400, y: 200, data: { title: "Línea en el centro", desc: "Sensor central lee línea.", code: "if (SM == 1) {}" } },
      { id: 3, type: 'action', name: '⬆️ Avanzar Recto', x: 750, y: 50, data: { title: "Trayectoria Perfecta", desc: "Avanza rápido.", code: "avanzar(180);" } },
      { id: 4, type: 'logic', name: 'SM == 0', x: 750, y: 350, data: { title: "Centro Perdido", desc: "Sensor central lee blanco.", code: "else {}" } },
      { id: 5, type: 'action', name: '🔄 Buscar Pista', x: 1100, y: 200, data: { title: "Robot Perdido", desc: "Fuera de pista, retroceder.", code: "retroceder(180);" } }
    ],
    connections: [
      { from: 1, to: 2 },
      { from: 2, to: 3, out: 'output_1' },
      { from: 2, to: 4, out: 'output_2' },
      { from: 4, to: 5, out: 'output_1' }
    ]
  }
};
