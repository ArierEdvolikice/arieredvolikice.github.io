import React from "react";
import "./index.css";
import {Container} from 'react-bootstrap';
import imgnoticia from "./../PaginaProjetos/imgnoticia.png";
import imgnoticia2 from "./../PaginaProjetos/imgnoticia2.jpg";
import imglike from "./../PaginaProjetos/imglike.png";

const Projetos = ()=>{
    var likecount = 0
    function liked(){
        likecount =+1;
    }
    return(
        <><Container>
        <div className="pagdescription" >
        <h1>PROJETOS</h1>
        </div>

        <div className="noticia">
        {//Titulo da noticia///
        }
        <h3>Projeto Lorem Ipsum
        </h3><small>Por: Administrador</small><br/><br/>
        {//Texto da noticia///
        }
        <p><img height={300}  src={imgnoticia}></img><br/><br/>
        Lorem, ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem, ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem, ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem, ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        </div>
        <div className="noticia">
        {//Titulo da noticia///
        }
        <h3>Projeto Ipsum Lorem 3: lorem ipsum
        </h3><small>Por: Administrador</small><br/><br/>
        {//Texto da noticia///
        }
        <p><img height={400} src={imgnoticia2}></img><br/><br/>
        Lorem, ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem, ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua        </p>
        {//Div com interações//
        }
        <div>
        <img className="like" width={50} src={imglike}></img> <p> 0 Curtidas</p>
        </div>
        </div>
        
        </Container></>
    );
}

export default Projetos;