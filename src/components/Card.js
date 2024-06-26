import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaEllipsisV } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { RiRobot2Fill, RiRobot2Line } from "react-icons/ri";

const Card = ({ recipe, onDelete, onClick, fromRecommender, delay }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [my_like, setMyLike] = useState(recipe.my_like === '1')
  const [ai_my_like, setAiMyLike] = useState(recipe.ai_my_like === '1')
  const userAccount = useSelector(state => state.userAccountReducer.userAccount);
  const email = userAccount.email;
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const favoriteRequest = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Prevent the card click event
    if (window.isAndroid) {
      const sendData = new FormData();
      sendData.append('email', email);
      sendData.append('myrecipe_id', recipe.no);
      fetch(`${process.env.PUBLIC_URL}/backend/recipe_favor.php`, {
        method: 'POST',
        body: sendData,
      })
        .then(res => res.text())
        .then(text => {
          if (text === "200") {
            // favor 동작 성공 시
            setMyLike(my_like => !my_like);
          } else if (text === "201") {
            // favor 동작 실패 시
          }
        }).catch(error => console.error('Error:', error));
    } else {
      alert('앱에서만 가능한 기능입니다');
    }
  }

  const aiFavoriteRequest = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Prevent the card click event
    if (window.isAndroid) {
      const sendData = new FormData();
      sendData.append('email', email);
      sendData.append('myrecipe_id', recipe.no);
      fetch(`${process.env.PUBLIC_URL}/backend/recipe_aifavor.php`, {
        method: 'POST',
        body: sendData,
      })
      .then(res => res.text())
      .then(text => {
        if (text === "200") {
          // favor 동작 성공 시
          setAiMyLike(ai_my_like => !ai_my_like);
        } else if (text === "201") {
          // favor 동작 실패 시
        }
      }).catch(error => console.error('Error:', error))
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
          if (text === "200") {
            // 레시피 삭제 성공 시
            alert(`레시피를 삭제 하였습니다.`);
            onDelete(recipe.no);
          } else if (text === "201") {
            // 레시피 삭제 실패 시
            alert(`레시피 삭제를 실패하였습니다.`);
          }
        }).catch(error => console.error('Error:', error));
    } else {
      // 레시피 삭제 취소
    }
  };
  
  const itemClick = (e) => {
    e.stopPropagation(); // Prevent the card click event
    if (fromRecommender) {
      onClick(recipe);
    } else {
      navigate(`/detail/${recipe.no}`, { state: { recipe } });
    }
  }

  return (
    <Item 
      onClick={(e) => itemClick(e)} 
      delay={delay} 
      isVisible={isVisible} 
      ref={cardRef}
    >
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
      {location.pathname === '/recipe_recommender' && (
        <CardFooter>
          <LikesViews>
            <div>
              {ai_my_like ? (
                <RiRobot2Fill className="cardFonts" onClick={(e) => aiFavoriteRequest(e)} />
              ) : (
                <RiRobot2Line className="cardFonts" onClick={(e) => aiFavoriteRequest(e)} />
              )}
            </div>
          </LikesViews>
        </CardFooter>
      )}
    </Item>
  );
};

export default Card;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Item = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0px;
  padding: 16px;
  flex: 1 1 calc(33.333% - 32px); /* Flex-grow, flex-shrink, and flex-basis */
  max-width: 300px;
  transition: 0.3s;
  overflow: hidden;
  border: 1px solid #55A416;
  position: relative;
  display: flex;
  flex-direction: column;
  opacity: 0; /* 초기 상태에서 투명하게 설정 */
  ${({ isVisible, delay }) => 
    isVisible && css`
      animation: ${fadeIn} 0.5s forwards;
      animation-delay: ${delay}s;
    `
  }
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background: #55A416;
    cursor: pointer;
  }
  &:active {
    background: #55A416;
  }
  .cardFonts {
    font-size: calc(.8rem + 0.2vw);
  }
  @media (min-width: 375px) {
    flex: 1 1 calc(100% - (15rem+1vw)); /* 1 item per row */
    max-width: 40%;
    margin: 0px;
    .cardFonts {
      font-size: calc(1rem + 0.2vw);
    }
  }
  @media (min-width: 729px) {
    max-width: 300px;
    margin: 2px;
    .cardFonts {
      font-size: 2rem;
    }
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
  font-size: calc(.5rem + 0.2vw);
  @media (min-width: 375px) {
    font-size: calc(.8rem + 0.2vw);
  }
  @media (min-width: 729px) {
    font-size: 1.2rem;
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1em;
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
    }
  }
`;
