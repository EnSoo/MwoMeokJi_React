import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tab, setTab] = useState('all');
    const navigate = useNavigate();
    const location = useLocation();
    const isUserRecipes = location.pathname === '/my-recipes';

    // 이메일을 지정합니다. 임의의 이메일을 사용할 수 있습니다.
    const email = 'g@g';
    const data1 = { email: 'g@g' };
    const data = JSON.stringify(data1);

    const isLoggedIn = () => {
        // 이메일이 있으면 로그인 상태로 간주합니다.
        return Boolean(email);
    };

    useEffect(() => {
        // 사용자의 레시피를 가져옵니다.
        fetch('./backend/get-recipe.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const updatedData = data.map(recipe => ({
                ...recipe,
                isMyRecipe: recipe.email === email ? 1 : 0
            }));
            setRecipes(updatedData);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [isUserRecipes, email, navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Navigation />
            <Tabs>
                <Tab onClick={() => setTab('all')} active={tab === 'all'}>전체 레시피</Tab>
                <Tab onClick={() => setTab('my')} active={tab === 'my'}>나만의 레시피</Tab>
            </Tabs>
            <Grid>
                {recipes.map((recipe, index) => (
                    <StyledLink to={`/recipe/detail/${index}`} key={index} className="recipe-link">
                        <Card>
                            <Image src={`${process.env.PUBLIC_URL}/imgs/${recipe.imgurl}`} alt={recipe.title} />
                            <TextContainer>
                            {recipe.isMyRecipe === 1 && (
                                <div>
                                    <EditLink to={`/recipe/modify/${recipe.no}`}>수정</EditLink>
                                    <DeleteLink to="#" onClick={() => handleDelete(recipe.no)}>삭제</DeleteLink>
                                </div>
                            )}
                            </TextContainer>
                        </Card>
                    </StyledLink>
                ))}
            </Grid>
        </div>
    );

    function handleDelete(recipeNo) {
        // 삭제 로직을 추가합니다.
        alert('레시피를 삭제합니다.');
        // 실제 삭제 로직을 구현하세요.
    }
};

export default Recipe;

const More = styled.div``;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding: 2rem;
`;

const Card = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    border: 1px solid black;
    margin: 1rem 1rem auto auto;
    color: black;
    font-size: 14px;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

const Tab = styled.button`
    background: ${props => props.active ? '#007BFF' : '#FFF'};
    color: ${props => props.active ? '#FFF' : '#007BFF'};
    border: 1px solid #007BFF;
    padding: 10px 20px;
    cursor: pointer;
    &:not(:last-child) {
        border-right: none;
    }
    &:hover {
        background: #007BFF;
        color: #FFF;
    }
`;

const Image = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 8px;
    margin-right: 1rem;
`;

const TextContainer = styled.div`
    text-align: left;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: block;

    &:hover {
        text-decoration: none;
    }

    & > ${Card} {
        cursor: pointer;
    }
`;

const EditLink = styled(Link)`
    margin-right: 10px;
    color: blue;
    cursor: pointer;
`;

const DeleteLink = styled.span`
    color: red;
    cursor: pointer;
`;
