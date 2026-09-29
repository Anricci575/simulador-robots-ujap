# Robotics Lab Interactivo - Simulador y Aprendizaje de Robots Arduino

Plataforma web educativa para experimentar, simular y aprender la lógica de control, cinemática y programación de los robots **Kit B Integral** y **Kit C Integral**.

---

## 🚀 Cómo Ejecutar la Aplicación

No requiere instalaciones complejas ni `npm install`. Puedes abrirlo de dos formas:

### Opción 1: Directamente en el Navegador
Haz doble clic sobre el archivo **`index.html`** dentro de la carpeta `simulador/` y se abrirá en Google Chrome, Microsoft Edge, Firefox o tu navegador favorito.

### Opción 2: Mediante un Servidor Local (Recomendado)
Abre PowerShell o terminal en esta carpeta y ejecuta:
```bash
python -m http.server 8000
```
Luego abre tu navegador en `http://localhost:8000`.

---

## 🕹 Controles y Funcionalidades

### 1. Selector de Robot (Barra Superior)
- **Kit B Integral**: Rover 2WD con Radar Ultrasónico móvil (Servo en pin 3), control por Mando Infrarrojo virtual y modos autónomos.
- **Kit C Integral**: Rover 2WD con Brazo Robótico articulado de 3 grados de libertad (Garra, Elevación y Base giratoria) + Memoria de Acciones "Teach & Repeat".

### 2. Modos de Operación Disponibles
- **Manual (Bluetooth)**: Control con teclas `W`, `A`, `S`, `D` o cruceta virtual, con selector de velocidades X (33%), Y (66%) y Z (100%).
- **Mando Infrarrojo (Kit B)**: Mando a distancia con botones interactivos que transmiten los códigos hexadecimales del estándar NEC (`0x00FF18E7`, etc.).
- **Evasor con Radar**: Detección de obstáculos por ultrasonido con cono visual en tiempo real. En el Kit B verás girar la cabeza a 160° y 20° antes de decidir el giro.
- **Seguidor de Objetos**: Arrastra el círculo amarillo en la arena; el robot avanzará, frenará o retrocederá para mantener la distancia ideal (15 a 20 cm).
- **Seguidor de Línea**: Navegación autónoma sobre la pista negra con indicadores visuales de los sensores TCRT5000 (SL, SM, SR).
- **Anticaídas**: Protección contra precipicios o bordes de mesa.

### 3. Laboratorio de Brazo Robótico (Kit C)
- **Control de Articulaciones**: Sliders y pulsadores para Pinza (Pin 9), Elevación (Pin 10) y Base giratoria (Pin 11).
- **Memoria "Teach & Repeat" (Modos 'm' y 'a')**:
  - Presiona **"Grabar Posición" ('m')** para guardar la pose actual en los arrays de memoria (hasta 20 slots).
  - Presiona **"Reproducir" ('a')** para ver al brazo interpolar suavemente paso a paso entre todas las posiciones grabadas.

### 4. Inspector de Código en Vivo
- El código fuente original `.ino` se muestra coloreado en el panel derecho.
- Cada vez que el robot toma una acción en el simulador, **la línea exacta de código se ilumina en amarillo** y una tarjeta didáctica te explica en lenguaje claro *por qué* el microcontrolador tomó esa decisión.

### 5. Retos y Lecciones Guiadas
- Accede a la pestaña **"Retos & Lecciones"** para aprender sobre:
  1. Motores DC, Puente H L298N y modulación PWM.
  2. La física acústica del sensor HC-SR04 ($t / 59$).
  3. Lógica booleana del seguidor de línea.
  4. Barrido de radar ultrasónico con servomotores.
  5. Cinemática y rutinas de pick-and-place para brazos manipuladores.
