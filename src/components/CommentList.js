import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useSelector } from 'react-redux';

const CommentList = ({ recipeId }) => {
    const [commentList, setCommentList] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userAccount = useSelector(state => state.userAccountReducer.userAccount)
    const email = userAccount.email

    useEffect(() => {
        const sendData = new FormData()
        sendData.append('recipeid',recipeId);
        sendData.append('email',email);
        fetch(`${process.env.PUBLIC_URL}/backend/comment_list.php`, {
            method: 'POST',
            body: sendData,
        })
        .then(res=>res.json())
        .then(json=>setCommentList(json))
    }, [recipeId]);

    const handleAddComment = (e) => {
        e.preventDefault()
        // Handle adding a new comment
        const sendData = new FormData()
        sendData.append('recipeid', recipeId)
        sendData.append('email',email)
        sendData.append('comment', newComment)

        fetch(`${process.env.PUBLIC_URL}/backend/comment_add.php`, {
            method: 'POST',
            body: sendData,
        })
        .then(res=>res.json())
        .then(json=>{
            if(json.code=="200") {
                setCommentList([json.comment,...commentList]);
                setNewComment('');
            } else if(json.code=="201") {
                // 댓글 작성 실패 시
                alert(`댓글 작성에 실패하였습니다.`)
            } else if(json.code=="202") {
                // 댓글 작성 성공 하였으나 작성된 댓글 불러오기 실패시
                alert(`댓글 작성에 성공하였으나, 작성된 내용을 불러오지 못했습니다.`)
            }
        }).catch(error => console.error('Error:', error));
    };
    // 수정 처리 함수
    const handleModifyComment = (commentNo, content) => {
        setCommentList(commentList.map(comment => 
            comment.no === commentNo ? { ...comment, comment: content, modifydate: new Date().toISOString() } : comment
        ));
    };

    // 삭제 처리 함수
    const handleDeleteComment = (commentNo) => {
        setCommentList(commentList.filter(comment => comment.no !== commentNo));
    };

    return (
        <CommentSection>
            <h3>댓글</h3>
            <CommentInput
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 작성하세요"
            />
            <CommentButton onClick={(e) =>handleAddComment(e)}>댓글 추가</CommentButton>
            {commentList.map((comment, index) => (
                <Comment key={index} comment={comment} onModify={handleModifyComment} onDelete={handleDeleteComment} />
            ))}
        </CommentSection>
    );
};

export default CommentList;

const CommentSection = styled.div`
    padding: 10px 0;
`;

const CommentInput = styled.input`
    width: calc(100% - 120px);
    padding: 8px;
    margin-right: 10px;
    margin-bottom: .5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const CommentButton = styled.button`
    padding: 8px 20px;
    background-color: #55a400;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #469300;
    }
`;