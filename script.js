  // Credenciales fijas
  const USER = 'admin';
  const PASS = '1234';

  function login() {
    const user = document.getElementById('userInput').value.trim();
    const pass = document.getElementById('passInput').value;

    if (user === USER && pass === PASS) {
      // Ocultar login, mostrar sistema
      document.getElementById('loginDiv').style.display = 'none';
      document.getElementById('sistemaDiv').style.display = 'block';
      // Limpiar login inputs
      document.getElementById('userInput').value = '';
      document.getElementById('passInput').value = '';
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  // Sistema de cursos y estudiantes
  const estudiantes = [];
  const cursos = [];

  class Estudiante {
    constructor(nombre) {
      this.nombre = nombre;
      this.cursos = [];
      this.calificaciones = {};
    }
    inscribirse(curso) {
      if (!this.cursos.includes(curso)) {
        this.cursos.push(curso);
        curso.estudiantes.push(this);
      }
    }
    registrarCalificacion(curso, examen, nota) {
      if (!this.calificaciones[curso.nombre]) {
        this.calificaciones[curso.nombre] = [];
      }
      this.calificaciones[curso.nombre].push({ examen, nota });
    }
    promedio(curso) {
      const notas = this.calificaciones[curso.nombre] || [];
      if (notas.length === 0) return 0;
      return notas.reduce((acc, n) => acc + n.nota, 0) / notas.length;
    }
  }

  class Curso {
    constructor(nombre) {
      this.nombre = nombre;
      this.estudiantes = [];
    }
  }

  function buscarOCrearEstudiante(nombre) {
    let est = estudiantes.find(e => e.nombre.toLowerCase() === nombre.toLowerCase());
    if (!est) {
      est = new Estudiante(nombre);
      estudiantes.push(est);
    }
    return est;
  }

  function buscarOCrearCurso(nombre) {
    let curso = cursos.find(c => c.nombre.toLowerCase() === nombre.toLowerCase());
    if (!curso) {
      curso = new Curso(nombre);
      cursos.push(curso);
    }
    return curso;
  }

  function guardar() {
    const studentName = document.getElementById('studentName').value.trim();
    const courseName = document.getElementById('courseName').value.trim();
    const examName = document.getElementById('examName').value.trim();
    const examGrade = parseFloat(document.getElementById('examGrade').value);

    if (!studentName || !courseName || !examName || isNaN(examGrade) || examGrade < 0 || examGrade > 100) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    const estudiante = buscarOCrearEstudiante(studentName);
    const curso = buscarOCrearCurso(courseName);

    estudiante.inscribirse(curso);
    estudiante.registrarCalificacion(curso, examName, examGrade);

    let reporte = `Estudiante: ${estudiante.nombre}\nCurso: ${curso.nombre}\nExamen: ${examName}\nCalificación: ${examGrade}\n\n`;
    reporte += 'Historial de Exámenes:\n';
    const califs = estudiante.calificaciones[curso.nombre];
    califs.forEach(c => {
      reporte += `  - ${c.examen}: ${c.nota}\n`;
    });

    const prom = estudiante.promedio(curso).toFixed(2);
    const estado = prom >= 60 ? 'APROBADO ✅' : 'REPROBADO ❌';

    reporte += `\nPromedio: ${prom}\nEstado: ${estado}\n`;
    reporte += '------------------------------\n';

    const divResultado = document.getElementById('resultado');
    divResultado.textContent += reporte;

    // Limpiar inputs
    document.getElementById('studentName').value = '';
    document.getElementById('courseName').value = '';
    document.getElementById('examName').value = '';
    document.getElementById('examGrade').value = '';
  }