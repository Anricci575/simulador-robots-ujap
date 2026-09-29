import re

with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix the collapsible panel logic for mobile
mobile_fix = '''
  .explanation-panel {
    position: relative;
    left: auto;
    bottom: auto;
    top: auto;
    right: auto;
    width: 100%;
    flex: none !important;
    height: 45vh; /* Ocupa el 45% */
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
  
  /* Toggle button */
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
'''

css = re.sub(r'\.explanation-panel\s*\{.*?(?=\.panel-content\s*\{)', mobile_fix, css, flags=re.DOTALL)

with open('css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

