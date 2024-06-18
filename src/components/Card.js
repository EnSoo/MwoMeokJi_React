import styled from "styled-components"
import { FaHeart } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Card = ({recipe}) =>{
    const navigate = useNavigate()
    return (
        <Item onClick={()=>navigate(`detail/${recipe.no}`, recipe)}> {/* /recipe/detail/:no, /detail/:no 경로로 recipe 객체 정보를 넘겨줌 */}
          <CardImage src={recipe.imgurl} alt="Card image" />
          <CardContent>
            <CardTitle>{recipe.title}</CardTitle> {/* 음식 제목 */}
            <div>
              <CardDescription><FaHeart/> 좋아요 {recipe.favor}</CardDescription>
            </div>
          </CardContent>
          </Item>
    )
}

export default Card

const Item =styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 16px;
  padding: 16px;
  width: 300px;
  transition: 0.3s;
  border: 1px solid #55A416;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background: #55A416;
  }
  &:active{
    background: #55A416;
  }
`

const CardImage = styled.img`
  border-radius: 10px 10px 0 0;
  width: 100%;
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