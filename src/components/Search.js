import Fuse from "fuse.js";

const Search = (recipesData) => {

const options = {
  keys: ["title", "ingredients"], // 검색 대상 필드 설정
  includeScore: true,             // 유사도 점수 포함
  threshold: 0.4,
  tokenize: true,
};

const fuse = new Fuse(recipesData, options); // recipesData는 서버에서 받아온 JSON 데이터

function searchRecipes(query) {
  const results = fuse.search(query);
  return results.map(result => result.item.no); // 검색 결과에서 no만 추출
}

}