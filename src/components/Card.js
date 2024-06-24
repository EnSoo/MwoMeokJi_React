import React, { useState } from "react";
import styled from "styled-components";
import { FaEllipsisV } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { GrView } from "react-icons/gr";

const Card = ({ recipe, onDelete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [my_like, setMyLike] = useState(recipe.my_like == '1');
  const userAccount = useSelector(state => state.userAccountReducer.userAccount);

  const email = userAccount.email;

  const favoriteRequest = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Prevent the card click event
    if (email != '') {
      const sendData = new FormData();
      sendData.append('email', recipe.email);
      sendData.append('myrecipe_id', recipe.no);
      fetch(`${process.env.PUBLIC_URL}/backend/recipe_favor.php`, {
        method: 'POST',
        body: sendData,
      })
        .then(res => res.text())
        .then(text => {
          if (text == "200") {
            // favor 동작 성공 시
            setMyLike(my_like => !my_like);
          } else if (text == "201") {
            // favor 동작 실패 시
          }
        }).catch(error => console.error('Error:', error));
    } else {
      alert('앱에서만 가능한 기능입니다');
    }
  }

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent the card click event
    setShowMenu(!showMenu);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent the card click event
    navigate(`${process.env.PUBLIC_URL}/recipe/modify/${recipe.no}`, { state: { recipe } });
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent the card click event
    const userConfirmed = window.confirm("해당 레시피를 삭제하시겠습니까?");
    if (userConfirmed) {
      const sendData = new FormData();
      sendData.append('email', email);
      sendData.append('no', recipe.no);
      fetch(`${process.env.PUBLIC_URL}/backend/recipe_delete.php`, {
        method: 'POST',
        body: sendData,
      })
        .then(res => res.text())
        .then(text => {
          if (text == "200") {
            // 레시피 삭제 성공 시
            alert(`레시피를 삭제 하였습니다.`);
            onDelete(recipe.no);
          } else if (text == "201") {
            // 레시피 삭제 실패 시
            alert(`레시피 삭제를 실패하였습니다.`);
          }
        }).catch(error => console.error('Error:', error));
    } else {
      // 레시피 삭제 취소
    }
  };
  const itemClick = (e) =>{
    e.stopPropagation(); // Prevent the card click event
    if(location.pathname=='/recipe_recommender') {
      const userConfirmed = window.confirm("해당 레시피를 삭제하시겠습니까?");
      if (userConfirmed) {
        navigate(`/detail/${recipe.no}`, { state: { recipe } })
      } else{
        alert('ddd')
      }
      
    } else {
      navigate(`/detail/${recipe.no}`, { state: { recipe } })
    }
    
 }
  return (
    <Item onClick={(e) => itemClick(e)}>
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
                <MdFavorite className="cardFonts" onClick={(e) => favoriteRequest(e)} />
              ) : (
                <MdFavoriteBorder className="cardFonts" onClick={(e) => favoriteRequest(e)} />
              )}
            </div>
            <div className="cardFonts" style={{ display: 'flex', alignItems: 'center' }}>
              <GrView className="cardFonts" style={{ marginRight: '0.5rem' }} /> {recipe.view}
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
  flex: 1 1 calc(33.333% - 32px); /* Flex-grow, flex-shrink, and flex-basis */
  max-width: 300px;
  transition: 0.3s;
  overflow: hidden;
  border: 1px solid #55A416;
  position: relative;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background: #55A416;
  }
  &:active {
    background: #55A416;
  }

  .cardFonts {
    font-size: 1.7rem;
    @media (max-width: 808px) {
      font-size: 1.5rem;
    }
    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 1024px) {
    flex: 1 1 calc(50% - 32px); /* 2 items per row */
  }
  @media (max-width: 808px) {
    flex: 1 1 calc(50% - 32px); /* 2 items per row */
  }
  @media (max-width: 480px) {
    flex: 1 1 calc(100% - 32px); /* 1 item per row */
    max-width: 100%;
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
  height: auto;
  aspect-ratio: 3 / 2; /* Ensures the image maintains a 3:2 aspect ratio */
  user-select: none;
`;

const CardContent = styled.div`
  padding: 4px;
  flex: 1; /* Ensures the content area expands to fill available space */
`;

const CardTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1em;
  @media (max-width: 808px) {
    font-size: 0.9em;
  }
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
  @media (max-width: 480px) {
    font-size: 0.7em;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0px 16px 0 0;
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
      font-size: 1.5rem; /* Adjust icon size */
      @media (max-width: 808px) {
        font-size: 1.3rem;
      }
      @media (max-width: 768px) {
        font-size: 1.1rem;
      }
      @media (max-width: 480px) {
        font-size: 1rem;
      }
    }
  }
`;