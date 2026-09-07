let pyodide;

async function loadPy() {
    pyodide = await loadPyodide();
}
loadPy();

// generic runner for any python cell
async function runPyCell(textareaId, outputId) {
    const code = document.getElementById(textareaId).value;

    try {
        let output = "";
        pyodide.setStdout({
            batched: (data) => {
                output += data + "\n";
            }
        });

        const result = await pyodide.runPythonAsync(code);

        document.getElementById(outputId).textContent =
            output.trim() || (result !== undefined ? result : "");
    } catch (err) {
        document.getElementById(outputId).textContent = err;
    }
}
