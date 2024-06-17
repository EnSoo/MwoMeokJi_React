import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navigation from "../components/Navigation";
import styled from 'styled-components';

const RecipeEdit = () => {
    const { no } = useParams();
    const location = useLocation();
    const [recipe, setRecipe] = useState({ 제목: '', 재료: '', 조리법: '', 이미지: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    //fetch는 add-recipe.php, modify-recipe.php만 있으면 됨 - 파일만 만들었음 내용은 추후 써야함 
    //recipe에서 state 로 객체 값을 받아서 화면에 뿌려주면됨. 없을 경우 안뿌려주고
    // state로 값을 받았을 경우 modfiy처리하고, state로 값을 받지 않았을 경우 add 처리

    // 쿼리 파라미터에서 이메일 가져오기
    const query = new URLSearchParams(location.search);
    const email = query.get('email');

    // 데이터를 즉시 가져오는 함수
    const loadData = async () => {
        try {
            const response = await fetch('./backend/get-recipe.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            const recipe = data.find(r => r.no === parseInt(no));
            if (recipe) {
                setRecipe({
                    제목: recipe.title,
                    재료: recipe.ingredients,
                    조리법: recipe.recipe,
                    이미지: recipe.imgurl
                });
                setImagePreview(`${process.env.PUBLIC_URL}/imgs/${encodeURIComponent(recipe.imgurl)}`);
            } else {
                setError('Recipe not found');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트가 마운트되었을 때 즉시 데이터 로드
    if (loading) {
        loadData();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedRecipe = {
            no,
            email,
            title: recipe.제목,
            ingredients: recipe.재료,
            recipe: recipe.조리법,
            imgurl: image ? image.name : recipe.이미지 // 이미지가 변경된 경우 업데이트
        };
        try {
            const response = await fetch('./backend/modify-recipe.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedRecipe)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            await response.json();
            alert('Recipe updated successfully');
        } catch (error) {
            setError(error.message);
        }
    };

    

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            console.error('Invalid image file');
            setImage(null);
            setImagePreview(null);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <RecipeEditContainer>
            <Navigation />
            <RecipeForm onSubmit={handleSubmit}>
                <h1>나만의 레시피 수정</h1>
                <RecipeLabel>
                    <LabelText>제목:</LabelText>
                    <RecipeInput
                        type="text"
                        placeholder="제목을 입력해주세요 (20자 이내)"
                        value={recipe.제목}
                        onChange={(e) => setRecipe({ ...recipe, 제목: e.target.value })}
                    />
                </RecipeLabel>
                <RecipeLabel>
                    <LabelText>재료:</LabelText>
                    <RecipeTextarea
                        placeholder="재료를 입력해주세요"
                        value={recipe.재료}
                        onChange={(e) => setRecipe({ ...recipe, 재료: e.target.value })}
                    />
                </RecipeLabel>
                <RecipeLabel>
                    <LabelText>조리법:</LabelText>
                    <RecipeTextarea
                        placeholder="조리법을 입력해주세요. 모두가 쉽게 이용할 수 있도록 부탁드립니다."
                        value={recipe.조리법}
                        onChange={(e) => setRecipe({ ...recipe, 조리법: e.target.value })}
                    />
                </RecipeLabel>
                <hr />
                <RecipeLabel>
                    <LabelText>사진 첨부:</LabelText>
                    <RecipeFileInput type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
                </RecipeLabel>
                <RecipeFooter>
                    <RecipeButton type="submit">수정하기</RecipeButton>
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