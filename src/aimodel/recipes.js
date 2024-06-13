const recipes = [
    {
        "name": "고추장찌개",
        "ingredients": [
            "고추장",
            "두부",
            "애호박",
            "양파",
            "청양고추",
            "돼지고기",
            "마늘"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "spicy",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "천천히 익힌 한우",
        "ingredients": [
            "한우",
            "소금",
            "후추",
            "마늘",
            "로즈마리"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "notSpicy",
        "cookingTime": "veryLong",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "매운참깨갈비",
        "ingredients": [
            "갈비",
            "참깨",
            "고추",
            "마늘",
            "고추장",
            "간장"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "verySpicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "떡갈비",
        "ingredients": [
            "갈비",
            "떡",
            "양파",
            "간장",
            "참기름",
            "마늘"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "참깨냉면",
        "ingredients": [
            "냉면",
            "참깨",
            "오이",
            "계란",
            "고추"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": true,
            "spicy": true
        },
        "vegan": false,
        "meat": false,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "한우전골",
        "ingredients": [
            "한우",
            "버섯",
            "두부",
            "양파",
            "간장",
            "마늘"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "바베큐 치킨 야키토리 케밥",
        "ingredients": [
            "치킨",
            "야채",
            "간장",
            "마늘",
            "참기름"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "medium",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "저칼로리 초콜릿 와사비 푸딩",
        "ingredients": [
            "초콜릿",
            "와사비",
            "우유",
            "설탕"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": false,
        "calories": "low",
        "spiciness": "medium",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "된장 버터 두부",
        "ingredients": [
            "두부",
            "된장",
            "버터",
            "마늘"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": false,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "돼지고기 돈까스",
        "ingredients": [
            "돼지고기",
            "빵가루",
            "계란",
            "밀가루",
            "소금"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "medium",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "무지방 된장 소스",
        "ingredients": [
            "된장",
            "다시마",
            "마늘",
            "물"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "멜론과 히카마 초밥",
        "ingredients": [
            "멜론",
            "히카마",
            "밥",
            "김"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "연어롤",
        "ingredients": [
            "연어",
            "밥",
            "김",
            "오이",
            "아보카도"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "중국식 닭고기와 밤찜",
        "ingredients": [
            "닭고기",
            "밤",
            "간장",
            "마늘",
            "생강"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "중국식 삼겹살",
        "ingredients": [
            "삼겹살",
            "간장",
            "설탕",
            "마늘",
            "생강"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "mild",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "돼지고기와 야채 조림",
        "ingredients": [
            "돼지고기",
            "당근",
            "감자",
            "간장",
            "마늘"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "중국 고추 새우",
        "ingredients": [
            "새우",
            "고추",
            "마늘",
            "간장"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "spicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "캐슈넛과 돼지고기 볶음",
        "ingredients": [
            "돼지고기",
            "캐슈넛",
            "피망",
            "간장",
            "마늘"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "중국식 새우 팬케이크",
        "ingredients": [
            "새우",
            "계란",
            "밀가루",
            "파",
            "간장"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "연어와 눈콩 볶음",
        "ingredients": [
            "연어",
            "눈콩",
            "간장",
            "마늘",
            "생강"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "된장찌개",
        "ingredients": [
            "된장",
            "두부",
            "애호박",
            "양파",
            "대파",
            "고추",
            "마늘",
            "물",
            "육수"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": false,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "김치찌개",
        "ingredients": [
            "김치",
            "돼지고기",
            "두부",
            "양파",
            "대파",
            "고추",
            "마늘",
            "물",
            "육수"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "medium",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "순두부찌개",
        "ingredients": [
            "순두부",
            "돼지고기",
            "양파",
            "대파",
            "고추",
            "마늘",
            "계란",
            "물",
            "육수"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "medium",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "새우볶음",
        "ingredients": [
            "새우",
            "양파",
            "파프리카",
            "마늘",
            "간장",
            "소금",
            "후추",
            "식용유"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "크리올 마카로니",
        "ingredients": [
            "마카로니",
            "토마토 소스",
            "소시지",
            "피망",
            "양파",
            "마늘",
            "크리올 시즈닝"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "creole"
        ]
    },
    {
        "name": "바스마티 쌀밥",
        "ingredients": [
            "바스마티 쌀",
            "물",
            "소금"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "indian"
        ]
    },
    {
        "name": "에너지 바",
        "ingredients": [
            "귀리",
            "견과류",
            "꿀",
            "말린 과일",
            "코코넛 오일"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "american"
        ]
    },
    {
        "name": "저지방 바나나빵",
        "ingredients": [
            "바나나",
            "통밀가루",
            "베이킹파우더",
            "소금",
            "계란",
            "저지방 우유",
            "꿀"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "long",
        "categories": [
            "american"
        ]
    },
    {
        "name": "옥수수 가루 체다 만두를 곁들인 콩 스튜",
        "ingredients": [
            "콩",
            "토마토 소스",
            "옥수수 가루",
            "체다 치즈",
            "양파",
            "마늘",
            "고수"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": true,
            "spicy": true
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "long",
        "categories": [
            "mexican"
        ]
    },
    {
        "name": "매운 살사",
        "ingredients": [
            "토마토",
            "양파",
            "고추",
            "고수",
            "라임 주스",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": true
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "spicy",
        "cookingTime": "veryShort",
        "categories": [
            "mexican"
        ]
    },
    {
        "name": "카라멜 사과 니블",
        "ingredients": [
            "사과",
            "설탕",
            "버터",
            "시나몬"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "american"
        ]
    },
    {
        "name": "스위트 칠리 새우 케이크",
        "ingredients": [
            "새우",
            "빵가루",
            "달걀",
            "스위트 칠리 소스",
            "마늘",
            "생강",
            "고수"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "medium",
        "cookingTime": "medium",
        "categories": [
            "asian"
        ]
    },
    {
        "name": "버터 케이크",
        "ingredients": [
            "밀가루",
            "설탕",
            "버터",
            "달걀",
            "베이킹파우더",
            "바닐라 추출물"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "high",
        "spiciness": "notSpicy",
        "cookingTime": "long",
        "categories": [
            "american"
        ]
    },
    {
        "name": "파이 크러스트",
        "ingredients": [
            "밀가루",
            "버터",
            "소금",
            "물"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "american"
        ]
    },
    {
        "name": "브로콜리 캐서롤",
        "ingredients": [
            "브로콜리",
            "치즈",
            "우유",
            "버터",
            "밀가루",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "high",
        "spiciness": "notSpicy",
        "cookingTime": "medium",
        "categories": [
            "american"
        ]
    },
    {
        "name": "스파게티 스쿼시 패드 타이",
        "ingredients": [
            "스파게티 스쿼시",
            "타마린드 소스",
            "피넛 버터",
            "두부",
            "숙주",
            "땅콩",
            "라임"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": true
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "mild",
        "cookingTime": "long",
        "categories": [
            "thai"
        ]
    },
    {
        "name": "고구마와 파인애플 코르마",
        "ingredients": [
            "고구마",
            "파인애플",
            "코코넛 밀크",
            "커리 가루",
            "양파",
            "마늘",
            "생강",
            "토마토"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": true
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "long",
        "categories": [
            "indian"
        ]
    },
    {
        "name": "연어 패티",
        "ingredients": [
            "연어",
            "빵가루",
            "달걀",
            "마요네즈",
            "레몬 주스",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "american"
        ]
    },
    {
        "name": "시금치밥으로 속을 채운 닭가슴살",
        "ingredients": [
            "닭가슴살",
            "시금치",
            "밥",
            "치즈",
            "소금",
            "후추",
            "올리브 오일"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "medium",
        "categories": [
            "american"
        ]
    },
    {
        "name": "찹쌀가루 만두, 홍콩 스타일",
        "ingredients": [
            "찹쌀가루",
            "돼지고기",
            "새우",
            "대파",
            "간장",
            "참기름",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "돼지고기 야채 볶음",
        "ingredients": [
            "돼지고기",
            "양파",
            "당근",
            "피망",
            "간장",
            "마늘",
            "생강",
            "참기름",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "소고기 야채 볶음",
        "ingredients": [
            "소고기",
            "브로콜리",
            "양파",
            "당근",
            "간장",
            "마늘",
            "생강",
            "참기름",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "고소한 두부 소스",
        "ingredients": [
            "두부",
            "간장",
            "마늘",
            "생강",
            "참기름",
            "물",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "치즈스틱 오니기리",
        "ingredients": [
            "밥",
            "치즈스틱",
            "김",
            "간장",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "오리 구이",
        "ingredients": [
            "오리",
            "소금",
            "후추",
            "마늘",
            "로즈마리",
            "올리브 오일"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "오코노미야끼",
        "ingredients": [
            "밀가루",
            "양배추",
            "베이컨",
            "계란",
            "물",
            "소스",
            "마요네즈",
            "가쓰오부시",
            "파"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "medium",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "땅콩 소스를 곁들인 중국 양고기",
        "ingredients": [
            "양고기",
            "땅콩 소스",
            "마늘",
            "생강",
            "간장",
            "참기름",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "medium",
        "cookingTime": "medium",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "새우 짜장면",
        "ingredients": [
            "새우",
            "짜장 소스",
            "양파",
            "당근",
            "감자",
            "면"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "medium",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "치킨 차우",
        "ingredients": [
            "닭고기",
            "양파",
            "당근",
            "피망",
            "간장",
            "마늘",
            "생강",
            "참기름",
            "소금",
            "후추",
            "면"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "간단하게 구운 청경채",
        "ingredients": [
            "청경채",
            "마늘",
            "간장",
            "참기름",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "barelySpicy",
        "cookingTime": "veryShort",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "뜨겁고 매운 갈비 구이",
        "ingredients": [
            "갈비",
            "고추장",
            "간장",
            "마늘",
            "생강",
            "설탕",
            "고추",
            "참기름"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "spicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "보온병 히지키",
        "ingredients": [
            "히지키",
            "당근",
            "유부",
            "간장",
            "미림",
            "설탕",
            "물"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "검은콩국",
        "ingredients": [
            "검은콩",
            "물",
            "소금",
            "마늘",
            "양파",
            "고추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "일본 생강 디핑 소스",
        "ingredients": [
            "생강",
            "간장",
            "식초",
            "설탕",
            "물"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "barelySpicy",
        "cookingTime": "veryShort",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "일본식 오이 샐러드",
        "ingredients": [
            "오이",
            "식초",
            "설탕",
            "소금",
            "참기름"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "veryShort",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "우동국수",
        "ingredients": [
            "우동면",
            "다시마",
            "간장",
            "미림",
            "물",
            "파",
            "계란"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "소고기와 브로콜리 볶음",
        "ingredients": [
            "소고기",
            "브로콜리",
            "간장",
            "마늘",
            "생강",
            "참기름",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "생강 참깨 참치 꼬치",
        "ingredients": [
            "참치",
            "생강",
            "참깨",
            "간장",
            "마늘",
            "참기름",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "파와 양파를 곁들인 쇠고기 검은 콩 소스",
        "ingredients": [
            "소고기",
            "파",
            "양파",
            "검은 콩 소스",
            "간장",
            "마늘",
            "생강",
            "참기름",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "medium",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "절인 생강 치킨",
        "ingredients": [
            "닭고기",
            "생강",
            "간장",
            "미림",
            "설탕",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "medium",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "일본식 샐러드 드레싱",
        "ingredients": [
            "간장",
            "식초",
            "설탕",
            "참기름",
            "마늘",
            "생강"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "veryShort",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "스시 롤",
        "ingredients": [
            "김",
            "밥",
            "생선 (연어",
            "참치 등)",
            "오이",
            "아보카도",
            "간장",
            "와사비",
            "식초"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "된장마늘구이 가지",
        "ingredients": [
            "가지",
            "된장",
            "마늘",
            "올리브 오일",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "팬케이크를 곁들인 중국 오리",
        "ingredients": [
            "오리",
            "팬케이크(밀가루",
            "물)",
            "오이",
            "파",
            "호이신 소스"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "녹차밥(오챠즈케)",
        "ingredients": [
            "밥",
            "녹차",
            "다시마",
            "간장",
            "소금",
            "연어 또는 우메보시"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": true,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "veryShort",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "중국식 닭다리",
        "ingredients": [
            "닭다리",
            "간장",
            "마늘",
            "생강",
            "설탕",
            "식초"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "계란 수프",
        "ingredients": [
            "계란",
            "닭 육수",
            "간장",
            "파",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "veryShort",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "일본 누들 샐러드",
        "ingredients": [
            "우동면",
            "오이",
            "당근",
            "무",
            "간장",
            "식초",
            "설탕",
            "참기름"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "스키야키",
        "ingredients": [
            "소고기",
            "두부",
            "표고버섯",
            "당면",
            "파",
            "간장",
            "설탕",
            "미림",
            "물"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "mild",
        "cookingTime": "medium",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "데리야끼버거",
        "ingredients": [
            "버거 패티",
            "데리야끼 소스(간장",
            "설탕",
            "미림",
            "생강)",
            "양상추",
            "토마토",
            "양파",
            "햄버거 번"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "고기 소스를 곁들인 베이징 국수",
        "ingredients": [
            "소고기",
            "간장",
            "설탕",
            "마늘",
            "생강",
            "국수",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "라면 누들 치킨 샐러드",
        "ingredients": [
            "라면 누들",
            "닭고기",
            "양상추",
            "당근",
            "오이",
            "간장",
            "식초",
            "설탕",
            "참기름"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "된장 연어와 시금치",
        "ingredients": [
            "연어",
            "시금치",
            "된장",
            "마늘",
            "올리브 오일",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "당근 참깨 후리카케",
        "ingredients": [
            "당근",
            "참깨",
            "간장",
            "설탕",
            "식초"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "barelySpicy",
        "cookingTime": "veryShort",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "일본식 카페테리아 스파게티 소스",
        "ingredients": [
            "스파게티 면",
            "간장",
            "설탕",
            "마늘",
            "생강",
            "고추장"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "medium",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "일본식 사천식 새우를 곁들인 마파두부",
        "ingredients": [
            "새우",
            "두부",
            "간장",
            "두반장",
            "마늘",
            "생강",
            "고추기름",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "spicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "게 완탕",
        "ingredients": [
            "게살",
            "만두피",
            "간장",
            "생강",
            "마늘",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "medium",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "라면 누들 프리타타",
        "ingredients": [
            "라면 누들",
            "계란",
            "양파",
            "피망",
            "치즈"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "라면을 곁들인 새우 수프",
        "ingredients": [
            "라면 누들",
            "새우",
            "닭 육수",
            "간장",
            "마늘",
            "생강",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "구운 돼지고기 계란 푸영",
        "ingredients": [
            "돼지고기",
            "계란",
            "간장",
            "마늘",
            "생강",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "mild",
        "cookingTime": "medium",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "일본식 봄 야채 라구",
        "ingredients": [
            "양파",
            "당근",
            "감자",
            "시금치",
            "버섯",
            "다진 마늘",
            "간장",
            "미림",
            "다시다",
            "올리브 오일"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "medium",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "사천식 가지",
        "ingredients": [
            "가지",
            "두반장",
            "다진 마늘",
            "생강",
            "고추기름",
            "간장",
            "설탕"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "spicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "사천식 야채 볶음",
        "ingredients": [
            "양배추",
            "당근",
            "피망",
            "두반장",
            "고추기름",
            "다진 마늘",
            "생강",
            "간장",
            "설탕"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "spicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "어묵",
        "ingredients": [
            "어묵",
            "간장",
            "설탕",
            "물",
            "대파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "데리야끼 글레이즈드 연어 패티",
        "ingredients": [
            "연어",
            "데리야끼 소스",
            "다진 마늘",
            "생강",
            "올리브 오일"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "중국 야채 샐러드",
        "ingredients": [
            "양배추",
            "당근",
            "피망",
            "오이",
            "간장",
            "식초",
            "설탕",
            "참기름"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "barelySpicy",
        "cookingTime": "veryShort",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "검은 콩 마늘 소스를 곁들인 브뤼셀 콩나물",
        "ingredients": [
            "브뤼셀 콩나물",
            "검은 콩",
            "마늘",
            "간장",
            "설탕",
            "올리브 오일"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "만두피",
        "ingredients": [
            "밀가루",
            "물",
            "소금"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "파 팬케이크",
        "ingredients": [
            "밀가루",
            "물",
            "소금",
            "파",
            "식용유"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "매실 바베큐 소스",
        "ingredients": [
            "매실",
            "간장",
            "설탕",
            "다진 마늘",
            "생강",
            "고추기름"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": true
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "medium",
        "cookingTime": "veryShort",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "매콤한 사천 소고기",
        "ingredients": [
            "소고기",
            "두반장",
            "다진 마늘",
            "생강",
            "고추기름",
            "간장",
            "설탕"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "spicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "구기자 뮤즐리",
        "ingredients": [
            "귀리",
            "구기자",
            "꿀",
            "아몬드",
            "건포도",
            "우유"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "veryShort",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "과일 두부 스무디",
        "ingredients": [
            "두부",
            "바나나",
            "딸기",
            "우유",
            "꿀"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "veryShort",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "차완무시(일본식 계란찜)",
        "ingredients": [
            "계란",
            "다시마 육수",
            "간장",
            "미림",
            "소금",
            "새우",
            "표고버섯",
            "대파"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "저탄수화물 일본식 카레",
        "ingredients": [
            "닭고기",
            "당근",
            "감자",
            "양파",
            "카레 가루",
            "간장",
            "다시다",
            "물"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "medium",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "김밥",
        "ingredients": [
            "밥",
            "김",
            "시금치",
            "당근",
            "계란",
            "단무지",
            "우엉",
            "참기름",
            "소금"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "비빔밥",
        "ingredients": [
            "밥",
            "나물(시금치",
            "고사리",
            "도라지)",
            "고추장",
            "참기름",
            "계란",
            "소고기"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "김치볶음밥",
        "ingredients": [
            "밥",
            "김치",
            "돼지고기",
            "대파",
            "계란",
            "간장",
            "참기름"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "매운 회덮밥",
        "ingredients": [
            "밥",
            "회(연어",
            "참치 등)",
            "상추",
            "오이",
            "배",
            "고추장",
            "고춧가루",
            "참기름"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "spicy",
        "cookingTime": "veryShort",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "돌솥 비빔밥",
        "ingredients": [
            "밥",
            "나물(시금치",
            "고사리",
            "도라지)",
            "고추장",
            "참기름",
            "계란",
            "소고기",
            "돌솥"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "채식 비빔밥",
        "ingredients": [
            "밥",
            "나물(시금치",
            "고사리",
            "도라지)",
            "고추장",
            "참기름",
            "두부",
            "당근",
            "버섯",
            "계란 (선택사항)"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "불고기",
        "ingredients": [
            "소고기",
            "간장",
            "설탕",
            "다진 마늘",
            "참기름",
            "파",
            "양파",
            "당근"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "돼지 불고기",
        "ingredients": [
            "돼지고기",
            "고추장",
            "간장",
            "설탕",
            "다진 마늘",
            "참기름",
            "파",
            "양파",
            "당근"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "medium",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "소고기 불고기",
        "ingredients": [
            "소고기",
            "간장",
            "설탕",
            "다진 마늘",
            "참기름",
            "파",
            "양파",
            "당근"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "불고기 전골",
        "ingredients": [
            "소고기",
            "간장",
            "설탕",
            "다진 마늘",
            "참기름",
            "파",
            "양파",
            "당근",
            "버섯",
            "배추",
            "다시마 육수"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "한국식 불고기 버거",
        "ingredients": [
            "소고기 불고기",
            "햄버거 번",
            "상추",
            "토마토",
            "양파",
            "마요네즈",
            "케첩"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "매운 돼지 불고기",
        "ingredients": [
            "돼지고기",
            "고추장",
            "간장",
            "설탕",
            "다진 마늘",
            "참기름",
            "고춧가루",
            "파",
            "양파",
            "당근"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "spicy",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "호떡",
        "ingredients": [
            "밀가루",
            "물",
            "설탕",
            "이스트",
            "소금",
            "설탕",
            "꿀",
            "견과류"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "high",
        "spiciness": "notSpicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "떡국",
        "ingredients": [
            "떡",
            "소고기",
            "계란",
            "간장",
            "다진 마늘",
            "소금",
            "참기름",
            "대파",
            "다시다"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "한국식 버섯 케밥",
        "ingredients": [
            "버섯",
            "간장",
            "다진 마늘",
            "참기름",
            "소금",
            "후추",
            "파프리카",
            "양파",
            "꼬치"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "한국식 매운 돼지갈비",
        "ingredients": [
            "돼지갈비",
            "고추장",
            "고춧가루",
            "간장",
            "설탕",
            "마늘",
            "생강",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "spicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "잡채",
        "ingredients": [
            "당면",
            "소고기",
            "시금치",
            "당근",
            "양파",
            "버섯",
            "간장",
            "설탕",
            "참기름",
            "마늘"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "육개장",
        "ingredients": [
            "소고기",
            "대파",
            "숙주",
            "고사리",
            "고추기름",
            "간장",
            "고춧가루",
            "마늘",
            "생강"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "medium",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "오징어볶음",
        "ingredients": [
            "오징어",
            "양파",
            "당근",
            "고추",
            "고추장",
            "고춧가루",
            "간장",
            "설탕",
            "마늘",
            "참기름"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "medium",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "약과",
        "ingredients": [
            "밀가루",
            "꿀",
            "참기름",
            "소금",
            "생강즙"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "high",
        "spiciness": "notSpicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "물냉면",
        "ingredients": [
            "냉면",
            "오이",
            "배",
            "소고기 육수",
            "식초",
            "설탕",
            "겨자"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": false,
        "calories": "low",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "장조림",
        "ingredients": [
            "소고기",
            "간장",
            "설탕",
            "마늘",
            "물",
            "계란"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "갈비",
        "ingredients": [
            "소갈비",
            "간장",
            "설탕",
            "마늘",
            "생강",
            "배",
            "참기름",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "mild",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "빈대떡",
        "ingredients": [
            "녹두",
            "돼지고기",
            "김치",
            "숙주",
            "소금",
            "후추",
            "간장",
            "기름"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "곰탕",
        "ingredients": [
            "소뼈",
            "소고기",
            "무",
            "대파",
            "마늘",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "notSpicy",
        "cookingTime": "veryLong",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "만두",
        "ingredients": [
            "돼지고기",
            "양배추",
            "두부",
            "양파",
            "파",
            "마늘",
            "간장",
            "소금",
            "후추",
            "만두피"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "미역국",
        "ingredients": [
            "미역",
            "소고기",
            "참기름",
            "간장",
            "마늘",
            "소금"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "medium",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "비빔면",
        "ingredients": [
            "소면",
            "오이",
            "당근",
            "고추장",
            "설탕",
            "식초",
            "참기름",
            "깨"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "medium",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "간장 떡볶이",
        "ingredients": [
            "떡",
            "간장",
            "설탕",
            "물",
            "파",
            "마늘"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": false,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "매운 떡볶이",
        "ingredients": [
            "떡",
            "고추장",
            "고춧가루",
            "설탕",
            "물",
            "파",
            "마늘"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": false,
        "calories": "medium",
        "spiciness": "spicy",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "치즈 떡볶이",
        "ingredients": [
            "떡",
            "고추장",
            "고춧가루",
            "설탕",
            "물",
            "파",
            "마늘",
            "치즈"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": false,
        "calories": "high",
        "spiciness": "spicy",
        "cookingTime": "short",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "갈비탕",
        "ingredients": [
            "소갈비",
            "무",
            "대파",
            "마늘",
            "간장",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "삼계탕",
        "ingredients": [
            "닭",
            "찹쌀",
            "대추",
            "마늘",
            "인삼",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "설렁탕",
        "ingredients": [
            "소뼈",
            "소고기",
            "무",
            "대파",
            "마늘",
            "소금",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "notSpicy",
        "cookingTime": "veryLong",
        "categories": [
            "korean"
        ]
    },
    {
        "name": "파 국물을 넣은 소바 국수",
        "ingredients": [
            "소바 면",
            "파",
            "간장",
            "다시마",
            "물"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "소고기, 검은콩, 굴소스를 곁들인 쌀국수",
        "ingredients": [
            "소고기",
            "검은콩",
            "굴소스",
            "쌀국수",
            "양파",
            "마늘",
            "간장",
            "참기름",
            "물"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "medium",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "소고기 볶음",
        "ingredients": [
            "소고기",
            "양파",
            "파프리카",
            "간장",
            "마늘",
            "참기름",
            "후추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "마파두부",
        "ingredients": [
            "두부",
            "돼지고기",
            "두반장",
            "마늘",
            "생강",
            "대파",
            "간장",
            "물"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "medium",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "양꼬치",
        "ingredients": [
            "양고기",
            "고춧가루",
            "소금",
            "후추",
            "참기름"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "medium",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "갈비 훠궈",
        "ingredients": [
            "소갈비",
            "배추",
            "버섯",
            "두부",
            "당면",
            "소스 (고추기름",
            "간장",
            "마늘",
            "생강)"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "spicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "치킨 훠궈",
        "ingredients": [
            "닭고기",
            "배추",
            "버섯",
            "두부",
            "당면",
            "소스 (고추기름",
            "간장",
            "마늘",
            "생강)"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "spicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "소고기 훠궈",
        "ingredients": [
            "소고기",
            "배추",
            "버섯",
            "두부",
            "당면",
            "소스 (고추기름",
            "간장",
            "마늘",
            "생강)"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "spicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "베이징 덕",
        "ingredients": [
            "오리",
            "소금",
            "후추",
            "간장",
            "꿀",
            "파",
            "오이",
            "전병"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "mild",
        "cookingTime": "veryLong",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "딤섬 만두",
        "ingredients": [
            "돼지고기",
            "새우",
            "양파",
            "부추",
            "간장",
            "참기름",
            "만두피"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "칠면조 딤섬",
        "ingredients": [
            "칠면조 고기",
            "양파",
            "부추",
            "간장",
            "참기름",
            "만두피"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "새우 딤섬",
        "ingredients": [
            "새우",
            "딤섬피",
            "간장",
            "생강",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "돼지고기 딤섬",
        "ingredients": [
            "돼지고기",
            "딤섬피",
            "간장",
            "생강",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "탕수육",
        "ingredients": [
            "돼지고기",
            "감자 전분",
            "간장",
            "설탕",
            "식초",
            "케찹",
            "파인애플"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "medium",
        "cookingTime": "medium",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "궁바오지딩",
        "ingredients": [
            "닭고기",
            "땅콩",
            "고추",
            "간장",
            "설탕",
            "마늘",
            "생강"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "spicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "샤오롱바오",
        "ingredients": [
            "돼지고기",
            "샤오롱바오 피",
            "간장",
            "생강",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "홍소육",
        "ingredients": [
            "돼지고기",
            "간장",
            "설탕",
            "마늘",
            "생강",
            "대파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "mild",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "회과육",
        "ingredients": [
            "돼지고기",
            "간장",
            "설탕",
            "식초",
            "생강",
            "대파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "medium",
        "cookingTime": "medium",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "칠리 새우",
        "ingredients": [
            "새우",
            "고추",
            "마늘",
            "간장",
            "설탕",
            "생강",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "spicy",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "오향장육",
        "ingredients": [
            "돼지고기",
            "오향가루",
            "간장",
            "설탕",
            "생강",
            "대파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "양고기 수프",
        "ingredients": [
            "양고기",
            "당근",
            "감자",
            "양파",
            "토마토",
            "마늘",
            "생강"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "닭고기와 청경채 볶음",
        "ingredients": [
            "닭고기",
            "청경채",
            "간장",
            "마늘",
            "생강",
            "고추"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "중국식 춘권",
        "ingredients": [
            "춘권피",
            "돼지고기",
            "당면",
            "당근",
            "양파",
            "간장",
            "생강",
            "마늘"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "medium",
        "categories": [
            "chinese"
        ]
    },
    {
        "name": "스시",
        "ingredients": [
            "밥",
            "김",
            "생선 (참치",
            "연어 등)",
            "초밥 식초",
            "간장",
            "와사비"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "라멘 누들",
        "ingredients": [
            "라멘 면",
            "돼지고기",
            "계란",
            "대파",
            "미소",
            "간장",
            "마늘",
            "생강"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "참치 사시미",
        "ingredients": [
            "참치",
            "간장",
            "와사비",
            "생강"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "veryShort",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "텐푸라 소바",
        "ingredients": [
            "소바 면",
            "텐푸라 (새우",
            "야채 등)",
            "간장",
            "다시마",
            "물"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "medium",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "텐푸라",
        "ingredients": [
            "새우",
            "야채 (고구마",
            "가지 등)",
            "밀가루",
            "물",
            "간장",
            "다시마",
            "생강"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "규 돈부리",
        "ingredients": [
            "소고기",
            "양파",
            "계란",
            "간장",
            "설탕",
            "생강",
            "파",
            "밥"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "medium",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "조개 돈부리",
        "ingredients": [
            "조개",
            "양파",
            "간장",
            "설탕",
            "생강",
            "파",
            "밥"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "medium",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "타코야키",
        "ingredients": [
            "타코야키 반죽 (밀가루",
            "계란",
            "물)",
            "문어",
            "파",
            "텐카스",
            "간장",
            "마요네즈",
            "가쓰오부시"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "미소 수프",
        "ingredients": [
            "다시마",
            "미소",
            "두부",
            "파",
            "물"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": true,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "veryShort",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "요세 나베",
        "ingredients": [
            "닭고기",
            "돼지고기",
            "두부",
            "배추",
            "시금치",
            "버섯",
            "당근",
            "다시마",
            "미소"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "이시카리 나베",
        "ingredients": [
            "연어",
            "두부",
            "배추",
            "버섯",
            "당근",
            "다시마",
            "미소"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "치킨 야키토리",
        "ingredients": [
            "닭고기",
            "간장",
            "설탕",
            "미림",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "규돈",
        "ingredients": [
            "소고기",
            "양파",
            "간장",
            "설탕",
            "생강",
            "파",
            "밥"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "자루 소바(일본 차가운 국수)",
        "ingredients": [
            "소바 면",
            "다시마",
            "간장",
            "미림",
            "파",
            "와사비"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "와사비 슈마이",
        "ingredients": [
            "돼지고기",
            "슈마이 피",
            "간장",
            "와사비",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": true
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "모찌",
        "ingredients": [
            "찹쌀가루",
            "설탕",
            "물",
            "팥"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "high",
        "spiciness": "notSpicy",
        "cookingTime": "long",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "유부초밥",
        "ingredients": [
            "유부",
            "밥",
            "간장",
            "설탕",
            "미림",
            "식초"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "야키토리",
        "ingredients": [
            "닭고기",
            "간장",
            "설탕",
            "미림",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "가츠돈",
        "ingredients": [
            "돼지고기 커틀릿",
            "양파",
            "계란",
            "간장",
            "설탕",
            "생강",
            "밥"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "치킨 가라아게",
        "ingredients": [
            "닭고기",
            "간장",
            "생강",
            "마늘",
            "감자 전분"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "mild",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "타이야키",
        "ingredients": [
            "밀가루",
            "설탕",
            "베이킹 파우더",
            "계란",
            "팥"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "코로케",
        "ingredients": [
            "감자",
            "소고기",
            "양파",
            "밀가루",
            "빵가루",
            "계란"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "long",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "오니기리",
        "ingredients": [
            "밥",
            "김",
            "소금",
            "참치 마요네즈"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": true,
        "meat": false,
        "calories": "low",
        "spiciness": "notSpicy",
        "cookingTime": "veryShort",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "히야시 츄카(일본식 여름 샐러드)",
        "ingredients": [
            "국수",
            "햄",
            "오이",
            "계란",
            "미소",
            "간장",
            "설탕",
            "식초"
        ],
        "weatherFeatures": {
            "warm": true,
            "cold": false,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "샤부샤부",
        "ingredients": [
            "소고기",
            "배추",
            "시금치",
            "버섯",
            "당근",
            "다시마",
            "간장"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "오야코돈",
        "ingredients": [
            "닭고기",
            "계란",
            "양파",
            "간장",
            "설탕",
            "생강",
            "밥"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "일본식 소고기 타타키",
        "ingredients": [
            "소고기",
            "간장",
            "생강",
            "마늘",
            "레몬",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "veryShort",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "소고기 야키니쿠",
        "ingredients": [
            "소고기",
            "간장",
            "설탕",
            "미림",
            "파"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": false,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "high",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    },
    {
        "name": "요세나베",
        "ingredients": [
            "닭고기",
            "돼지고기",
            "두부",
            "배추",
            "시금치",
            "버섯",
            "당근",
            "다시마",
            "미소"
        ],
        "weatherFeatures": {
            "warm": false,
            "cold": true,
            "soup": true,
            "spicy": false
        },
        "vegan": false,
        "meat": true,
        "calories": "medium",
        "spiciness": "barelySpicy",
        "cookingTime": "short",
        "categories": [
            "japanese"
        ]
    }
];
export default recipes;