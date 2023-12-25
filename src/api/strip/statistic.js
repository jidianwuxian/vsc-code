import request from "@/utils/request"

export function getCountIsLate() {
  return request({
    url: "/getCountIsLate",
    method: "get",
  })
}
