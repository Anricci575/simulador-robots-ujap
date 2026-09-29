document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const btnZoomIn = document.getElementById('zoom-in');
  const btnZoomOut = document.getElementById('zoom-out');
  const btnZoomHome = document.getElementById('zoom-home');
  
  const defaultMsg = document.getElementById('default-msg');
  const detailView = document.getElementById('detail-view');
  const nodeType = document.getElementById('node-type');
  const nodeTitle = document.getElementById('node-title');
  const nodeDesc = document.getElementById('node-desc');
  const nodeCode = document.getElementById('node-code');

  const togglePanelBtn = document.getElementById('toggle-panel');
  const explanationPanel = document.getElementById('explanation-panel');

  const id = document.getElementById("drawflow");
  const editor = new Drawflow(id);
  
  editor.reroute = true;
  editor.reroute_fix_curvature = true;
  editor.force_first_input = false;
  editor.start();

  let currentNodes = {};
  let currentFlowId = 'control_garra';
  let firstNodeData = null;

  // Modal Lógica
  const btnFullCode = document.getElementById('btn-full-code');
  const fullCodeModal = document.getElementById('full-code-modal');
  const closeModal = document.getElementById('close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCode = document.getElementById('modal-code');

  if (btnFullCode) {
    btnFullCode.onclick = () => {
      const data = FLOW_DATA[currentFlowId];
      if (data) {
        modalTitle.textContent = `Código Completo: ${data.title}`;
        modalDesc.textContent = (data.desc || '').replace(/👈.*/gs, '');
        modalCode.innerHTML = highlightSyntax(data.fullCode || '// Código no disponible');
        fullCodeModal.style.display = 'flex';
      }
    };
  }

  if (closeModal) {
    closeModal.onclick = () => { fullCodeModal.style.display = 'none'; };
  }
  if (fullCodeModal) {
    fullCodeModal.onclick = (e) => {
      if (e.target === fullCodeModal) fullCodeModal.style.display = 'none';
    };
  }

  // Toggle Panel (Desktop & Mobile)
  if (togglePanelBtn && explanationPanel) {
    togglePanelBtn.addEventListener('click', () => {
      explanationPanel.classList.toggle('collapsed');
      setTimeout(() => {
        if (firstNodeData) centerOnNode(firstNodeData);
      }, 350);
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      loadFlow(e.target.dataset.flow);
    });
  });

  if (btnZoomIn) btnZoomIn.onclick = () => editor.zoom_in();
  if (btnZoomOut) btnZoomOut.onclick = () => editor.zoom_out();
  if (btnZoomHome) {
    btnZoomHome.onclick = () => {
      if (firstNodeData) {
        centerOnNode(firstNodeData);
      } else {
        editor.zoom_reset();
        editor.canvas_x = 0;
        editor.canvas_y = 0;
        if (editor.precanvas) {
          editor.precanvas.style.transform = `translate(${editor.canvas_x}px, ${editor.canvas_y}px) scale(${editor.zoom})`;
        }
      }
    };
  }

  editor.on('nodeSelected', (id) => {
    const nodeData = currentNodes[id];
    if (nodeData) showExplanation(nodeData);
  });

  editor.on('nodeUnselected', () => {
    hideExplanation();
  });

  function centerOnNode(node) {
    if (!node || !editor.precanvas) return;
    const container = document.getElementById('drawflow');
    const h = container.clientHeight || (window.innerHeight - 60);
    const isMobile = window.innerWidth <= 768;
    
    const zoom = isMobile ? 0.7 : 0.85;
    editor.zoom = zoom;
    
    const targetX = isMobile ? 25 : 60;
    const targetY = Math.round(isMobile ? (h * 0.28) : (h * 0.35));
    
    editor.canvas_x = Math.round(targetX - (node.x * zoom));
    editor.canvas_y = Math.round(targetY - (node.y * zoom));
    
    editor.precanvas.style.transform = `translate(${editor.canvas_x}px, ${editor.canvas_y}px) scale(${editor.zoom})`;
  }

  function loadFlow(flowId) {
    currentFlowId = flowId;
    editor.clear();
    currentNodes = {};
    firstNodeData = null;
    hideExplanation();

    const data = FLOW_DATA[flowId];
    if (!data) return;

    document.getElementById('general-title').textContent = data.title || 'Explora el Diagrama';
    document.getElementById('general-desc').textContent = data.desc || 'Selecciona un bloque...';

    const dfNodesMap = {};
    let firstNodeId = null;

    data.nodes.forEach(n => {
      let inputs = 1;
      let outputs = 1;
      
      if (n.type === 'input') { inputs = 0; outputs = 1; }
      if (n.type === 'logic') { inputs = 1; outputs = 2; }
      if (n.type === 'action') { inputs = 1; outputs = 1; }

      const headerText = n.type === 'input' ? '▶ Entrada' : n.type === 'logic' ? '◆ Lógica' : '● Acción';
      const html = `
        <div class="df-node">
          <div class="df-header type-${n.type}">${headerText}</div>
          <div class="df-body">
            ${n.name}
          </div>
        </div>
      `;

      const dfId = editor.addNode('node_'+n.id, inputs, outputs, n.x, n.y, 'class-node', { nData: n }, html);
      dfNodesMap[n.id] = dfId;
      currentNodes[dfId] = n;
      
      if (!firstNodeId) {
        firstNodeId = dfId;
        firstNodeData = n;
      }
    });

    data.connections.forEach(conn => {
      const fromId = dfNodesMap[conn.from];
      const toId = dfNodesMap[conn.to];
      const outPort = conn.out || 'output_1';
      const inPort = conn.in || 'input_1';
      if (fromId && toId) {
        editor.addConnection(fromId, toId, outPort, inPort);
      }
    });

    setTimeout(() => {
      if (firstNodeData) {
        centerOnNode(firstNodeData);
        showExplanation(firstNodeData);
      }
    }, 100);
  }

  function showExplanation(node) {
    if (!node || !node.data) return;
    defaultMsg.style.display = 'none';
    detailView.style.display = 'block';
    
    detailView.classList.remove('active-anim');
    void detailView.offsetWidth;
    detailView.classList.add('active-anim');
    
    if (node.type === 'input') { 
      nodeType.textContent = 'Estado Inicial / Sensor'; 
      nodeType.style.color = '#bc8cff'; 
      nodeType.style.borderColor = 'rgba(188, 140, 255, 0.3)'; 
      nodeType.style.background = 'rgba(188, 140, 255, 0.1)'; 
    }
    if (node.type === 'logic') { 
      nodeType.textContent = 'Condición / Decisión'; 
      nodeType.style.color = '#ff7b72'; 
      nodeType.style.borderColor = 'rgba(255, 123, 114, 0.3)'; 
      nodeType.style.background = 'rgba(255, 123, 114, 0.1)'; 
    }
    if (node.type === 'action') { 
      nodeType.textContent = 'Acción de Motores'; 
      nodeType.style.color = '#58a6ff'; 
      nodeType.style.borderColor = 'rgba(88, 166, 255, 0.3)'; 
      nodeType.style.background = 'rgba(88, 166, 255, 0.1)'; 
    }

    nodeTitle.textContent = node.data.title || node.name;
    nodeDesc.textContent = node.data.desc || '';
    nodeCode.innerHTML = highlightSyntax(node.data.code || '');
  }

  function hideExplanation() {
    defaultMsg.style.display = 'block';
    detailView.style.display = 'none';
  }

  function highlightSyntax(code) {
    if (!code) return '';
    let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    escaped = escaped.replace(/(\/\/.*$)/gm, '<span class="syn-comment">$1</span>');
    
    const keywords = ['void', 'int', 'float', 'long', 'if', 'else', 'while', 'for', 'return', 'char', 'const', 'unsigned'];
    keywords.forEach(kw => { escaped = escaped.replace(new RegExp('\\b' + kw + '\\b', 'g'), '<span class="syn-keyword">' + kw + '</span>'); });
    
    const functions = ['medirDistancia', 'avanzar', 'retroceder', 'girar_izquierda', 'girar_derecha', 'detener', 'escanear_sensores', 'abrir_garra', 'cerrar_garra', 'subir_brazo', 'bajar_brazo', 'encender_azul', 'rotar_izquierda', 'rotar_derecha', 'verificar_modo', 'girar_base_derecha', 'girar_base_izquierda', 'setup', 'loop', 'pinMode', 'analogWrite', 'digitalWrite', 'delay', 'control_bluetooth', 'control_infrarrojos', 'evasor_obstaculos', 'seguidor', 'seguidor_lineas', 'evasor_obstaculos_y_anticaidas', 'enableIRIn', 'decode', 'resume'];
    functions.forEach(fn => { escaped = escaped.replace(new RegExp('\\b' + fn + '\\b(?=\\()', 'g'), '<span class="syn-function">' + fn + '</span>'); });
    
    escaped = escaped.replace(/\b(Serial|read|available|speed|speedmax|OUTPUT|INPUT|Servo|attach|write|IrReceiver|IRrecv|decode_results)\b/g, '<span style="color:var(--text-main); font-weight:bold;">$1</span>');
    escaped = escaped.replace(/'(.)'/g, '<span class="syn-string">\'$1\'</span>');
    escaped = escaped.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="syn-number">$1</span>');

    return escaped;
  }

  loadFlow('control_garra');
});
