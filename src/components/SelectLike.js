import React, { useState } from "react";
import styled from "styled-components";
import Modal from 'react-modal';

Modal.setAppElement('#root')

const SelectLike = ({ saveLike }) => {
    const [userSelectData, setuserSelectData] = useState({
        ingredients: "",
        foodType: [],
        spiceLevel: "",
        dietType: "",
        calorieLevel: "",
        cookTime: "",
        dishType: []
    })

    const [openDialog, setOpenDialog] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setuserSelectData((state) => {
            if (type === "checkbox") {
                if (checked) {
                    return {
                        ...state, [name]: [...state[name], value]
                    }
                } else {
                    return {
                        ...state, [name]: state[name].filter((item) => item !== value)
                    }
                }
            } else {
                return {
                    ...state, [name]: value
                }
            }
        })
    }

    const handleSubmit = () => {
        setOpenDialog(true)
        saveLike(userSelectData)
    }

    const closeDialog = () => {
        setOpenDialog(false)
    }

    const formatSelectedData = () => {
        return (
            <div>
                <p><strong>재료 :</strong> {userSelectData.ingredients}</p>
                <p><strong>좋아하는 음식의 종류 :</strong> {userSelectData.foodType.join(', ')}</p>
                <p><strong>음식의 맵기 :</strong> {userSelectData.spiceLevel}</p>
                <p><strong>식습관 유형 :</strong> {userSelectData.dietType}</p>
                <p><strong>칼로리 :</strong> {userSelectData.calorieLevel}</p>
                <p><strong>조리시간 :</strong> {userSelectData.cookTime}</p>
                <p><strong>선호하는 음식 종류 :</strong> {userSelectData.dishType.join(', ')}</p>
            </div>
        )
    }

    return (
        <LikeFormContainer>
            <LikeTitle>선호도 조사</LikeTitle>
            <LikeForm>
                <LikeFormGroup>
                    <LikeLabel>재료 (쉼표로 구분):</LikeLabel>
                    <LikeInput type="text" name="ingredients" placeholder="재료를 입력하세요" 
                        value={userSelectData.ingredients} onChange={handleChange}
                    />
                </LikeFormGroup>

                <LikeFormGroup>
                    <LikeLabel>좋아하는 음식의 종류를 선택해주세요</LikeLabel>
                    <LikeDiv>
                        <LikeCheck type="checkbox" id="korean" name="foodType" value="한식"
                            checked={userSelectData.foodType.includes("한식")} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="korean">한식</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeCheck type="checkbox" id="chinese" name="foodType" value="중식"
                            checked={userSelectData.foodType.includes("중식")} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="chinese">중식</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeCheck type="checkbox" id="japanese" name="foodType" value="일식"
                            checked={userSelectData.foodType.includes("일식")} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="japanese">일식</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeCheck type="checkbox" id="other" name="foodType" value="기타"
                            checked={userSelectData.foodType.includes("기타")} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="other">기타</StyledLabel>
                    </LikeDiv>
                </LikeFormGroup>

                <LikeFormGroup>
                    <LikeLabel>음식의 맵기를 선택해주세요</LikeLabel>
                    <LikeDiv>
                        <LikeRadio type="radio" id="notSpicy" name="spiceLevel" value="안 매움"
                            checked={userSelectData.spiceLevel === "안 매움"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="notSpicy">안 매움</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="lightSpicy" name="spiceLevel" value="약간 매움"
                            checked={userSelectData.spiceLevel === "약간 매움"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="lightSpicy">약간 매움</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="mediumSpicy" name="spiceLevel" value="보통"
                            checked={userSelectData.spiceLevel === "보통"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="mediumSpicy">보통</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="spicy" name="spiceLevel" value="매움"
                            checked={userSelectData.spiceLevel === "매움"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="spicy">매움</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="verySpicy" name="spiceLevel" value="엄청 매움"
                            checked={userSelectData.spiceLevel === "엄청 매움"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="verySpicy">엄청 매움</StyledLabel>
                    </LikeDiv>
                </LikeFormGroup>

                <LikeFormGroup>
                    <LikeLabel>식습관 유형을 선택해주세요</LikeLabel>
                    <LikeDiv>
                        <LikeRadio type="radio" id="meat" name="dietType" value="육식"
                            checked={userSelectData.dietType === "육식"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="meat">육식</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="vegetarian" name="dietType" value="채식(비건)"
                            checked={userSelectData.dietType === "채식(비건)"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="vegetarian">채식(비건)</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="noPreference" name="dietType" value="상관없음"
                            checked={userSelectData.dietType === "상관없음"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="noPreference">상관없음</StyledLabel>
                    </LikeDiv>
                </LikeFormGroup>

                <LikeFormGroup>
                    <LikeLabel>칼로리를 선택해주세요</LikeLabel>
                    <LikeDiv>
                        <LikeRadio type="radio" id="lowCal" name="calorieLevel" value="낮음"
                            checked={userSelectData.calorieLevel === "낮음"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="lowCal">낮음</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="mediumCal" name="calorieLevel" value="중간"
                            checked={userSelectData.calorieLevel === "중간"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="mediumCal">중간</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="highCal" name="calorieLevel" value="높음"
                            checked={userSelectData.calorieLevel === "높음"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="highCal">높음</StyledLabel>
                    </LikeDiv>
                </LikeFormGroup>

                <LikeFormGroup>
                    <LikeLabel>조리시간을 선택해주세요</LikeLabel>
                    <LikeDiv>
                        <LikeRadio type="radio" id="15down" name="cookTime" value="15분 이하"
                            checked={userSelectData.cookTime === "15분 이하"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="15down">15분 이하</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="15to30" name="cookTime" value="15~30분"
                            checked={userSelectData.cookTime === "15~30분"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="15to30">15~30분</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="30to60" name="cookTime" value="30~60분"
                            checked={userSelectData.cookTime === "30~60분"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="30to60">30~60분</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="60to120" name="cookTime" value="60~120분"
                            checked={userSelectData.cookTime === "60~120분"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="60to120">60~120분</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeRadio type="radio" id="120up" name="cookTime" value="120분 이상"
                            checked={userSelectData.cookTime === "120분 이상"} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="120up">120분 이상</StyledLabel>
                    </LikeDiv>
                </LikeFormGroup>

                <LikeFormGroup>
                    <LikeLabel>선호하는 음식 종류를 선택해주세요</LikeLabel>
                    <LikeDiv>
                        <LikeCheck type="checkbox" id="mainDish" name="dishType" value="메인요리류"
                            checked={userSelectData.dishType.includes("메인요리류")} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="mainDish">메인요리류</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeCheck type="checkbox" id="sideDish" name="dishType" value="반찬류"
                            checked={userSelectData.dishType.includes("반찬류")} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="sideDish">반찬류</StyledLabel>
                    </LikeDiv>
                    <LikeDiv>
                        <LikeCheck type="checkbox" id="dessert" name="dishType" value="디저트류"
                            checked={userSelectData.dishType.includes("디저트류")} onChange={handleChange}
                        />
                        <StyledLabel htmlFor="dessert">디저트류</StyledLabel>
                    </LikeDiv>
                </LikeFormGroup>
                <LikeSaveButton type="button" onClick={handleSubmit}>저장</LikeSaveButton>
            </LikeForm>

            <Modal
                isOpen={openDialog}
                onRequestClose={closeDialog}
                contentLabel="선택된 항목"
                style={customStyles}
            >
                <h2>선택된 항목</h2>
                {formatSelectedData()}
                <button onClick={closeDialog}>닫기</button>
            </Modal>
        </LikeFormContainer>
    )
}

export default SelectLike

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const LikeFormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`

const LikeForm = styled.form`
  padding: 20px;
`

const LikeFormGroup = styled.div`
  margin-bottom: 20px;
`

const LikeDiv = styled.div`
  display: inline-block;
  margin-right: 10px;
`

const LikeLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
`

const LikeInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #55A416;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 2px solid #55A416;
  }
`

const LikeCheck = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  border: 1px solid #55A416;
  vertical-align: text-top;

  &:checked {
    background-color: #55A416;
  }
`

const LikeRadio = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  border: 1px solid #55A416;
  vertical-align: text-top;

  &:checked {
    background-color: #55A416;
  }
`

const StyledLabel = styled.label`
  vertical-align: text-top;
  margin-left: 5px;
`

const LikeSaveButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: 1px solid #55A416;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #55A416;
  }
`

const LikeTitle = styled.h1`
  text-align: center;
`
