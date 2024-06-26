import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from "../components/Navigation";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import BackBtn from './BackBtn';

const RecipeEdit = () => {
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: '',
        recipeText: '',
        times: '',
        calories: '',
        spiciness: '',
        Cold: 0,
        Warm: 0,
        soup: 0,
        vegan: 0,
        meat: 0,
        categories: '',
        customCategory: '',
        dishType: '' // 초기 값을 문자열로 설정합니다.
    });
    const [ingredients, setIngredients] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [comment, setComment] = useState(null);
    const userAccount = useSelector(state => state.userAccountReducer.userAccount);
    const email = userAccount.email;

    useEffect(() => {
        if (location.pathname.startsWith('/recipe/modify')) {
            setComment('수정');
            setRecipe(location.state.recipe);
            setImagePreview(`${process.env.PUBLIC_URL}/imgs/${location.state.recipe.imgurl}`);
        } else if (location.pathname === '/recipe/add') {
            setComment('작성');
        }

        if (location.state && location.state.recipe) {
            setRecipe(location.state.recipe);
        }
    }, [location.pathname, location.state]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'Cold' || name === 'Warm') {
                setRecipe(prev => ({
                    ...prev,
                    [name]: checked ? 1 : 0
                }));
            } else if (name === 'dishType') {
                const dishTypes = recipe.dishType ? recipe.dishType.split(',') : [];
                if (checked) {
                    dishTypes.push(value);
                } else {
                    const index = dishTypes.indexOf(value);
                    if (index > -1) {
                        dishTypes.splice(index, 1);
                    }
                }
                setRecipe(prev => ({
                    ...prev,
                    dishType: dishTypes.join(',')
                }));
            } else {
                setRecipe(prev => ({
                    ...prev,
                    [name]: checked ? 1 : 0
                }));
            }
        } else if (type === 'radio') {
            if (name === 'vegan') {
                setRecipe(prev => ({
                    ...prev,
                    vegan: value === 'vegan' ? 1 : 0,
                    meat: value === 'vegan' ? 0 : 1
                }));
            } else if (name === 'meat') {
                setRecipe(prev => ({
                    ...prev,
                    meat: value === 'meat' ? 1 : 0,
                    vegan: value === 'meat' ? 0 : 1
                }));
            } else if (name === 'soup') {
                setRecipe(prev => ({
                    ...prev,
                    soup: value === '1' ? 1 : 0
                }));
            } else {
                setRecipe(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
        } else if (name === 'categories') {
            setRecipe(prev => ({
                ...prev,
                categories: value,
                customCategory: value === 'other' ? '' : prev.customCategory
            }));
        } else {
            setRecipe(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (event) => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (window.isAndroid) {
            alert('앱에서만 가능한 기능입니다');
            navigate('/', { state: { refresh: true } });
        } else {
            const sendData = new FormData();
            recipe.dishType.split(',').forEach(type => {
                sendData.append('dishType[]', type); 
            });
            for (const key in recipe) {
                if (recipe.hasOwnProperty(key)) {
                    sendData.append(key, recipe[key]);
                }
            }
            if (image) {
                sendData.append('imgs[]', image);
            }
            let requestUrl = '';
            if (comment === '작성') {
                requestUrl = `${process.env.PUBLIC_URL}/backend/recipe_add.php`;
                sendData.append('email', email);
            } else if (comment === '수정') {
                requestUrl = `${process.env.PUBLIC_URL}/backend/recipe_modify.php`;
            }
            fetch(requestUrl, {
                method: 'POST',
                body: sendData,
            })
            .then(res => res.text())
            .then(text => {
                if (text === "200") {
                    alert(`레시피 ${comment}에 성공 하였습니다.`);
                    navigate('/recipe', { state: { refresh: true } });
                } else if (text === "201") {
                    alert(`레시피 ${comment}에 실패하였습니다.`);
                }
            })
            .catch(error => console.error('Error:', error));
        }
    };

    const filterIngredients = (input) => {
        const filtered = input.split(',').filter(item => item.trim() !== '');
        setIngredients(filtered);
        setRecipe({ ...recipe, ingredients: filtered.join(',') });
    };

    return (
        <RecipeEditContainer>
            <Navigation />
            <BackBtn />
            <RecipeForm onSubmit={handleSubmit}>
                <h1>나만의 레시피 {location.pathname.startsWith('/recipe/modify') ? '수정' : '작성'}</h1>
                <RecipeLabel>
                    <LabelText>제목:</LabelText>
                    <RecipeInput
                        name="title"
                        type="text"
                        placeholder="제목을 입력해주세요 (20자 이내)"
                        value={recipe.title}
                        maxLength={20}
                        onChange={handleChange}
                    />
                </RecipeLabel>
                <RecipeLabel>
                    <LabelText>재료:</LabelText>
                    <RecipeTextarea
                        name="ingredients"
                        placeholder="재료를 쉼표로 구분해서 입력하세요 (예: 양파, 대파, 쪽파)"
                        value={recipe.ingredients}
                        onChange={(e)=>filterIngredients(e.target.value)}
                    />
                </RecipeLabel>
                <RecipeLabel>
                    <LabelText>조리법:</LabelText>
                    <RecipeTextarea
                        name="recipeText"
                        placeholder="조리법을 입력해주세요. 모두가 쉽게 이용할 수 있도록 부탁드립니다."
                        value={recipe.recipeText}
                        onChange={handleChange}
                    />
                </RecipeLabel>
                <RecipeLabel>
                    <LabelText>조리시간/분:</LabelText>
                    <StyledInput
                        name="times"
                        type="number"
                        min="0"
                        max="999"
                        placeholder='조리시간을 입력해주세요 (분)'
                        value={recipe.times}
                        onChange={handleChange}
                    />
                </RecipeLabel>
                <hr />
                <RecipeLabel>
                    <LabelText>사진 첨부:</LabelText>
                    <RecipeFileInput type="file" accept="image/*" name="imgs[]" onChange={handleFileChange}/>
                    {imagePreview && <ImagePreview src={imagePreview} alt="Preview"/>}
                </RecipeLabel>
                <Fieldset>
                    <legend>언제 먹기 좋은 음식인가요?</legend>
                    <Label>
                        <input type="checkbox" name="Cold" value="Cold" onChange={handleChange} checked={recipe.Cold === 1} /> 더울때
                    </Label>
                    <Label>
                        <input type="checkbox" name="Warm" value="Warm" onChange={handleChange} checked={recipe.Warm === 1} /> 추울때
                    </Label>
                </Fieldset>
                <Fieldset>
                    <legend>채식주의자용 요리인가요?</legend>
                    <Label>
                        <input type="radio" name="vegan" value="vegan" onChange={handleChange} checked={recipe.vegan === 1} /> 네
                    </Label>
                    <Label>
                        <input type="radio" name="vegan" value="meat" onChange={handleChange} checked={recipe.vegan === 0} /> 아니요
                    </Label>
                </Fieldset>
                <Fieldset>
                    <legend>국물 요리인가요?</legend>
                    <Label>
                        <input type="radio" name="soup" value="1" onChange={handleChange} checked={recipe.soup === 1} /> 네
                    </Label>
                    <Label>
                        <input type="radio" name="soup" value="0" onChange={handleChange} checked={recipe.soup === 0} /> 아니요
                    </Label>
                </Fieldset>
                <Fieldset>
                    <legend>열량이 어느정도 되나요?</legend>
                    <div>
                        칼로리:
                        <Label><input type="radio" name="calories" value="Low" onChange={handleChange} checked={recipe.calories === 'Low'} /> 낮은 음식이에요</Label>
                        <Label><input type="radio" name="calories" value="Medium" onChange={handleChange} checked={recipe.calories === 'Medium'} /> 평범해요</Label>
                        <Label><input type="radio" name="calories" value="High" onChange={handleChange} checked={recipe.calories === 'High'} /> 많이 먹으면 살쪄요</Label>
                    </div>
                    <div>
                        맵기정도:
                        <Label><input type="radio" name="spiciness" value="0" onChange={handleChange} checked={recipe.spiciness === '0'} /> 전혀 안매워요</Label>
                        <Label><input type="radio" name="spiciness" value="1" onChange={handleChange} checked={recipe.spiciness === '1'} /> 조금매워요</Label>
                        <Label><input type="radio" name="spiciness" value="2" onChange={handleChange} checked={recipe.spiciness === '2'} /> 신라면정도 맵기에요</Label>
                        <Label><input type="radio" name="spiciness" value="3" onChange={handleChange} checked={recipe.spiciness === '3'} /> 좀 매워요</Label>
                        <Label><input type="radio" name="spiciness" value="4" onChange={handleChange} checked={recipe.spiciness === '4'} /> 많이 매워요</Label>
                    </div>
                </Fieldset>
                <Fieldset>
                    <legend>어떤 지역 음식인가요?</legend>
                    <div>
                        <Label><input type="radio" name="categories" value="korean" onChange={handleChange} checked={recipe.categories === 'korean'} /> 한식</Label>
                        <Label><input type="radio" name="categories" value="chinese" onChange={handleChange} checked={recipe.categories === 'chinese'} /> 중식</Label>
                        <Label><input type="radio" name="categories" value="japanese" onChange={handleChange} checked={recipe.categories === 'japanese'} /> 일식</Label>
                        <Label><input type="radio" name="categories" value="other" onChange={handleChange} checked={recipe.categories === 'other'} /> 기타</Label>
                        {recipe.categories === 'other' && (
                        <StyledInput
                            name="customCategory"
                            type="text"
                            placeholder="예시: 이탈리아, 멕시코, 태국"
                            value={recipe.customCategory}
                            onChange={handleChange}
                        />
                        )}
                    </div>
                </Fieldset>
                <Fieldset>
                    <legend>어떤 용도의 요리인가요?</legend>
                    <div>
                        <Label><input type="checkbox" name="dishType" value="반찬" onChange={handleChange} checked={recipe.dishType.includes('반찬')} /> 반찬</Label>
                        <Label><input type="checkbox" name="dishType" value="메인요리" onChange={handleChange} checked={recipe.dishType.includes('메인요리')} /> 메인 요리</Label>
                        <Label><input type="checkbox" name="dishType" value="간식" onChange={handleChange} checked={recipe.dishType.includes('간식')} /> 간식</Label>
                        <Label><input type="checkbox" name="dishType" value="국물요리" onChange={handleChange} checked={recipe.dishType.includes('국물요리')} /> 국물 요리</Label>
                        <Label><input type="checkbox" name="dishType" value="소스" onChange={handleChange} checked={recipe.dishType.includes('소스')} /> 소스</Label>
                    </div>
                </Fieldset>
                <RecipeFooter>
                    <RecipeButton type="submit">{location.pathname.startsWith('/recipe/modify') ? '수정' : '작성'}하기</RecipeButton>
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
  height: 100%;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 15px gray;
`;

const RecipeForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const RecipeLabel = styled.label`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LabelText = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const RecipeInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const RecipeTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  height: 100px;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const RecipeFileInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const ImagePreview = styled.img`
  margin-top: 10px;
  max-width: 300px;
  height: auto;
  border-radius: 5px;
`;

const Fieldset = styled.fieldset`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const RecipeFooter = styled.div`
  margin-top: 20px;
  text-align: center;
`;

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
`;
