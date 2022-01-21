import React from "react";
import "./index.css";
import {Container} from 'react-bootstrap';
import imgnoticia from "./../PaginaProjetos/imgnoticia.png";
import imgnoticia2 from "./../PaginaProjetos/imgnoticia2.jpg";
import imglike from "./../PaginaProjetos/imglike.png";
import { db } from './../../../firebase-config';
import { uid } from "uid";
import { set,ref, onValue} from 'firebase/database';
import { useState,useEffect } from "react";
import Axios  from "axios";

const Projetos = ()=>{
    const [todo,setTodo] = useState("");
    const [todos,setTodos] = useState([]);

    const handleTodoChange = (event) => {
        setTodo(event.target.value)
    };

    var likecount = 0
    function liked(){
        likecount =+1;
    } 
    ///read________________________________________________
    //read
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
        setTodos([]);
        const data = snapshot.val();
        if (data !== null) {
            Object.values(data).map((todo) => {
            setTodos((oldArray) => [...oldArray, todo]);
            });
        }
        });
    }, []);
    ///write_______________________________________________
    const writeToDatabase = () => {
        const uuid = uid();
        set(ref(db, `/${uuid}`),{
        todo,
        uuid,
    });
    setTodo("");
    };
   
    ///update
    ///delete


    return(<>
        <Container>
        
        <div className="noticia"><h1>teste</h1>
            {todos.map((todo)=>(
                <>
                    {///Estrutura Básica de Tópicos.
                    }
                    <div className="noticia">
                        <h1>{todo.todo}</h1>
                        <div>
                        <p>Lorem ipsum...</p><br/>
                        <textarea placeholder="Deixar Comentário"></textarea><br/>
                        <button>Comentar</button>
                        </div>
                    </div>
                
                </>
            ))}
        </div>
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
        {//Div com interações LIKE e COMENTARIO//
        }
        <div className="socialbox">
        <img className="like" alt="Imagem de um coração cor-de-rosa com um símbolo que significa 'coração'.Clique para curtir a postagem." width={45} src={imglike}></img> <p> 0 Curtidas</p>
        <div><h1>Comentários:</h1></div>
        <div onChange={handleTodoChange}>Deixar um Comentário:<br/><textarea></textarea><br/>
        <button onClick={writeToDatabase} >Publicar</button></div></div>
        
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
        {//Div com interações LIKE e COMENTARIO//
        }
        <div className="socialbox">
        <img className="like" alt="Imagem de um coração cor-de-rosa com um símbolo que significa 'coração'.Clique para curtir a postagem." width={45} src={imglike}></img> <p> 0 Curtidas</p>
        </div>
        <div><h1>Comentários:</h1></div>
        <div>Deixar um Comentário:<br/><textarea></textarea><br/>
        <button>Publicar 2</button></div>
        </div>
        
        </Container>
        </>
    );
}

export default Projetos;