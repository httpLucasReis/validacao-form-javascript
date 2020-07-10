const fields = document.querySelectorAll("[required]");
console.log(fields);

function customValidation(event) {

    const field = event.target; // o alvo que disparou o evento

    // Verificando se já ouve um campo inválido
    /* Se o setCustomValidy não for resetado o html enxerga 
       todos os outros inputs como inválidos
    */

    function verifyErrors() {
        let foundError = false;

        // Intera cada uma das propriedade dos objetos 
        for (let error in field.validity) {
            // se não for customError
            // e então verifica se existem algum outro error: o valor terá que ser true
            // field.validity[error] -> error = nome de alguma propriedade do validity
            if (error != "customError" && field.validity[error]) {
                foundError = error;
            }
        }

        return foundError;
    }

    const error = verifyErrors();
    console.log("Error exists: ", error);

    if (error) {
        field.setCustomValidity("Esse campo é obrigatório");
    } else {
        // Reiniciando validity
        field.setCustomValidity("");
    }

}

// trocar mensagem de required

for (let field of fields) {
    // O evento ocorre caso um campo do formulário estaja inválido
    field.addEventListener("invalid", customValidation);
}

// Impede o envio do formulário
document.querySelector("form")
    .addEventListener("submit", (event) => {
        alert("Formulário enviado")

        // Impede o envio de formulário
        event.preventDefault();
    });