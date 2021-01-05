function Modal({hideModal,css,message}){
    const estilo = `alert alert-${css}`
    setTimeout(() => {
        hideModal();
    }, 3000);
    return(
        <p className={estilo}>{message}</p>
    )
}

export default Modal;

/*HandCrafted by Victor Felizardo Viageiro*/