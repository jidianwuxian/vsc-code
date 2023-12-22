import request from "@/utils/request"

export function queryStrip(params) {
    return request({
      url: "/workBenchInit",
      method: "get",
      params
    })
  }

export function deleteStrip(id){
    return request({
      url: `/deleteWorkBench/${id}`,
      method: "delete",
    })
  }
