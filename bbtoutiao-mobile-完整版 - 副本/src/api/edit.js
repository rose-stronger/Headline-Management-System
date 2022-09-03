import request from '@/utils/request'

/**
 *
更新-用户个人简介
 */
export const editUserFile = ({ name, gender, birthday }) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data: {
      name,
      gender,
      birthday
    }
  })
}
