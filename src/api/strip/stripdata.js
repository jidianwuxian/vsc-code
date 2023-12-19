import request from "@/utils/request"

export function queryStrip(params) {
    return request({
      url: "/queryStrip",
      method: "get",
      params
    })
  }