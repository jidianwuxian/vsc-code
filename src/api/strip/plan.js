import request from "@/utils/request"

export function queryPlan(params) {
  return request({
    url: "/plans",
    method: "get",
    params
  })
}
