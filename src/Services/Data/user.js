let userData = []
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

for (let i=0;i<132;i++) {
    let name = "Rizki Ramadhan"
    let username = "ikky"
    if (i % 2 === 0) {
      name = "Ikky Ramadhan"
      username = "kyrou"
    } else if (i % 3 === 0) {
      name = "jainudin"
      username = "ikky.rmdn_"
    }

    userData = [...userData, {
        _id: i+1,
        name: name,
        number: Math.floor(Math.random() * 100) + 1,
        username: username,
        created_date: randomDate(new Date(2022, 0, 1), new Date()),
      },]
}

export const users = userData;

