import request from '@/utils/request'
import store from '@/store'
export const findUserInfo = () => {
  return request({
    // method: 'GET',
    url: '/v1_0/user/profile',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }

  })
}
// 根据用户是否登录 token
// 用户已经登陆
// export const isDefineUserLoginChannel = () => {
//   return request({
//     // method: 'GET',
//     url: '/v1_0/user/channels',
//     headers: {
//       Authorization: `Bearer ${store.state.token}`
//     }

//   })
// }
// 更新用户选择的频道列表到数据库保存
// 获取用户 修改的数据
export const PutUserEditChannel = (channels) => {
  return request({
    method: 'PUT',
    url: '/v1_0/user/channels',
    data: {
      channels
    }

  })
}
// 关注用户 following.vue
export const postFollowUser = (userId) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }

  })
}
// 取消关注用户 following.vue
export const deleteFollowUser = (userId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`

  })
}

// 文章-收藏
export const collectByArtId = (autId) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: autId
    }

  })
}
// 文章 -取消收藏
export const noCollectByArtId = (autId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${autId}`

  })
}

/**
 * 获取-文章评论列表 获取评论或评论回复
 */
export const getArtCommentList = ({ type, source, offset, limit }) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }

  })
}
/**
 * 文章点赞
 */
export const getLiking = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: target
      // Content-Type:'application/json
    }

  })
}
/**
 * 文章取消点赞
 */
export const getCancleLiking = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`,
    data: {
      target: target
      // Content-Type:'application/json
    }

  })
}
/**
 * 更新-用户头像
 */
export const editUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data

  })
}
// export const editUserPhoto = (photo) => {
//   return request({
//     method: 'PATCH',
//     url: '/v1_0/user/photo',
//     data: {
//       photo
//     }

//   })
// }
