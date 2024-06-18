import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tab, setTab] = useState('all');
    const [showMenu, setShowMenu] = useState(null); // 이 줄을 추가합니다.
    // const navigate = useNavigate();
    const location = useLocation();
    // const isModifyRecipe = location.pathname === 'recipe/modify/:id';

    const userAccount = useSelector(state => state.userAccountReducer.userAccount);
    // const dispatch = useDispatch();

    const email = userAccount.email;

    // const isLoggedIn = () => {
    //     return Boolean(email);
    // };

    useEffect(() => {
        const email = 's@s';
        const data = JSON.stringify({ email });
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
                setRecipes(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    function handleDelete(recipeNo) {
        alert('레시피를 삭제합니다.');
    }

    const toggleMenu = (index) => {
        setShowMenu(showMenu === index ? null : index);
    };

    const handleDeleteClick = (recipeNo) => {
        handleDelete(recipeNo);
        setShowMenu(null);
    };

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
                {tab === 'my' ? (
                    recipes.filter(recipe => recipe.email_check === 1).map((recipe, index) => (
                        <StyledLink to={`/recipe/detail/${recipe.no}`} key={index} className="recipe-link">
                            <Card>
                                <Image src={`${process.env.PUBLIC_URL}/imgs/${recipe.imgurl}`} alt={recipe.title} />
                                <TextContainer>
                                    <p>{recipe.title}</p>
                                    {recipe.email_check === 1 && (
                                        <ActionContainer>
                                            <MenuButton onClick={() => toggleMenu(index)}>...</MenuButton>
                                            <DropdownMenu show={showMenu === index}>
                                                <MenuItem to={`/recipe/modify/${recipe.no}`}>수정</MenuItem>
                                                <MenuItemSpan onClick={() => handleDeleteClick(recipe.no)}>삭제</MenuItemSpan>
                                            </DropdownMenu>
                                        </ActionContainer>
                                    )}
                                </TextContainer>
                            </Card>
                        </StyledLink>
                    ))
                ) : (
                    recipes.map((recipe, index) => (
                        <StyledLink to={`/recipe/detail/${recipe.no}`} key={index} className="recipe-link">
                            <Card>
                                <Image src={`${process.env.PUBLIC_URL}/imgs/${recipe.imgurl}`} alt={recipe.title} />
                                <TextContainer>
                                    <p>{recipe.title}</p>
                                    {recipe.email_check === 1 && (
                                        <ActionContainer>
                                            <MenuButton onClick={() => toggleMenu(index)}>...</MenuButton>
                                            <DropdownMenu show={showMenu === index}>
                                                <MenuItem to={`/recipe/modify/${recipe.no}`}>수정</MenuItem>
                                                <MenuItemSpan onClick={() => handleDeleteClick(recipe.no)}>삭제</MenuItemSpan>
                                            </DropdownMenu>
                                        </ActionContainer>
                                    )}
                                </TextContainer>
                            </Card>
                        </StyledLink>
                    ))
                )}
            </Grid>
        </div>
    );
};

export default Recipe;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding: 2rem;
`

const Card = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
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
    position: relative;
`

const ActionContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
`
const MenuButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    margin: 0;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 30px;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: ${props => (props.show ? 'block' : 'none')};
    z-index: 1;
`;

const MenuItem = styled(Link)`
    display: block;
    padding: 10px;
    color: black;
    text-decoration: none;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const MenuItemSpan = styled.span`
    display: block;
    padding: 10px;
    color: black;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`

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
`

const Image = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 8px;
    margin-right: 1rem;
`

const TextContainer = styled.div`
    flex: 1;
    text-align: left;
`

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
`

