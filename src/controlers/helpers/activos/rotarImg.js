const rotarImg = e =>{
    const img = e.target
    if (img.naturalWidth < img.naturalHeight){
        img.classList.remove('w-100')
        img.classList.add('w-50')
    }
}

export{
    rotarImg
}