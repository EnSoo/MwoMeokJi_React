import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Navigation from "../components/Navigation"
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import BackBtn from './BackBtn';

const RecipeEdit = () => {
    const [recipe, setRecipe] = useState({})
    const location = useLocation()
    const navigate = useNavigate()

    //선택된 이미지
    const [image, setImage] = useState(null)

    // 업로드된 이미지 프리뷰
    const [imagePreview, setImagePreview] = useState(null)

    // 작성, 수정
    const [comment, setComment]= useState(null)

    const userAccount = useSelector (state => state.userAccountReducer.userAccount)
    const email = userAccount.email
    useEffect(()=>{
        if (location.pathname.startsWith('/recipe/modify')) {
            setComment('수정')

            setRecipe(location.state.recipe)
            setImagePreview(`${process.env.PUBLIC_URL}/imgs/${location.state.recipe.imgurl}`)

        } else if (location.pathname === '/recipe/add') {
            setComment('작성')
        }
    },[comment])

    //실행중인 디바이스가 브라우저일 경우 일반적인 파일 탐색기 오픈, 스마트폰일 경우 하이브리드 동작(리액트->안드로이드)
    const handleFileChange = (event) => {
        ChangeFile(event);
    };

    const ChangeFile = (event) => {
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        } else {
            console.error('Invalid image file')
            setImage(null)
            setImagePreview(null)
        }
    }
    const Submit = (event) => {
        if(email == '' ) {
            alert('앱에서만 가능한 기능입니다')
            navigate('/', { state: { refresh: true } })
        } else {
            event.preventDefault()
            const sendData = new FormData()
            for (const key in recipe) {
                if (recipe.hasOwnProperty(key)) {
                    sendData.append(key, recipe[key]);
                }
            }
            if (image) {
                sendData.append('imgs[]', image);
            }
            let requestUrl=''
            if(comment=='작성') {
                requestUrl=`${process.env.PUBLIC_URL}/backend/recipe_add.php`
                sendData.append('email',email)
            } else if(comment=='수정') {
                requestUrl=`${process.env.PUBLIC_URL}/backend/recipe_modify.php`
            }
            fetch(requestUrl,{
                method:'POST',
                body:sendData,
            })
            .then(res=>res.text())
            .then(text=>{
                if(text=="200") {
                    // 글 작성 성공 시
                    alert(`레시피 ${comment}에 성공 하였습니다.`)
                    navigate('/recipe', { state: { refresh: true } })
                } else if(text=="201") {
                    // 글 작성 실패 시
                    alert(`레시피 ${comment}에 실패하였습니다.`)
                }
            }).catch(error => console.error('Error:', error));
        }
    }

    return (
        <RecipeEditContainer>
            <Navigation />
            <BackBtn/>
            <RecipeForm onSubmit={Submit}>
                <h1>나만의 레시피 {comment}</h1>
                <RecipeLabel>
                    <LabelText>제목:</LabelText>
                    <RecipeInput
                        type="text"
                        placeholder="제목을 입력해주세요 (20자 이내)"
                        value={recipe.title}
                        onChange={(e)=>setRecipe({...recipe, title:e.target.value})}
                    />
                </RecipeLabel>
                <RecipeLabel>
                    <LabelText>재료:</LabelText>
                    <RecipeTextarea
                        type="text"
                        placeholder="재료를 입력해주세요"
                        value={recipe.ingredients}
                        onChange={(e)=>setRecipe({...recipe, ingredients:e.target.value})}
                    />
                </RecipeLabel>
                <RecipeLabel>
                    <LabelText>조리법:</LabelText>
                    <RecipeTextarea
                        placeholder="조리법을 입력해주세요. 모두가 쉽게 이용할 수 있도록 부탁드립니다."
                        value={recipe.recipe}
                        onChange={(e)=>setRecipe({...recipe, recipe:e.target.value})}
                    />
                </RecipeLabel>
                <RecipeLabel>
                    <LabelText>조리시간/분:</LabelText>
                    <RecipeTextarea
                        placeholder="조리시간을 입력해주세요."
                        value={recipe.times}
                        onChange={(e)=>{
                            const value=e.target.value
                            if(value.length<=10){
                                setRecipe({...recipe, times:value})
                            }
                    }}
                    />
                </RecipeLabel>
                <hr />
                <RecipeLabel>
                    <LabelText>사진 첨부:</LabelText>
                    <RecipeFileInput type="file" accept="image/*" name="imgs[]" onChange={handleFileChange}/>
                    {imagePreview && <ImagePreview src={imagePreview} alt="Preview"/>}
                </RecipeLabel>
                <RecipeFooter>
                    <RecipeButton type="submit">{comment}하기</RecipeButton>
                </RecipeFooter>
            </RecipeForm>
        </RecipeEditContainer>
    );
};

export default RecipeEdit

const RecipeEditContainer = styled.div`
    font-family: 'Arial', sans-serif;
    max-width: 600px;
    margin: auto;
    height: 100%;
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 15px gray;
`

const RecipeForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const RecipeLabel = styled.label`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    color: #333;
    width: 100%;
`

const LabelText = styled.span`
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
`

const RecipeInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: block;
    box-sizing: border-box;
`

const RecipeTextarea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 100px;
    resize: none;
    display: block;
    box-sizing: border-box;
`

const RecipeFileInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`

const ImagePreview = styled.img`
    margin-top: 10px;
    max-width: 300px;
    height: auto;
    border-radius: 5px;
`

const RecipeFooter = styled.div`
    margin-top: 20px;
    text-align: center;
`

const RecipeButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #55A416;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 100px;

    &:hover {
        background-color: #55DD16;
    }
`
