import re

with open('js/app.js', 'r', encoding='latin-1') as f:
    js = f.read()

# Replace zoom-home logic
js = re.sub(
    r"document\.getElementById\('zoom-home'\)\.onclick\s*=\s*\(\)\s*=>\s*\{.*?\};",
    '''document.getElementById('zoom-home').onclick = () => {
    editor.zoom_reset();
    if (window.innerWidth <= 768) {
        editor.zoom = 0.5;
        editor.canvas_x = 0;
        editor.canvas_y = -100;
    } else {
        editor.canvas_x = 0;
        editor.canvas_y = 0;
    }
    if (editor.precanvas) editor.precanvas.style.transform = 	ranslate(px, px) scale();
  };''',
    js, flags=re.DOTALL
)

# Replace loadFlow zoom logic
js = re.sub(
    r"editor\.zoom_reset\(\);\s*editor\.canvas_x\s*=\s*0;\s*editor\.canvas_y\s*=\s*0;\s*if\(editor\.precanvas\)\s*\{\s*editor\.precanvas\.style\.transform\s*=\s*	ranslate.*?;\s*\}",
    '''editor.zoom_reset();
    if (window.innerWidth <= 768) {
        editor.zoom = 0.5;
        editor.canvas_x = 0;
        editor.canvas_y = -100;
    } else {
        editor.canvas_x = 0;
        editor.canvas_y = 0;
    }
    if(editor.precanvas) {
      editor.precanvas.style.transform = 	ranslate(px, px) scale();
    }''',
    js, flags=re.DOTALL
)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
