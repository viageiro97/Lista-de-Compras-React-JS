import './App.css';
import {useState,useEffect} from 'react';
import Modal from './Modal';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

function App() {
  const[item, setItem] = useState('');
  const[produtos, setProdutos] = useState([]);
  const [edit,setEdit]=useState({isEditing:false,id:""})
  const[modalSatus,setModalStatus] = useState({css:"",message:""});

  useEffect(() => {
   const produtosMemoria = localStorage.getItem('produtosMemoria');
   produtosMemoria&&setProdutos(JSON.parse(produtosMemoria));
  },[]);

//RestoreDefautl
function restoreDefault(){
  setEdit({isEditing:false,id:""});
  setItem("");
}

//Add Item to the List and in LocalStorage!
  function handleSubmit(e){
    e.preventDefault();
    if(item){
      if(edit.isEditing){
        produtos.forEach(produto=>{
          if(edit.id === produto.id){
            produto.content=item;
            localStorage.setItem('produtosMemoria',JSON.stringify(produtos));
            setModalStatus({css:"success",message:"Artigo Actualizado!",isOn:true});
            restoreDefault();
          }
        })
        return
      }
      const a = new Date().getTime();
      const newItem = {id:a,content:item}
      const newProdutos = [...produtos,newItem];
      const newProdutosOrdenado = newProdutos.reverse();
      localStorage.setItem('produtosMemoria',JSON.stringify(newProdutosOrdenado));
      setProdutos(newProdutosOrdenado);
      setItem('');
      setModalStatus({css:"success",message:"Inserido com Sucesso!",isOn:true});
    }else{
      setModalStatus({css:"fail",message:"Não pode estar Vazio",isOn:true});
    }
  }

//Remove Item
function removeItem(id){
  const newProdutos = produtos.filter(produto=>produto.id!==id);
  localStorage.setItem('produtosMemoria',JSON.stringify(newProdutos));
  setProdutos(newProdutos);
  setModalStatus({css:"success",message:"Artigo Removido com Sucesso",isOn:true});
  restoreDefault();
}

//Remove All items
function removeAllItems(){
  setProdutos([]);
  localStorage.removeItem('produtosMemoria');
  setModalStatus({css:"success",message:"Todos Item foram Removidos",isOn:true});
}

//Edit Item
function editItem(id){
  const editing = produtos.filter(produto=>produto.id===id);
  setItem(editing[0].content);
  setEdit({isEditing:true,id:id});
}

//Hide Modal Alert!
  function hideModal() {
    setModalStatus({css:"",message:"",isOn:false});
  }
  return (
    <section className="compras">
      {
        modalSatus.isOn&&<Modal hideModal={hideModal} {...modalSatus}/>
      }
      <h1 className="compras-titulo">Lista de Compras</h1>
      <form onSubmit={handleSubmit} className="compras-formulario">
        <input onChange={
          (e)=>{setItem(e.currentTarget.value)}
        } value={item} placeholder="Ex: Arroz..." type="text" name="item" id=""/>
        <button type="submit">{edit.isEditing?"Actualizar":"Adicionar"}</button>
      </form>
      <div className="compras-lista">
        {
          produtos.map((produto)=>{
            return(
              <article key={produto.id} className="item">
                <p>{produto.content}</p>
                <button onClick={()=>editItem(produto.id)} className="btn btn-edit"><FaEdit className="icon"/></button>
                <button onClick={()=>removeItem(produto.id)} className="btn btn-delete"><FaTrash className="icon"/></button>
              </article>
            )
          })
        }
      </div>
      <div className="compras-footer">
        {produtos.length>0&&<button onClick={removeAllItems} className="btn-deleteAll">Apagar Todos</button>}
      </div>
    </section>
  )
}

export default App;

/*HandCrafted by Victor Felizardo Viageiro*/