export function getId() {
    let id = new URLSearchParams(window.location.search).get("id")
    return id
}

export function getNombre() {
    let nombre = new URLSearchParams(window.location.search).get("nombre")
    return nombre
}

export function getEmail() {
    let email = new URLSearchParams(window.location.search).get("email")
    return email
}

export function getPassword() {
    let password = new URLSearchParams(window.location.search).get("password")
    return password
}