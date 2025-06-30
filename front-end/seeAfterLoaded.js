dadosDiv = document.querySelector(".data")
let data = [];

async function load() {
    try {
        const URLBase = "http://10.10.10.10:6106/list";
        data = await fetch(URLBase);
        data = await data.json()
        // console.log(data);
    } catch (error) {
        console.log(error);
    }


    data.forEach((v, i) => {
        let div = document.createElement("div");
        let details = document.createElement("details");
        let summary = document.createElement("summary");

        let tag;
        if (v.mimetype.includes("video")) {
            tag = document.createElement("video");
            tag.classList.add("video");
            tag.controls = true;
            tag.src = v.src;
        } else if (v.mimetype.includes("image")) {
            tag = document.createElement("img");
            tag.classList.add("image")
            tag.src = v.src;
        } else if (v.mimetype.includes("audio")) {
            tag = document.createElement("audio");
            tag.classList.add("audio")
            tag.src = v.src;
        } else if (v.mimetype.includes("pdf")) {
            tag = document.createElement("pdf");
            tag.classList.add("pdf")
            tag.src = v.src;
        } else {
            tag = document.createElement("a");
            tag.href = v.src;
        }
        summary.innerText = v.filename

        div.appendChild(details)
        details.appendChild(tag)
        details.appendChild(summary)
        details.insertAdjacentHTML("beforeend", `<p>ID: ${v.id}</p>`)
        details.insertAdjacentHTML("beforeend", `<p>Nome: ${v.filename}</p>`)
        details.insertAdjacentHTML("beforeend", `<p>Tamanho: ${((v.size / 1024) / 1024).toFixed(1)}MB</p>`)
        details.insertAdjacentHTML("beforeend", `<p>Mimetype: ${v.mimetype}</p>`)
        details.insertAdjacentHTML("beforeend", `<p>Data: ${v.data.replace("T"," ")}</p>`)
        details.insertAdjacentHTML("beforeend", `<a href="${v.src}" download>${"baixar"}</a>`)

        // dadosDiv.appendChild(div);
        dadosDiv.insertAdjacentElement("afterbegin",div);
    });
}

load()