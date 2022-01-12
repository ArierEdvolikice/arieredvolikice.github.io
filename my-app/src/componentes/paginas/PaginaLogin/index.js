import React, { useState } from 'react';
import './index.css';
import {Container,Stack} from 'react-bootstrap';
import { auth } from "./../../../firebase-config";
import 'bootstrap';
import {createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth'; //importando dependencias de autenticacao do Google Firebase.
//Importando a variavel que lida com o auth criada no firebase-config

const Login = ()=>{
    //construtores
    const [registerEmail,setRegisterEmail] = useState("");
    const [registerPassword,setRegisterPassword] = useState("");

    const [loginEmail,setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("");

    const [user,setUser] = useState({});

    onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
    })

    //funcoes principais
    const register = async ()=>{
        try{ //Tentar criar a conta
            //Cria o "user" e envia para o firebase o valor dessa constante.
        const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword);
            console.log(user);
            console.log(auth.currentUser.email);
        } //lidando com erros 
        catch (error){
            console.log(error.message);
        }
    };
    const login = async ()=>{
        try{ //Tentar criar a conta
            //Cria o "user" e envia para o firebase o valor dessa constante.
        const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword);
            console.log(user);
            console.log(auth.currentUser.email);
        } //lidando com erros 
        catch (error){
            console.log(error.message);
        }
    };
    const logout = async ()=>{
        await signOut(auth);
    };
    return(
        
        <>
        {
            ////////////////////////////////////REGISTRE-SE//////////////////////////////
        }
        <div className="pagdescription" >
        <h1>LOGIN</h1>
        </div>
        <Container><Stack gap={3}>
            <div className="box" >
                <h0>Registre-se:</h0>
                <div class="form-group" classname="Área de E-mail.">
                    <label for="inputEmailRegistro" classname="Campo de E-mail.">Endereço de E-mail</label>
                    <input onChange={(event) => {
                        //Usa o react useState p/ guardar modificações no target desse input.
                        //Email do Login.
                        setRegisterEmail(event.target.value);
                    } } type="email" class="form-control" id="inputEmailRegistro" aria-describedby="emailHelp" placeholder="Seu E-mail" />
                </div>

                <div class="form-group" classname="Área de senha">
                    <label for="senha1" classname="Primeiro Campo de Senha.">Senha:</label>
                    <input onChange={(event) => {
                        //Usa o react useState p/ guardar modificações no target desse input.
                        //Senha do Login.
                        setRegisterPassword(event.target.value);
                    } } type="password" class="form-control" id="senha1" placeholder="Sua senha" />
                </div>
                <button type="submit" onClick={register} class="btn btn-primary">Criar Conta</button>
                <button type="submit" onClick={login} class="btn btn-primary">Entrar</button>

            <h0>Faça Login:</h0>

            <div class="form-group" classname="Área de E-mail.">
                    <label for="inputEmailLogin" classname="Campo de E-mail.">Endereço de E-mail</label>
                    <input onChange={(event) => {
                        //Usa o react useState p/ guardar modificações no target desse input.
                        //Email do Login.
                        setLoginEmail(event.target.value);
                    } } type="email" class="form-control" id="inputEmailRegistro" aria-describedby="emailHelp" placeholder="Seu E-mail" />
                </div>

                <div class="form-group" classname="Área de senha">
                    <label for="senha1" classname="Primeiro Campo de Senha.">Senha:</label>
                    <input onChange={(event) => {
                        //Usa o react useState p/ guardar modificações no target desse input.
                        //Senha do Login.
                        setLoginPassword(event.target.value);
                    } } type="password" class="form-control" id="senha1" placeholder="Sua senha" />
                </div>
            

        {/////////////// BOTAO BASICO DE LOGOUT QUE DEPOIS SERA ADAPTADO//////////////////////////////
        }
        
        <button type="button" onClick={logout} class="btn btn-danger">Sair</button>
 
        <p>E-mail:</p> {user?.email}
        </div>
        </Stack></Container>
            </>
        
    );
    
};
export default Login;