
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("malla-container");
    const select = document.getElementById("mencion");

    fetch("data/malla.json")
        .then(res => res.json())
        .then(data => {
            const renderMalla = (mencion) => {
                container.innerHTML = "";
                data.semestres.forEach(sem => {
                    if (sem.mencion && sem.mencion !== mencion) return;

                    const div = document.createElement("div");
                    div.className = "semestre";
                    const title = document.createElement("h2");
                    title.textContent = sem.nombre;
                    div.appendChild(title);

                    sem.materias.forEach(mat => {
                        const matDiv = document.createElement("div");
                        matDiv.className = "materia";
                        const estado = localStorage.getItem(mat.nombre) || "pendiente";

                        matDiv.innerHTML = \`
                            <strong>\${mat.nombre}</strong> (\${mat.ucr} créditos, \${mat.tipo})
                            <select class="estado" data-nombre="\${mat.nombre}">
                                <option value="pendiente" \${estado === "pendiente" ? "selected" : ""}>Pendiente</option>
                                <option value="cursando" \${estado === "cursando" ? "selected" : ""}>Cursando</option>
                                <option value="aprobada" \${estado === "aprobada" ? "selected" : ""}>Aprobada</option>
                            </select>
                        \`;
                        div.appendChild(matDiv);
                    });

                    container.appendChild(div);
                });

                document.querySelectorAll("select.estado").forEach(sel => {
                    sel.addEventListener("change", () => {
                        localStorage.setItem(sel.dataset.nombre, sel.value);
                    });
                });
            };

            select.addEventListener("change", () => renderMalla(select.value));
            renderMalla(select.value);
        });
});

