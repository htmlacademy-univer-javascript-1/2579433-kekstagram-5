const uid = function(){
  return Date.now();
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
    avatar: `img/avatar-${Math.floor((Math.random() * 10) % 7)}.svg`,
    message: messages[Math.floor((Math.random() * 10) % 6)] + messages[Math.floor((Math.random() * 10) % 6)],
    name: names[Math.floor((Math.random() * 100) % names.length)],
  };
};

const generateComments = function(){
  const max = Math.floor((Math.random() * 100) % 31);
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
    description: descriptions[Math.floor((Math.random() * 10) % descriptions.length)],
    likes: Math.floor((Math.random() * 1000) % (200 - 15) + 15),
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
