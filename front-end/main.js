let inpFile = document.querySelector("#file");
let outFileName = document.querySelector("#saida");
let form = document.querySelector("#form");
let endpoit = document.querySelector("#endpoint");
// let btnModal = document.querySelector(".btn")


// btnModal.addEventListener("click", () => {
//     console.log("Fechando Modal")
//     popup.close()
// })

function mudarValor() {
    outFileName.innerText = (inpFile.files[0]?.name || "Selecione um ficheiro");
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

    fetch(endpoit.value, {
        headers: {
            "Accept-Charset": "utf-8"
        },
        method: "post",
        body: formdata,
    })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(data => {
            // console.log(data);
            document.querySelector("section#resp>h2").insertAdjacentHTML("afterend", `<p class='success'>O ficheiro ${data.filename.length > 7 ? data.filename.slice(0, 7) + "..." : data.filename} foi enviado com sucesso no diretorio: <a href="${data.src}" target="_blank">${data.src}</a>.</p>`);
            document.querySelector("section#resp").classList.remove("hide")
            createModal(true, { ...data })
        })
        .catch(erro => {
            createModal(false, { ...erro })
            console.log(erro);
        })
        .finally(() => {
            btnEnviar.classList.remove("disabled");
            btnEnviar.disabled = false;
            console.log("btn abilitado");
            btnEnviar.innerText = "Enviar";
        })
})

function createModal(success, info) {

    console.log(info);

    let popup = document.createElement("dialog");
    popup.id = "popup"
    let aside = document.createElement("aside");
    let img = document.createElement("img");
    img.classList.add("img");
    img.src = success ? "./img/certo.png" : "./img/erro.png";
    let article = document.createElement("article");
    article.classList.add("info");
    let h3 = document.createElement("h3");
    h3.classList.add("info-h3");
    h3.innerText = success ? "Sucesso" : "Erro";
    let p = document.createElement("p");
    p.classList.add("info-text");
    p.innerHTML = success ? `Operação feita com sucesso, O ${`com ip <strong>${info.sendedBy}</strong> enviou o ficheiro <strong>${info.filename}</strong>` || "Usuario enviou o ficheiro <strong>" + info.filename + "</strong>"} com sucesso` : info.sms;
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = "fechar";

    article.insertAdjacentElement("afterbegin", btn)
    article.insertAdjacentElement("afterbegin", p)
    article.insertAdjacentElement("afterbegin", h3)

    aside.insertAdjacentElement("afterbegin", img)

    popup.insertAdjacentElement("afterbegin", article)
    popup.insertAdjacentElement("afterbegin", aside)

    document.body.appendChild(popup)
    popup.showModal()

    btn.addEventListener("click", () => popup.remove())
}
