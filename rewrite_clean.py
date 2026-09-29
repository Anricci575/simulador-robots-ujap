import re

with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace EVERYTHING in the media query to be absolutely sure it is clean!
clean_media = '''@media (max-width: 768px) {
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
  
  .main-layout {
    flex-direction: column;
    overflow: hidden;
  }
  
  .flow-section {
    flex: 1; 
    min-height: 0; 
    position: relative;
  }
  
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
    display: none; 
  }
  .zoom-controls {
    background: var(--bg-panel);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin: 0;
  }
  
  .explanation-panel {
    position: relative;
    left: auto; bottom: auto; top: auto; right: auto;
    width: 100%;
    flex: none !important;
    height: 45vh; 
    max-width: none;
    z-index: 10;
    box-shadow: none;
    border-left: none;
    border-top: 2px solid var(--border-color);
    transform: none !important; 
    transition: height 0.3s ease;
  }
  
  .explanation-panel.collapsed {
    height: 0px !important;
    border-top: none;
  }
  
  .explanation-panel .panel-inner {
    width: 100% !important;
    height: 100%;
    opacity: 1 !important;
    pointer-events: auto !important;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .explanation-panel.collapsed .panel-inner {
    opacity: 0 !important;
    pointer-events: none !important;
  }
  
  .panel-content {
    flex: 1;
    overflow-y: auto; 
  }
  
  .toggle-panel-btn {
    display: flex !important;
    position: absolute;
    top: -30px;
    left: 50%;
    margin-left: -30px;
    width: 60px;
    height: 30px;
    background: var(--bg-panel);
    border: 1px solid var(--border-color);
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    justify-content: center;
    align-items: center;
    color: transparent;
    z-index: 20;
    transform: none !important;
    cursor: pointer;
  }
  
  .toggle-panel-btn::before {
    content: "▼";
    font-size: 14px;
    color: var(--text-main);
  }
  
  .explanation-panel.collapsed .toggle-panel-btn::before {
    content: "▲";
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
}
'''

css = re.sub(r'@media \(max-width: 768px\) \{.*', clean_media, css, flags=re.DOTALL)

with open('css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
