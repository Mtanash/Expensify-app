// const book = {
//   title: "Ego is the enemy",
//   author: "Rayan Holiday",
//   published: {
//     name: "Penguin",
//   },
// };

// const { name: publishedName = "Self published" } = book.published;

// console.log(publishedName);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];

const [coffee, , price] = item;

console.log(`a medium ${coffee} costs ${price}.`);
