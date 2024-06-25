import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import RecipeTab from "../components/RecipeTab";
import RecipeList from "../components/RecipeList";

import { FaPlus } from 'react-icons/fa';

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [currentList, setCurrentList ]= useState([])
    const [tab, setTab] = useState('all');
    const navigate=useNavigate()
    const [init, setInit] = useState(1);
    const userAccount = useSelector(state => state.userAccountReducer.userAccount);
    // const dispatch = useDispatch();

    const email = userAccount.email;
    useEffect(() => {
      const data = JSON.stringify({ email });
        if (init === 1) {
            const fetchAndFilterRecipes = async () => {
                try {
                    const data = JSON.stringify({ email });
                    const response = await fetch(`${process.env.PUBLIC_URL}/backend/recipe_list.php`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: data
                    });
                    const json = await response.json();
                    const myRecipes = json.filter(recipe => recipe.email !== "admin");
                    setRecipes(myRecipes);

                    // Update the currentList based on the tab
                    if (tab === "all") {
                        setCurrentList(myRecipes);
                    } else {
                        const myRecipes = json.filter(recipe => recipe.my_recipe === "1");
                        setCurrentList(myRecipes);
                    }
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                }
            };

            fetchAndFilterRecipes();
            setInit(0); // Set init to 0 to prevent future calls
        } else {
            if (tab === "all") {
                setCurrentList(recipes);
            } else {
                const myRecipes = recipes.filter(recipe => recipe.my_recipe === "1");
                setCurrentList(myRecipes);
            }
        }
  }, [recipes, email, tab]);
    return (
        <div style={{display:"flex", flexDirection:"column", marginBottom:"1rem"}}>
            <Navigation />
            <RecipeTab tab={tab} setTab={setTab}/>
            <div>&nbsp;</div>
            <RecipeList recipes={currentList} setRecipes={setRecipes}/>
            {tab !== 'all' && (
                <Button onClick={() => email == '' ? alert('앱에서만 가능한 기능입니다') : navigate('/recipe/add')}>
                    <FaPlus />
                </Button>
            )}
        </div>
    );
};

export default Recipe;

const Button = styled.button`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 80px;
  right: 20px;
  background-color: #55a416;
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  z-index: 1000;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3e8e41;
  }

  &:active {
    background-color: #2f6e31;
  }
`;