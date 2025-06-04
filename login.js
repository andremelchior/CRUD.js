function database() {
    let db = [
        {
            id: 1,
            usuario: "admin",
            email: "admin@gmail.com",
            senha: "admin1234",
        },
        {
            id: 2,
            usuario: "user",
            email: "user@gmail.com",
            senha: "user1234",
        }
    ];

    let json = JSON.stringify(db);
    localStorage.setItem("bancodedados", json);
}

function logar(event) {
    event.preventDefault();

    let mail = document.querySelector("#email").value;
    let sn = document.querySelector("#senha").value;
    let dados = JSON.parse(localStorage.getItem("bancodedados"));

    for (let i = 0; i < dados.length; i++) {
        if (mail == dados[i].email && sn == String(dados[i].senha)) {
            cadastroOK = true;
            if (mail == "admin@gmail.com" && sn == "admin1234") {
                sessionStorage.setItem("admin", dados[i].usuario);
                window.location.href = "painel.html";
            } else {
                sessionStorage.setItem("usuario", dados[i].usuario);
                window.location.href = "home.html";
            }
            break;
        }else{
            cadastroOK = false;
        }
    }
    if (cadastroOK != true){
        window.alert("E-mail ou senha incorretos! tente novamente.");
    }
}

function logado() {
    const user = sessionStorage.getItem("usuario");
    document.querySelector("#nome-usuario").innerHTML = user;
}

document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("bancodedados")) {
        database();
    }

    const form = document.getElementById("loginForm");
    if (form) {
        form.addEventListener("submit", logar);
    }

    if (window.location.pathname.includes("login.html")) {
        const usuario = sessionStorage.getItem("usuario");
        if (usuario) {
            const main = document.querySelector("main");
            if (main) {
                main.innerHTML = `
                    <div class="alert alert-info" style="margin-top:40px;">
                        Você já está logado como <strong>${usuario}</strong>.<br>
                        <button id="logoutBtn" class="btn btn-danger" style="margin-top:10px;">Fazer logout</button>
                    </div>
                `;
                document.getElementById("logoutBtn").onclick = function () {
                    sessionStorage.removeItem("usuario");
                    window.location.reload();
                };
            }
        }
    }
});