import re

with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix body
css = css.replace('height: 100vh;', 'height: 100dvh;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;')

new_media_query = '''@media (max-width: 768px) {
  .app-header {
    height: auto;
    flex-direction: column;
    padding: 8px 10px;
    gap: 8px;
  }
  
  .brand {
    width: 100%;
    justify-content: center;
  }
  
  .brand-icon {
    width: 30px !important;
    height: 30px !important;
  }
  
  .brand-text .main-title {
    font-size: 1rem;
  }
  .brand-text .ujap-subtitle {
    font-size: 0.55rem;
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
    font-size: 0.8rem;
  }
  
  /* --- NUEVO LAYOUT: Pantalla Dividida (Split Screen) --- */
  .main-layout {
    flex-direction: column;
    overflow: hidden;
  }
  
  .flow-section {
    flex: 1; /* Toma el espacio restante */
    min-height: 0; /* Evita desbordamientos */
    position: relative;
  }
  
  /* Arreglar la barra de controles flotante */
  .controls-bar {
    position: absolute;
    bottom: 10px;
    right: 10px;
    top: auto;
    left: auto;
    width: auto;
    background: transparent;
    padding: 0;
    margin: 0;
    z-index: 10;
  }
  .control-hint {
    display: none; /* Ocultar texto en móvil */
  }
  .zoom-controls {
    background: var(--bg-panel);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin: 0;
  }
  
  .explanation-panel,
  .explanation-panel.collapsed {
    position: relative;
    left: auto;
    bottom: auto;
    top: auto;
    right: auto;
    width: 100%;
    flex: 0 0 45%; /* Toma exactamente 45% del espacio del layout */
    max-width: none;
    z-index: 10;
    box-shadow: none;
    border-left: none;
    border-top: 2px solid var(--border-color);
    transform: none !important; 
  }
  
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
    overflow-y: auto; 
  }
  
  .toggle-panel-btn {
    display: none !important;
  }
  
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

css_clean = re.sub(r'@media \(max-width: 768px\) \{.*', new_media_query, css, flags=re.DOTALL)

with open('css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css_clean)
