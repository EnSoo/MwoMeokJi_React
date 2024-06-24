import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';

Modal.setAppElement('#root');

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 10px;
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CheckboxLabel = styled.label`
  margin-bottom: 5px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const LikeFormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const LikeDiv = styled.div`
  margin-bottom: 10px;
`;

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
`;

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
`;

const StyledLabel = styled.label`
  vertical-align: text-top;
  margin-left: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '500px',
    height: '300px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const variants = {
  enter: {
    opacity: 0,
    scale: 0.5,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const PreferenceForm = ({ saveStep, openSelect, closeSelect, weatherData }) => {
  const [userSelectData, setUserSelectData] = useState({
    ingredients: [],
    spiciness: "medium",
    vegan: false,
    meat: false,
    calories: "medium",
    cookingTime: "medium",
    categories: [],
    dishType: [],
    warm: false,
    cold: false,
    soup: false, 
  });

  useEffect(() => {
    if (weatherData && weatherData.temperature) {
      const tempCelsius = weatherData.temperature.current - 273.15;
      const newWarm = tempCelsius <= 5;
      const newCold = tempCelsius >= 25;

      setUserSelectData(prevState => ({
        ...prevState,
        warm: newWarm,
        cold: newCold
      }));
    }
  }, [weatherData]);

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextStep = useCallback(() => {
    setDirection(1);
    setStep((prevStep) => prevStep + 1);
  }, []);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setStep((prevStep) => prevStep - 1);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setUserSelectData((state) => {
      if (type === "checkbox") {
        if (checked) {
          return { ...state, [name]: [...state[name], value] };
        } else {
          return { ...state, [name]: state[name].filter((item) => item !== value) };
        }
      } else {
        return { ...state, [name]: value };
      }
    });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    saveStep(userSelectData);
    closeSelect();
  }, [saveStep, closeSelect, userSelectData]);

  const steps = [
    {
      label: "어디 음식을 좋아하세요?",
      content: (
        <LikeFormGroup>
          <LikeDiv>
            <LikeCheck type="checkbox" id="korean" name="categories" value="한식"
              checked={userSelectData.categories.includes("한식")} onChange={handleChange}
            />
            <StyledLabel htmlFor="korean">한식</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeCheck type="checkbox" id="chinese" name="categories" value="중식"
              checked={userSelectData.categories.includes("중식")} onChange={handleChange}
            />
            <StyledLabel htmlFor="chinese">중식</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeCheck type="checkbox" id="japanese" name="categories" value="일식"
              checked={userSelectData.categories.includes("일식")} onChange={handleChange}
            />
            <StyledLabel htmlFor="japanese">일식</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeCheck type="checkbox" id="other" name="categories" value="기타"
              checked={userSelectData.categories.includes("기타")} onChange={handleChange}
            />
            <StyledLabel htmlFor="other">기타</StyledLabel>
          </LikeDiv>
        </LikeFormGroup>
      )
    },
    {
      label: "매운 음식은 잘드시나요?",
      content: (
        <LikeFormGroup>
          <LikeDiv>
            <LikeRadio type="radio" id="notSpicy" name="spiciness" value="안 매움"
              checked={userSelectData.spiciness === "안 매움"} onChange={handleChange}
            />
            <StyledLabel htmlFor="notSpicy">안 매움</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeRadio type="radio" id="lightSpicy" name="spiciness" value="약간 매움"
              checked={userSelectData.spiciness === "약간 매움"} onChange={handleChange}
            />
            <StyledLabel htmlFor="lightSpicy">약간 매움</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeRadio type="radio" id="mediumSpicy" name="spiciness" value="보통"
              checked={userSelectData.spiciness === "보통"} onChange={handleChange}
            />
            <StyledLabel htmlFor="mediumSpicy">평범해요</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeRadio type="radio" id="spicy" name="spiciness" value="매움"
              checked={userSelectData.spiciness === "매움"} onChange={handleChange}
            />
            <StyledLabel htmlFor="spicy">매운거 좋아해요</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeRadio type="radio" id="verySpicy" name="spiciness" value="엄청 매움"
              checked={userSelectData.spiciness === "엄청 매움"} onChange={handleChange}
            />
            <StyledLabel htmlFor="verySpicy">매운거 먹는게 취미에요</StyledLabel>
          </LikeDiv>
        </LikeFormGroup>
      )
    },
    {
      label: "식습관 유형을 알려주세요",
      content: (
        <LikeFormGroup>
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
      )
    },
    {
      label: "칼로리는 신경쓰시나요?",
      content: (
        <LikeFormGroup>
          <LikeDiv>
            <LikeRadio type="radio" id="lowCal" name="calories" value="low"
              checked={userSelectData.calories === "low"} onChange={handleChange}
            />
            <StyledLabel htmlFor="lowCal">낮은 칼로리를 선호해요</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeRadio type="radio" id="mediumCal" name="calories" value="medium"
              checked={userSelectData.calories === "medium"} onChange={handleChange}
            />
            <StyledLabel htmlFor="mediumCal">평범한게 좋아요</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeRadio type="radio" id="highCal" name="calories" value="high"
              checked={userSelectData.calories === "high"} onChange={handleChange}
            />
            <StyledLabel htmlFor="highCal">높은 칼로리를 선호해요</StyledLabel>
          </LikeDiv>
        </LikeFormGroup>
      )
    },
    {
      label: "조리시간을 어느정도 생각하세요?",
      content: (
        <LikeFormGroup>
          <LikeDiv>
            <LikeRadio type="radio" id="veryShort" name="cookingTime" value="veryShort"
              checked={userSelectData.cookingTime === "veryShort"} onChange={handleChange}
            />
            <StyledLabel htmlFor="veryShort">15분이하</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeRadio type="radio" id="short" name="cookingTime" value="short"
              checked={userSelectData.cookingTime === "short"} onChange={handleChange}
            />
            <StyledLabel htmlFor="short">15~30분</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeRadio type="radio" id="medium" name="cookingTime" value="medium"
              checked={userSelectData.cookingTime === "medium"} onChange={handleChange}
            />
            <StyledLabel htmlFor="medium">30~60분</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeRadio type="radio" id="long" name="cookingTime" value="long"
              checked={userSelectData.cookingTime === "long"} onChange={handleChange}
            />
            <StyledLabel htmlFor="long">60~120분</StyledLabel>
          </LikeDiv>
          <LikeDiv>
            <LikeRadio type="radio" id="veryLong" name="cookingTime" value="veryLong"
              checked={userSelectData.cookingTime === "veryLong"} onChange={handleChange}
            />
            <StyledLabel htmlFor="veryLong">120분이상</StyledLabel>
          </LikeDiv>
        </LikeFormGroup>
      )
    },
    {
      label: "레시피로 만들 음식은 어떤종류인가요?",
      content: (
        <LikeFormGroup>
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
      )
    }
  ];

  return (
    <AnimatePresence mode="wait">
      {openSelect && (
        <Modal
          isOpen={openSelect}
          onRequestClose={closeSelect}
          contentLabel="선호도 조사"
          style={customStyles}
        >
          <motion.div
            key={step}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
          >
            <h2>{steps[step].label}</h2>
            {steps[step].content}
            <ButtonContainer>
              {step > 0 && <Button onClick={prevStep}>이전</Button>}
              {step < steps.length - 1 ? (
                <Button onClick={nextStep}>다음</Button>
              ) : (
                <Button onClick={handleSubmit}>저장</Button>
              )}
            </ButtonContainer>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

export default PreferenceForm;
