import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import Typist from 'react-typist'

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
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    position: 'none',
    width: '90%',
    maxWidth: '400px',  // 모달의 최대 너비
    height: 'auto',
    maxHeight: '80vh',  // 모달의 최대 높이
    margin: '20px',
    overflow: 'auto',
    border: '1px solid #ccc',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
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

const PreferenceForm = ({ openSelect, closeSelect, weatherData }) => {
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
  const [typingDone, setTypingDone] = useState(false)

  const nextStep = useCallback(() => {
    setDirection(1);
    setStep((prevStep) => prevStep + 1);
    setTypingDone(false)
  }, []);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setStep((prevStep) => prevStep - 1);
    setTypingDone(false)
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    console.log("Event Target:", e.target);  // 로깅 추가
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
  }, [setUserSelectData]);

  const handleSubmit = useCallback((e) => {
    console.log("선호도 조사 결과:", userSelectData);
    e.preventDefault();
    localStorage.setItem('userPreferences', JSON.stringify(userSelectData));
    // 하이브리드 환경일 경우 안드로이드 Preferences에 저장을 하기 위한 함수
    if(window.isAndroid){
      window.Droid.setUserPreferences(JSON.stringify(userSelectData))
    }
    closeSelect();
}, [userSelectData, closeSelect]);

  const steps = [
    {
      label: "어디 음식을 좋아하세요?",
      content: (
        typingDone && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
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
          </motion.div>
        )
      )
    },
    {
      label: "매운 음식은 잘드시나요?",
      content: (
        typingDone && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <LikeFormGroup>
              <LikeDiv>
                <LikeRadio type="radio" id="notSpicy" name="spiciness" value="안 매움"
                  checked={userSelectData.spiciness === "안 매움"} onChange={handleChange}
                />
                <StyledLabel htmlFor="notSpicy">전혀 못 먹어요</StyledLabel>
              </LikeDiv>
              <LikeDiv>
                <LikeRadio type="radio" id="lightSpicy" name="spiciness" value="약간 매움"
                  checked={userSelectData.spiciness === "약간 매움"} onChange={handleChange}
                />
                <StyledLabel htmlFor="lightSpicy">거의 못 먹어요</StyledLabel>
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
                <StyledLabel htmlFor="spicy">매운거 잘 먹어요</StyledLabel>
              </LikeDiv>
              <LikeDiv>
                <LikeRadio type="radio" id="verySpicy" name="spiciness" value="엄청 매움"
                  checked={userSelectData.spiciness === "엄청 매움"} onChange={handleChange}
                />
                <StyledLabel htmlFor="verySpicy">매운거 먹는게 취미에요</StyledLabel>
              </LikeDiv>
            </LikeFormGroup>
          </motion.div>
        )
      )
    },
    {
      label: "식습관 유형을 알려주세요",
      content: (
        typingDone && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
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
          </motion.div>
        )
      )
    },
    {
      label: "칼로리는 신경쓰시나요?",
      content: (
        typingDone && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
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
          </motion.div>
        )
      )
    },
    {
      label: "조리시간을 어느정도 생각하세요?",
      content: (
        typingDone && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
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
          </motion.div>
        )
      )
    },
    {
      label: "레시피로 만들 음식은 어떤종류인가요?",
      content: (
        typingDone && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <LikeFormGroup>
              <LikeDiv>
                <LikeCheck type="checkbox" id="mainDish" name="dishType" value="메인요리"
                  checked={userSelectData.dishType.includes("메인요리")} onChange={handleChange}
                />
                <StyledLabel htmlFor="mainDish">메인요리</StyledLabel>
              </LikeDiv>
              <LikeDiv>
                <LikeCheck type="checkbox" id="sideDish" name="dishType" value="반찬"
                  checked={userSelectData.dishType.includes("반찬")} onChange={handleChange}
                />
                <StyledLabel htmlFor="sideDish">반찬</StyledLabel>
              </LikeDiv>
              <LikeDiv>
                <LikeCheck type="checkbox" id="dessert" name="dishType" value="간식"
                  checked={userSelectData.dishType.includes("간식")} onChange={handleChange}
                />
                <StyledLabel htmlFor="dessert">간식</StyledLabel>
              </LikeDiv>
              <LikeDiv>
                <LikeCheck type="checkbox" id="soup" name="dishType" value="국물요리"
                  checked={userSelectData.dishType.includes("국물요리")} onChange={handleChange}
                />
                <StyledLabel htmlFor="soup">국물요리</StyledLabel>
              </LikeDiv>
              <LikeDiv>
                <LikeCheck type="checkbox" id="sauce" name="dishType" value="소스"
                  checked={userSelectData.dishType.includes("소스")} onChange={handleChange}
                />
                <StyledLabel htmlFor="sauce">소스</StyledLabel>
              </LikeDiv>
            </LikeFormGroup>
          </motion.div>
        )
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
            <Typist cursor={{ show: false }} onTypingDone={() => setTypingDone(true)}>
              <h2>{steps[step].label}</h2>
            </Typist>
            {typingDone && steps[step].content}
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
