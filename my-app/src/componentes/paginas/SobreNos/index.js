import React from "react";
import "./index.css";
const Contato = () => {
    return (<>

        <h1>SOBRE NÓS</h1>

        <div className="sobrenos-section">
            <div className="sobrenos-01">
                Bla bla bla
            </div>
            <div className="sobrenos-02">
                <form>
                    <input name="name" type="text" class="feedback-input" placeholder="Nome" />
                    <input name="email" type="text" class="feedback-input" placeholder="E-mail" />
                    <textarea name="text" class="feedback-input" placeholder="Comentar"></textarea>
                    <input type="enviar" value="ENVIAR" />
                </form>
            </div>
        </div>




    </>

    );
}

export default Contato;