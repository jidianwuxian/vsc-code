import request from "@/utils/request"

export function queryLog(params) {
  return request({
    url: "/records",
    method: "get",
    params
  })
}
