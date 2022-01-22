import React from "react";
import "./index.css";
import { Container } from 'react-bootstrap';
import { db } from './../../../firebase-config';
import { uid } from "uid";
import { set,ref, onValue, remove, update } from 'firebase/database';
import { useState,useEffect } from "react";
import Axios  from "axios";

//Com o useEffect, qualquer coisa vai ser chamada quando a página renderizar novamente.

const Projetos = ()=>{
    const [todo,setTodo] = useState("");
    const [todos,setTodos] = useState([]);

    const [isEdit,setIsEdit] = useState(false);
    const [tempUuid,setTempUuid] = useState("");

    useEffect(()=>{
        console.log("Página recarregada.")

    })
    //É chamado ao alterar o input, quando clicar em Enviar envia o todo atualizado.
    const handleTodoChange = (e) => {
        setTodo(e.target.value)

    };

    ///read________________________________________________

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
    //Reseta o Todo
    setTodo("");
    };
   
    ///update
    const handleUpdate = (todo) =>{
        setIsEdit(true);
        setTempUuid(todo.uuid);
        setTodo(todo.todo);
    }
    ///delete
    const handleRemove = (todo) => {
        remove(ref(db, `/${todo.uuid}`));
    }


    const handleSubmitChange = () =>{
        update(ref(db, `/${tempUuid}`),{
            todo,
            uuid: tempUuid,
        })
        setTodo("");
        setIsEdit(false);
    }


    return(<>
        <Container>
        <div className="pagdescription" >
        <h1>PROJETOS</h1>
        </div>
            {todos.map((todo)=>(
                <>
                    {///Estrutura Básica de Tópicos.
                    }
                    <div className="noticia">
                        <h1>{todo.todo}</h1>
                        <div>
                        <p>Descrição do Projeto...</p><br/>
                        <label>0</label> <button>Curtir</button><br/>
                        <textarea placeholder="Deixar Comentário"></textarea><br/>
                        <button>Comentar</button><br/>
                        {}<br/>
                        <button onClick={()=>{handleUpdate(todo)}}>Alterar</button>
                        <button onClick={()=>{handleRemove(todo)}}>Apagar</button>
                        </div>
                    </div>
                
                </>
            ))}

        <div className="noticia">
        <h3>Adicionar Postagem:
        </h3><br/>


        <div className="socialbox">
        <div><h1>Título:</h1></div>
        <div><br/>
        <input onChange={handleTodoChange} type='text' value={todo} ></input>
        <br/>
        {isEdit? <div><button onClick={handleSubmitChange}>Atualizar</button><button onClick={()=>{setIsEdit(false)}}>X</button></div> :<button onClick={writeToDatabase}>Enviar</button>}</div></div>
        </div>
        </Container>
        </>
    );
}

export default Projetos;