import re
with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('color: var(--text-main);\n    z-index: 20;', 'color: transparent;\n    z-index: 20;')

with open('css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
