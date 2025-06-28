let inpFile = document.querySelector("#file");
let outFileName = document.querySelector("#saida");
let form = document.querySelector("#form");
let endpoit = document.querySelector("#endpoint");
let hasResp = false;

function mudarValor() {
    outFileName.innerText = (inpFile.files[0]?.name || "Selecione um ficheiro");
    // console.log(inpFile.files[0]?.name || "Selecione um ficheiro");
    // console.log(inpFile?.files[0] || "Selecione um ficheiro");
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let btnEnviar = document.querySelector("#btnEnviar");
    console.log("btn disablitado");
    btnEnviar.disabled = true;
    btnEnviar.classList.add("disabled");
    btnEnviar.innerText = "Espere...";
    let file = inpFile.files[0];
    let formdata = new FormData();
    formdata.append("file", file);
    formdata.append("filename", file.name);
    formdata.append("mimetype", file.type);
    formdata.append("size", file.size);

    // let resp = await fetch("http://10.10.10.10:6106/list");
    // let data = await resp.json()
    // console.log(JSON.stringify(data));


    fetch(endpoit.value, {
        method: "post",
        body: formdata,
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            // console.log(data);
            document.querySelector("section#resp>h2").insertAdjacentHTML("afterend", `<p class='success'>O ficheiro ${data.filename.length > 7 ? data.filename.slice(0, 7) + "..." : data.filename} foi enviado com sucesso no diretorio: ${data.src}.</p>`);
            document.querySelector("section#resp").classList.remove("hide")
        })
        .catch(erro => {
            console.log(erro);
        })
        .finally(() => {
            btnEnviar.classList.remove("disabled");
            btnEnviar.disabled = false;
            console.log("btn abilitado");
            btnEnviar.innerText = "Enviar";
        })
})
