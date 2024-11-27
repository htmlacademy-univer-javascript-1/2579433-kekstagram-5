const uid = function(){
  return Date.now();
};

const generateRandom = function(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createComment = function(){
  const messages = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
  ];

  const names = ["Аамон", "Амон", "Амун", "Аман", "Аманд", "Абигор", "Элигору", "Элигос", "Эрртруар"];

  return {
    id: uid(),
    avatar: `img/avatar-${generateRandom(0, 7)}.svg`,
    message: messages[generateRandom(6)] + messages[generateRandom(6)],
    name: names[generateRandom(0, names.length)],
  };
};

const generateComments = function(){
  const max = generateRandom(0, 30);
  const comments = [];
  for(let i = 0; i < max; i++){
    comments.push(createComment());
  }
  return comments;
};

const createPost = function(id, url){
  const descriptions = ["Hope eradicated", "Meat automaton", "Divine light", "Power in misery", "CEO mindset", "Funny pills"];
  return {
    id: id,
    url: `photos/${url}.jpg`,
    description: descriptions[generateRandom(0, descriptions.length)],
    likes: Math.floor(generateRandom(15, 200)),
    comments: generateComments(),
  };
};

const constructTask = function(){
  for(let i = 1; i <= 25; i++){
    const post = createPost(i, i);
    console.log(post);
    console.log(post.comments);
  }
};
