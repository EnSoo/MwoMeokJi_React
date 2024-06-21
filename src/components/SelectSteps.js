import React, { useState, useRef } from "react";
import styled from "styled-components";
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import Typist from 'react-typist'

Modal.setAppElement('#root')

const SelectSteps = ({ saveStep, openSelect, closeSelect }) => {
    const [userSelectData, setUserSelectData] = useState({
        foodType: [],
        spiceLevel: "",
        dietType: "",
        calorieLevel: "",
        cookTime: "",
        dishType: []
    })

    const [step, setStep] = useState(0)
    const [direction, setDirection] = useState(1)
    const [typingDone, setTypingDone] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setUserSelectData((state) => {
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

    const nextStep = () => {
        setDirection(1)
        setStep((prevStep) => prevStep + 1)
        setTypingDone(false)
    }

    const prevStep = () => {
        setDirection(-1)
        setStep((prevStep) => prevStep - 1)
        setTypingDone(false)
    }

    const handleSubmit = () => {
        saveStep(userSelectData)
        closeSelect()
    }

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
                                <LikeRadio type="radio" id="lowCal" name="calorieLevel" value="낮음"
                                    checked={userSelectData.calorieLevel === "낮음"} onChange={handleChange}
                                />
                                <StyledLabel htmlFor="lowCal">낮은 칼로리를 선호해요</StyledLabel>
                            </LikeDiv>
                            <LikeDiv>
                                <LikeRadio type="radio" id="mediumCal" name="calorieLevel" value="중간"
                                    checked={userSelectData.calorieLevel === "중간"} onChange={handleChange}
                                />
                                <StyledLabel htmlFor="mediumCal">평범한게 좋아요</StyledLabel>
                            </LikeDiv>
                            <LikeDiv>
                                <LikeRadio type="radio" id="highCal" name="calorieLevel" value="높음"
                                    checked={userSelectData.calorieLevel === "높음"} onChange={handleChange}
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
                    </motion.div>
                )
            )
        }
    ]

    const variants = {
        enter: {
            opacity: 0,
            scale: 0.5,
            x: 0,
            y: 0,
            transition: {
                duration: .5,
            },
        },
        center: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            transition: {
                duration: .5,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.5,
            x: 0,
            y: 0,
            transition: {
                duration: .5,
            },
        },
    }

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
    )
}

export default SelectSteps

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
        alignItems: 'center'
    }
}

const LikeFormGroup = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
`

const LikeDiv = styled.div`
    margin-bottom: 10px;
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`

const Button = styled.button`
    padding: 10px 20px;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background-color: #55A416;
    }
`