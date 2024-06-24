const transformItem = (item) => {
    const ingredientsArray = item.ingredients.split(','); // 재료를 콤마로 구분하여 배열로 변환
    const categoriesArray = item.categories ? item.categories.split(',') : []; // 카테고리를 콤마로 구분하여 배열로 변환
    let timeCategory = ""; // 시간 카테고리 초기화
    if (item.times) {
     
        const timeValue = parseInt(item.times, 10); // 문자열을 정수로 변환
        if (timeValue <= 15) {
          timeCategory = "very short";
        } else if (timeValue > 15 && timeValue <= 30) {
          timeCategory = "short";
        } else if (timeValue > 30 && timeValue <= 60) {
          timeCategory = "medium";
        } else if (timeValue > 60 && timeValue <= 120) {
          timeCategory = "long";
        } else {
          timeCategory = "very long";
        } // 시간 카테고리 설정
      
    }

    
    let spicinessValue = "";
    switch (item.spiciness) {
      case "0":
        spicinessValue = "안 매움";
        break;
      case "1":
        spicinessValue = "약간 매움";
        break;
      case "2":
        spicinessValue = "보통";
        break;
      case "3":
        spicinessValue = "매움";
        break;
      case "4":
      case "5":
        spicinessValue = "엄청 매움";
        break;
      default:
        spicinessValue = "알 수 없음"; // 만약 spiciness가 0-5 이외의 값일 경우
    }
    return {
        no: parseInt(item.no, 10),
        email: item.email,
        title: item.title,
        ingredients: ingredientsArray,
        spiciness: spicinessValue,
        vegan: item.vegan === "1",
        meat: item.meat === "1",
        calories: item.calories,
        times: timeCategory,
        categories: categoriesArray,
        dishType: [""], // assuming '메인요리' is fixed for all items
        warm: item["weather(Warm)"] === "1",
        cold: item["weather(Cold)"] === "1",
        soup: item.soup === "1",
        recipe: item.recipe,
        imgurl: item.imgurl,
        createdate: item.createdate,
        modifydate: item.modifydate,
        favor: item.favor,
        my_recipe: item.my_recipe,
        my_like: item.my_like,
        views: item.views,
    };
};

export const changerecipe = (items) => {
    return items.map(transformItem);
};

export default changerecipe;
