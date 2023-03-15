
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

setBtnDetalhes=() => {
    this.btnDetalhes.appendChild(document.createElement('button'));
    this.btnDetalhes.appendChild(document.createElement('Detalhes'));
    this.btnDetalhes.setAttribute("id", this.id);
    this.btnDetalhes.setAttribute("class", "btnDetalhesFilme");

}

getBtnDetalhes=()=>{
    return this.btnDetalhes
}

let detalhesFilme = async (id)=>{
    fetch("https://www.omdbapi.com/?apikey=ed5e5ad5&i="+id)
    .then((resp)=> resp.json())
    .then((resp)=> {
        console.log(resp)
        let filme = new filme 
        resp.Poster,
        resp.Title;
        

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
