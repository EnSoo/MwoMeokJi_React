import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Navigation from "../components/Navigation"
import styled from 'styled-components'
import Comment from '../components/Comment'
import CommentList from '../components/CommentList'

const RecipeDetail = () => {
    const { id } = useParams()
    const [recipe, setRecipe] = useState({})
    const [comments, setComments] = useState([])
    const location = useLocation()
    const email = 'g@g.com'

    useEffect(() => {
        if (location.state && location.state.recipe) {
            setRecipe(location.state.recipe)
        } else {
            fetchRecipeDetails()
        }
        fetchComments()
    }, [id])

    const fetchRecipeDetails = async () => {
        try {
            const response = await fetch(`/backend/get-recipe.php?id=${id}`)
            const data = await response.json()
            setRecipe(data)
        } catch (error) {
            console.error('Error fetching recipe details:', error)
        }
    }

    const fetchComments = async () => {
        try {
            const response = await fetch(`/backend/comment.php?myrecipe_id=${id}`)
            const data = await response.json()
            if (data.status === 'success') {
                setComments(data.comments)
            } else {
                console.error('Error fetching comments:', data.message)
            }
        } catch (error) {
            console.error('Error fetching comments:', error)
        }
    }

    const handleAddComment = async (comment) => {
        try {
            const response = await fetch('/backend/comment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            })
            const newComment = await response.json()
            if (newComment.status === 'success') {
                fetchComments() // 댓글 추가 후 댓글 목록을 다시 가져옵니다.
            } else {
                console.error('Error adding comment:', newComment.message)
            }
        } catch (error) {
            console.error('Error adding comment:', error)
        }
    }

    const handleDeleteComment = async (commentNo) => {
        try {
            await fetch('/backend/comment.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ no: commentNo }),
            })
            fetchComments() // 댓글 삭제 후 댓글 목록을 다시 가져옵니다.
        } catch (error) {
            console.error('Error deleting comment:', error)
        }
    }

    const handleEditComment = async (commentNo, newText) => {
        try {
            const response = await fetch('/backend/comment.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ no: commentNo, comment: newText }),
            })
            const result = await response.json()
            if (result.status === 'success') {
                fetchComments() // 댓글 수정 후 댓글 목록을 다시 가져옵니다.
            } else {
                console.error('Error editing comment:', result.message)
            }
        } catch (error) {
            console.error('Error editing comment:', error)
        }
    }

    if (!recipe) return <div>Loading...</div>

    return (
        <RecipeDetailContainer>
            <Navigation />
            <RecipeHeader>
                <h2>{recipe.title}</h2>
            </RecipeHeader>
            <RecipeContent>
                <RecipeDescription>
                    <p>{recipe.recipe}</p>
                    <RecipeImage src={`${process.env.PUBLIC_URL}/imgs/${recipe.imgurl}`} alt={recipe.title} />
                </RecipeDescription>
                <RecipeIngredients>
                    <h3>재료</h3>
                    <p>{recipe.ingredients}</p>
                </RecipeIngredients>
                <RecipeRecipe>
                    <h3>조리법</h3>
                    <p>{recipe.recipe}</p>
                    <p>총 조리시간: {recipe.times}<span>분</span></p>
                </RecipeRecipe>
            </RecipeContent>
            <hr />
            <Comment onAddComment={handleAddComment} email={email} recipeNo={id} />
            <CommentList
                comments={comments}
                email={email}
                onDeleteComment={handleDeleteComment}
                onEditComment={handleEditComment}
            />
        </RecipeDetailContainer>
    )
}

export default RecipeDetail

const RecipeDetailContainer = styled.div`
    font-family: 'Arial', sans-serif;
    max-width: 600px;
    height: 100vh;
    margin: auto;
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 15px gray;
`;

const RecipeHeader = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const RecipeContent = styled.div`
    margin-bottom: 20px;
`;

const RecipeDescription = styled.div`
    margin-bottom: 20px;
`;

const RecipeIngredients = styled.div`
    margin-bottom: 20px;
`;

const RecipeRecipe = styled.div`
    margin-bottom: 20px;
`;

const RecipeImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 10px;
`;
