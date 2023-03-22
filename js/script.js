
let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");

btnBuscarFilme.onclick = async () => {
    if(inputBuscarFilme.value.length > 0){
        let filmes = new Array();
        fetch("https://www.omdbapi.com/?apikey=ed5e5ad5&s="+inputBuscarFilme.value, {mode:"cors"})
        .then((resp)=> resp.json())
        .then((resp)=> {
            resp.Search.forEach((item)=>{
                console.log(item);
                let filme=new Filme(
                    item.imdbID,
                    item.Title,
                    item.Year,
                    null,
                    item.Poster,
                    null,
                    null,
                    
                    null,
                    null,
                    null,
                    null,
                
                );
                filmes.push(filme);
            })
            listarFilmes(filmes);
        })
    }
    return false;
}
let listaFilmes = async (filmes) => {
    let listaFilmes = await document.querySelector("#lista-filmes");
    listaFilmes.innerHTML = "";
    console.log(listaFilmes);
    if(filmes.length > 0) {
        filmes.forEach(async(filme) => {
            listaFilmes.appendChild(await filme.getCard());
        });
    }

}

let detalhesFilme = async (id)=>{
    fetch("https://www.omdbapi.com/?apikey=ed5e5ad5&i="+id)
    .then((resp)=> resp.json())
    .then((resp)=> {
        console.log(resp)
        let filme = new Filme(
        resp.imdbID,
        resp.Title,
        resp.Year,
        resp.Category,
        resp.Poster,
        resp.Director,
        resp.Actors,
        resp.Classification,
        resp.Assessment,
        resp.Synopsis,
        )

    });
}

let listarFilmes = async (filmes) => {
    let listaFilmes = await document.querySelector("#lista-filmes");
    listaFilmes.innerHTML ="";

    if(filmes.length > 0) {
        filmes.forEach(async(filme) => {
            console.log(filme);
            listaFilmes.appendChild(await filme.getCard());
            filme.getBtnDetalhes().onclick=()=>{
                detalhesFilme(filme.id);
            }
        });
    }
}
