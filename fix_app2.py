import re
with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Change canvas_y from -100 to -180
js = js.replace('editor.canvas_y = -100;', 'editor.canvas_y = -180;')
js = js.replace('editor.zoom = 0.5;', 'editor.zoom = 0.65;') # Adjust zoom so nodes don't look too tiny

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
