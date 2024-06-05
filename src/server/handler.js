const crypto = require('crypto');
const storeData = require('../services/storeData');
const forums = require('./forum');
const { title } = require('process');

async function postForumHandler(request, h) {


  const { title, content, author } = request.payload ;
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    "id": id,
    "title": title,
    "content": content,
    "author": author,
    "createdAt": createdAt
  }

  await storeData(id,data);

  const response = h.response({
    status: 'success',
    message: 'Your discussion sended',
    data
  })
  response.code(201);
  return response;
}

async function getAllForumHandler(request, h) {
  let filterdata = forums;

  const response = h.response({
    status: 'success',
    data: {
      forums : filterdata.map((forum) =>({
              id: forum.id,
              title: forum.title,
              content: forum.content,
              author: forum.author,
  })),
},
  })
  response.code(201);
  return response;
}


async function getIdForumHandler(request, h) {
  const {id} = request.params;

    const forum = forums.filter((b) => b.id === id)[0];

    if (forum !== undefined){
        return {
            status: 'success',
            data: {
                forum,
            },
        };
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Forum tidak ditemukan',
    });
    response.code(404);
    return response;
}


module.exports = {postForumHandler, getAllForumHandler, getIdForumHandler};
