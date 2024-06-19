import React from 'react';
import styled from 'styled-components';

const CommentList = ({ comments, email, onDeleteComment, onEditComment }) => {
    return (
        <div>
            {comments.map(comment => (
                <CommentContainer key={comment.id}>
                    <p><strong>{comment.nickname}:</strong> {comment.comment}</p>
                    {comment.email === email && (
                        <ButtonContainer>
                            <Button onClick={() => onDeleteComment(comment.id)}>삭제</Button>
                            <Button onClick={() => {
                                const newText = prompt('새로운 댓글 내용을 입력하세요:', comment.comment);
                                if (newText) {
                                    onEditComment(comment.id, newText);
                                }
                            }}>수정</Button>
                        </ButtonContainer>
                    )}
                </CommentContainer>
            ))}
        </div>
    );
};

export default CommentList;

const CommentContainer = styled.div`
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
`;

const ButtonContainer = styled.div`
    margin-top: 5px;
`;

const Button = styled.button`
    margin-right: 5px;
    padding: 5px 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
