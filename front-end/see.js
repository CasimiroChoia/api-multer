(async () => {
    try {
        const URLBase = "http://10.10.10.10:6106/list";
        let aaa;
        aaa = await fetch(URLBase, { mode: "no-cors" });
        // aaa = aaa.json()
        console.log(aaa.body);
    } catch (error) {
        console.log(error);
    }
})()