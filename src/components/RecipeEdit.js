import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navigation from "../components/Navigation"
import styled from 'styled-components'

const RecipeEdit = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({ 제목: '', 재료: '', 조리법: '' })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [hasRecipes, setHasRecipes] = useState(false)

    useEffect(() => {
        if (id) {
            // id가 있을 경우, 기존 레시피 정보를 불러와 수정 모드로 설정
            console.log('Fetching recipe for id:', id)
            fetch(`/recipes/${id}.csv`)
                .then(response => response.text())
                .then(csv => {
                    Papa.parse(csv, {
                        header: true,
                        complete: (results) => {
                            console.log('Parsed data:', results.data)
                            const recipeData = results.data.find(r => r.id === id)
                            setRecipe(recipeData)
                            setLoading(false)
                        }
                    })
                })
                .catch(err => {
                    setError(err.message)
                    setLoading(false)
                })
        } else {
            // 서버에서 id와 레시피 존재 여부 확인
            axios.get('/backend/get-recipe.php')
                .then(response => {
                    setHasRecipes(response.data.hasRecipes)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                    setLoading(false)
                })
        }
    }, [id])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!recipe) return <div>Recipe not found</div>

    const handleSubmit = (event) => {
        event.preventDefault()
        // 폼 제출 로직 (저장 또는 업데이트)
        console.log('Form submitted:', recipe, image)
    }

    const handleImageChange = (event) => {
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

    return (
        <RecipeEditContainer>
            <Navigation />
            <RecipeForm onSubmit={handleSubmit}>
                <h1>{hasRecipes ? "나만의 레시피 보기" : "나만의 레시피 등록"}</h1>
                <RecipeLabel>
                    <LabelText>제목:</LabelText>
                    <RecipeInput type="text" placeholder="제목을 입력해주세요 (20자 이내)" value={recipe.제목} onChange={(e) => setRecipe({ ...recipe, 제목: e.target.value })} />
                </RecipeLabel>
                <RecipeLabel>
                    <LabelText>재료:</LabelText>
                    <RecipeTextarea placeholder="재료을 입력해주세요" value={recipe.재료} onChange={(e) => setRecipe({ ...recipe, 재료: e.target.value })} />
                </RecipeLabel>
                <RecipeLabel>
                    <LabelText>조리법:</LabelText>
                    <RecipeTextarea placeholder="조리법를 입력해주세요.&#13;모두가 쉽게 이용할 수 있도록 부탁드립니다." value={recipe.조리법} onChange={(e) => setRecipe({ ...recipe, 조리법: e.target.value })} />
                </RecipeLabel>
                <hr></hr>
                <RecipeLabel>
                    <LabelText>사진 첨부:</LabelText>
                    <RecipeFileInput type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
                </RecipeLabel>
                <RecipeFooter>
                    <RecipeButton type="submit">{hasRecipes ? "보기" : "등록하기"}</RecipeButton>
                </RecipeFooter>
            </RecipeForm>
        </RecipeEditContainer>
    );
};

export default RecipeEdit;

const RecipeEditContainer = styled.div`
    font-family: 'Arial', sans-serif;
    max-width: 600px;
    margin: auto;
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }
`