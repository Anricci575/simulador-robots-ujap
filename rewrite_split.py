import re

with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_media_query = '''@media (max-width: 768px) {
  .app-header {
    height: auto;
    flex-direction: column;
    padding: 10px 15px;
    gap: 12px;
  }
  
  .brand {
    width: 100%;
    justify-content: center;
  }
  
  .brand-text .main-title {
    font-size: 1.1rem;
  }
  .brand-text .ujap-subtitle {
    font-size: 0.65rem;
  }

  .algorithm-tabs {
    width: 100%;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 5px;
  }
  
  .tab-btn {
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 0.85rem;
  }
  
  /* --- NUEVO LAYOUT: Pantalla Dividida (Split Screen) --- */
  .main-layout {
    flex-direction: column;
    overflow: hidden;
  }
  
  .flow-section {
    flex: 1;
    min-height: 40vh; /* Garantiza buen espacio para el diagrama */
  }
  
  .explanation-panel,
  .explanation-panel.collapsed { /* Forzamos a que no importe el estado colapsado por JS */
    position: relative;
    left: auto;
    bottom: auto;
    top: auto;
    right: auto;
    width: 100%;
    flex: 0 0 45vh; /* Toma el 45% inferior de la pantalla fijo */
    max-width: none;
    z-index: 10;
    box-shadow: none;
    border-left: none;
    border-top: 2px solid var(--border-color);
    transform: none !important; /* Anula deslizamientos */
  }
  
  /* El interior siempre visible */
  .explanation-panel .panel-inner,
  .explanation-panel.collapsed .panel-inner {
    width: 100% !important;
    height: 100%;
    opacity: 1 !important;
    pointer-events: auto !important;
    display: flex;
    flex-direction: column;
  }
  
  .panel-content {
    flex: 1;
    overflow-y: auto; /* Permite scroll si la explicacion es muy larga */
  }
  
  /* Ocultar el botón de colapsar en móviles, ya no se necesita */
  .toggle-panel-btn {
    display: none !important;
  }
  
  /* Modal responsive (Código completo) */
  .modal-content {
    width: 95%;
    height: 90vh;
  }
  
  .modal-body {
    flex-direction: column;
    overflow-y: auto;
  }
  
  .modal-desc-area {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    padding: 15px;
    flex: none;
  }
  
  .modal-code-area {
    padding: 0;
    height: auto;
    flex: none;
  }
  
  .modal-code-area pre {
    padding: 15px;
  }
}'''

# Replace everything from @media (max-width: 768px) to the end
css_clean = re.sub(r'@media \(max-width: 768px\) \{.*', new_media_query, css, flags=re.DOTALL)

with open('css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css_clean)
