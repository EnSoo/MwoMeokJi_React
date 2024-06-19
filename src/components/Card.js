import React, { useState } from "react";
import styled from "styled-components";
import { FaEllipsisV } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false);

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
    alert("Delete");
  };

  return (
    <Item onClick={() => navigate(`detail/${recipe.no}`, { state: { recipe } })}>
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
      <CardImage src={`${process.env.PUBLIC_URL}/imgs/${recipe.imgurl}`} alt={recipe.title} />
      <CardContent>
        <CardTitle>{recipe.title}</CardTitle>
      </CardContent>
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