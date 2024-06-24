import React, { useState } from "react";
import styled from "styled-components";
import { FaEllipsisV } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { GrView } from "react-icons/gr";

const Card = ({ recipe, onDelete }) => {
  const navigate = useNavigate();
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false);
  const [my_like, setMyLike]=useState(recipe.my_like == '1')
  const userAccount = useSelector(state => state.userAccountReducer.userAccount);

  const email = userAccount.email;

  const favoriteRequest =(e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Prevent the card click event
    if(email!='') {
      const sendData = new FormData()
      sendData.append('email', recipe.email);
      sendData.append('myrecipe_id', recipe.no);
      fetch(`${process.env.PUBLIC_URL}/backend/recipe_favor.php`,{
        method:'POST',
        body:sendData,
      })
      .then(res=>res.text())
      .then(text=>{
          if(text=="200") {
              // favor 동작 성공 시
              setMyLike(my_like => !my_like)
          } else if(text=="201") {
              // favor 동작 실패 시
          }
      }).catch(error => console.error('Error:', error));
    } else {
      alert('앱에서만 가능한 기능입니다')
    }
  }

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent the card click event
    setShowMenu(!showMenu);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent the card click event
    navigate(`${process.env.PUBLIC_URL}/recipe/modify/${recipe.no}`, { state: { recipe } })
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent the card click event
    const userConfirmed = window.confirm("해당 레시피를 삭제하시겠습니까?");
    if (userConfirmed) {
      const sendData = new FormData()
      sendData.append('email', email)
      sendData.append('no', recipe.no)
      fetch(`${process.env.PUBLIC_URL}/backend/recipe_delete.php`,{
        method:'POST',
        body:sendData,
      })
      .then(res=>res.text())
      .then(text=>{
          if(text=="200") {
              // 레시피 삭제 성공 시
              alert(`레시피를 삭제 하였습니다.`)
              onDelete(recipe.no)
          } else if(text=="201") {
              // 레시피 삭제 실패 시
              alert(`레시피 삭제를 실패하였습니다.`)
          }
      }).catch(error => console.error('Error:', error));
    } else {
      // 레시피 삭제 취소
    }
  };

  return (
    <Item onClick={() => navigate(`/detail/${recipe.no}`, { state: { recipe } })}>
      <CardHeader>
      {location.pathname === '/recipe' && recipe.my_recipe === "1" && (
          <>
            <MenuIcon onClick={toggleMenu}>
              <FaEllipsisV />
            </MenuIcon>
            {showMenu && (
              <DropdownMenu>
                <MenuItem onClick={handleEdit}>수정</MenuItem>
                <MenuItem onClick={handleDelete}>삭제</MenuItem>
              </DropdownMenu>
            )}
          </>
        )}
      </CardHeader>
      {recipe.imgurl !== '' && <CardImage src={`${process.env.PUBLIC_URL}/imgs/${recipe.imgurl}`} alt={recipe.title} />}
      <CardContent>
        <CardTitle>{recipe.title}</CardTitle>
      </CardContent>
      {location.pathname === '/recipe' && (
        <CardFooter>
        <LikesViews>
          <div>
            {my_like ? (
              <MdFavorite onClick={(e) => favoriteRequest(e)} style={{ fontSize: '1.5rem' }} />
            ) : (
              <MdFavoriteBorder onClick={(e) => favoriteRequest(e)} style={{ fontSize: '1.5rem' }} />
            )}
          </div>
          <div>
            <GrView style={{fontSize:'1.5rem', marginRight:'0.5rem'}}/> {recipe.view}
          </div>
        </LikesViews>
      </CardFooter>
      )}
    </Item>
  );
};

export default Card;

const Item = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 16px;
  padding: 16px;
  width: 300px;
  transition: 0.3s;
  border: 1px solid #55A416;
  position: relative;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background: #55A416;
  }
  &:active{
    background: #55A416;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const MenuIcon = styled.div`
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 5px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background: #fff;
  border: 1px solid #55a400;
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

const CardImage = styled.img`
  border-radius: 10px 10px 0 0;
  width: 100%;
  user-select: none;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.25em;
`;

const CardDescription = styled.span`
  margin: 0;
  color: #777;
  margin-right: 10px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px 0 0;
`;

const LikesViews = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #777;
  
  & > div {
    display: flex;
    align-items: center;
    margin-left: 10px;
    
    & > svg {
      margin-right: 4px;
    }
  }
`;