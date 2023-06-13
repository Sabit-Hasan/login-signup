import React,{useRef, useState} from 'react';

const GetFormData = () =>{
  const [formInfo, setFormInfo] = useState('');
  const form = useRef();
  
  const formData = (e) =>{
    e.preventDeafult();
    const name = form.corrent.name.value;
    const gmail = form.corrent.name.value;
    const password = form.corrent.name.value;
    setFormInfo({name,gamil,password});
    e.target.reset();
  }
  
  console.log(formInfo);

  return(
    <>
      <div>
        <div>{formInfo.name}</div>
        <div>{formInfo.gmail}</div>
        <div>{formInfo.password}</div>
      </div>

    </>
  )
