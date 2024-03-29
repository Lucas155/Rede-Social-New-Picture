import React from 'react';
import Input from '../../components/Form/Input/Index';
import Button from '../../components/Form/Button/Index';
import styles from  './StiloPerfilPost.module.css';
import useForm from '../../Hooks/UseForm';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { UserContext } from '../../UserContext';

const PerfilPost = () => {
    const descricao = useForm();
    const [img, setImg] = React.useState({});
    const [Name, setname] = React.useState('');
    const navigate = useNavigate();
    const Username = window.localStorage.getItem('Username');
    const User = window.localStorage.getItem('id');

    function handleSubmit(event){
        event.preventDefault();
        
        const formData = new FormData();
          formData.append("img", img.raw);
          formData.append('descricao', descricao.value);       
          formData.append("author", Username);

         fetch('http://localhost:8080/api', {
           method: 'POST',
           body: formData,

         })
           .then((response) => {
             console.log(response);
             return response.json();
           })
           .then((json) => {
             console.log(json);
             return json;
           });

           alert("Imagem foi Postada");
           setImg('');
           console.log(descricao);
    }

    function handleImgChange({target}){
        setImg({
            preview: URL.createObjectURL(target.files[0]),
            raw: target.files[0],
        });
    }

    const handleChange = (event) => {
      setname(event.target.value);
      console.log(Name);
    }

  return (
      <section className={styles.photoPost}> 
      <Header/>
          <h1 className={styles.title}>Poste sua foto</h1>  
          <form onSubmit={handleSubmit}>
            <label className={styles.arquivo} for="arquivo">Enviar Foto</label>
            <input className={styles.file} type="file" name="arquivo" id="arquivo" onChange={handleImgChange}/>
            <label>Legenda</label>
            <textarea className={styles.inputDescricao}  type="text" name="descricao" {...descricao} />
            <Button className={styles.buttonPost}>Publicar</Button>
          </form>
          <div className={styles.img}>
                {img.preview && (
                    <div className={styles.preview} style={{backgroundImage: `url('${img.preview}')`}}></div>
                )}    
          </div>
      </section>
  );
}

export default PerfilPost;