import re

with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove the display: none !important for toggle button in the media query
css = css.replace('.toggle-panel-btn {\n    display: none !important;\n  }', '''
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
    color: var(--text-main);
    z-index: 20;
    transform: none;
  }
  .toggle-panel-btn::before {
    content: "▼";
    font-size: 14px;
    color: var(--text-main);
  }
  .explanation-panel.collapsed .toggle-panel-btn::before {
    content: "▲";
  }
  
  .explanation-panel {
    transition: flex 0.3s ease;
  }
  
  /* When collapsed, take almost no space */
  .explanation-panel.collapsed {
    flex: 0 0 0px !important;
    border-top: none;
  }
  .explanation-panel.collapsed .panel-inner {
    opacity: 0 !important;
    pointer-events: none !important;
  }
''')

with open('css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
