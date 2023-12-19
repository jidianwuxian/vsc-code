import request from "@/utils/request"

/** 增 */
export function createTableDataApi(data) {
  return request({
    url: "users/add",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id) {
  return request({
    url: `users/${id}`,
    method: "delete"
  })
}


/** 改 */
export function updateTableDataApi(data) {
  return request({
    url: "users/update",
    method: "post",
    data
  })
}

/** 查 */
export function queryUser(params) {
  return request({
    url: "/users",
    method: "get",
    params
  })
}
