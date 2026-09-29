import re

with open('css/styles.css', 'r', encoding='latin-1') as f:
    css = f.read()

full_media_query = '''@media (max-width: 768px) {
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
  
  /* Panel Lateral superpuesto tipo Drawer Inferior (Bottom Sheet) */
  .main-layout {
    position: relative;
    overflow: hidden;
  }
  
  .explanation-panel {
    position: absolute;
    left: 0;
    bottom: 0;
    top: auto;
    width: 100%;
    height: 55%; /* 55% de la pantalla para buena lectura */
    max-width: none;
    z-index: 100;
    box-shadow: 0 -5px 30px rgba(0,0,0,0.6);
    border-left: none;
    border-top: 1px solid var(--border-color);
    transform: translateY(0);
  }
  
  .explanation-panel.collapsed {
    width: 100%;
    transform: translateY(100%);
  }
  
  .explanation-panel.collapsed .panel-inner {
    width: 100%;
    opacity: 1;
    pointer-events: auto;
  }
  
  /* Botón más grande para touch */
  .toggle-panel-btn {
    width: 60px;
    height: 30px;
    left: 50%;
    top: -30px;
    margin-left: -30px;
    font-size: 1rem;
    border-radius: 8px 8px 0 0;
    background: var(--bg-panel);
    border: 1px solid var(--border-color);
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: none;
  }
  
  /* Hacemos que la flecha gire dinámicamente */
  .toggle-panel-btn::before {
    content: "▶";
    transform: rotate(90deg); /* Apunta abajo por defecto (cuando está abierto) */
    transition: transform 0.3s;
  }
  
  .explanation-panel.collapsed .toggle-panel-btn::before {
    transform: rotate(-90deg); /* Apunta arriba cuando está colapsado */
  }

  /* Ocultamos el texto original del botón porque usamos ::before */
  .toggle-panel-btn {
    color: transparent;
  }
  .toggle-panel-btn::before {
    color: var(--text-main);
  }
  .toggle-panel-btn:hover::before {
    color: #fff;
  }

  .explanation-panel.collapsed .toggle-panel-btn {
    left: 50%;
    top: -30px;
    margin-left: -30px;
    border-radius: 8px 8px 0 0;
    border: 1px solid var(--border-color);
    border-bottom: none;
    transform: none;
  }

  .explanation-panel:not(.collapsed) .toggle-panel-btn {
    transform: none;
  }
  
  /* Modal responsive */
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
    padding: 20px;
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

css_clean = re.sub(r'@media \(max-width: 768px\) \{.*', full_media_query, css, flags=re.DOTALL)

with open('css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css_clean)
