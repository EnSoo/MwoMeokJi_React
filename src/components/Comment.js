import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Comment = ({ onAddComment, email, recipeNo }) => {
    const [text, setText] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        // 식별값을 통해 닉네임 가져오기
        const fetchNickname = async () => {
            try {
                const response = await fetch('/backend/comment.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                const data = await response.json();
                setNickname(data.nickname);
            } catch (error) {
                console.error('Error fetching nickname:', error);
            }
        };

        fetchNickname();
    }, [email]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = { no: recipeNo, email, nickname, comment: text };
        onAddComment(newComment);
        setText('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="댓글을 입력하세요."
            />
            <Button type="submit">댓글 추가</Button>
        </Form>
    );
};

export default Comment;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`;

const Textarea = styled.textarea`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    resize: none;
`;

const Button = styled.button`
    align-self: flex-end;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
