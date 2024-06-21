import React from "react";
import { useHistory }  from 'react-router-dom'
import styled from "styled-components";

const BackBtn= ()=> {
    const history = useHistory()
    return(
        <Button onClick={ () => history.goBack() }>&larr; Back</Button>
    )
}

export default BackBtn

const Button= styled.button`
background: none;
border: none;
font-size: 1.2rem;
cursor: pointer;
&:hover{
    text-decoration: underline;
}

`