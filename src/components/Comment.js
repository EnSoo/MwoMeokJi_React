import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEllipsisV } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Comment = ({ comment, onModify, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.comment);

    const userAccount = useSelector(state => state.userAccountReducer.userAccount);
    const email = userAccount.email;

    const getLatestDate = () => {
        const createDate = new Date(comment.createdate);
        const modifyDate = new Date(comment.modifydate);
        return createDate > modifyDate ? createDate : modifyDate;
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setShowMenu(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('email', email);
        sendData.append('no', comment.no);
        sendData.append('comment', editedComment);

        fetch(`${process.env.PUBLIC_URL}/backend/comment_modify.php`, {
            method: 'POST',
            body: sendData,
        })
        .then(res => res.text())
        .then(text => {
            if (text === "200") {
                alert('댓글이 수정되었습니다.');
                onModify(comment.no, editedComment);
                setIsEditing(false);
            } else {
                alert('댓글 수정에 실패하였습니다.');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedComment(comment.comment);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        const userConfirmed = window.confirm("해당 댓글을 삭제하시겠습니까?");
        if (userConfirmed) {
            const sendData = new FormData();
            sendData.append('email', email);
            sendData.append('no', comment.no);
            fetch(`${process.env.PUBLIC_URL}/backend/comment_delete.php`, {
                method: 'POST',
                body: sendData,
            })
            .then(res => res.text())
            .then(text => {
                if (text === "200") {
                    alert('댓글을 삭제하였습니다.');
                    onDelete(comment.no);
                } else {
                    alert('댓글 삭제를 실패하였습니다.');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    };

    return (
        <CommentContainer>
            <ProfileImage src={"/backend/" + comment.imgfile} alt="프로필" />
            <CommentDetails>
                <CommentAuthor>{comment.nickname}</CommentAuthor>
                {isEditing ? (
                    <>
                        <EditTextarea 
                            value={editedComment} 
                            onChange={(e) => setEditedComment(e.target.value)} 
                        />
                        <ButtonGroup>
                            <SaveButton onClick={handleSave}>저장</SaveButton>
                            <CancelButton onClick={handleCancel}>취소</CancelButton>
                        </ButtonGroup>
                    </>
                ) : (
                    <>
                        <CommentText>{comment.comment}</CommentText>
                        <CommentFooter>
                            <CommentDate>{`최근 작성일: ${getLatestDate().toLocaleString()}`}</CommentDate>
                        </CommentFooter>
                    </>
                )}
            </CommentDetails>
            {comment.my_comment === "1" && !isEditing && (
                <MenuIconWrapper>
                    <MenuIcon onClick={toggleMenu}>
                        <FaEllipsisV />
                    </MenuIcon>
                    {showMenu && (
                        <DropdownMenu>
                            <MenuItem onClick={handleEdit}>수정</MenuItem>
                            <MenuItem onClick={handleDelete}>삭제</MenuItem>
                        </DropdownMenu>
                    )}
                </MenuIconWrapper>
            )}
        </CommentContainer>
    );
};

export default Comment;

const CommentContainer = styled.div`
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    position: relative; /* Ensure the container is relative */
`;

const ProfileImage = styled.img`
    width: 30px; /* 프로필 이미지 너비 */
    height: 30px; /* 프로필 이미지 높이 */
    border-radius: 50%; /* 원형 모양으로 만들기 */
    margin-right: 10px; /* 이미지와 내용 사이의 간격 */
`;

const CommentDetails = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative; /* Ensure the container is relative */
`;

const CommentAuthor = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

const CommentText = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
`;

const CommentFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CommentDate = styled.div`
    font-size: 12px;
    color: #888;
`;

const MenuIconWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background: #fff;
  border: 1px solid #55A400;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background: #55DD16;
  }
`;

const MenuIcon = styled.div`
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 5px;
`;

const EditTextarea = styled.textarea`
    width: 100%;
    height: 80px;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const SaveButton = styled.button`
    padding: 8px 16px;
    background-color: #55a400;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        background-color: #469300;
    }
`;

const CancelButton = styled.button`
    padding: 8px 16px;
    background-color: #888;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #666;
    }
`;