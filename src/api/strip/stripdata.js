import request from "@/utils/request"

export function queryStrip(params) {
    return request({
      url: "/workBenchInit",
      method: "get",
      params
    })
  }

export function deleteStrip(data){
    return request({
      url: `/HandOverById/`,
      method: "post",
      data
    })
  }
export function descLevel(id){
    return request({
      url: `/declineArrtableHeight?id=${id}`,
      method: "get",
      
    })
  }
  ascLevel
  export function ascLevel(id){
    return request({
      url: `/riseDeptableHeight?id=${id}`,
      method: "get",
      
    })
  }

  export function changeState(data){
    return request({
      url: `/modifyArrtableState`,
      method: "post",
      data
    })
  }
  

  export function changeState2(data){
    return request({
      url: `/modifyDeptableState`,
      method: "post",
      data
    })
  }

  export function cancleStrip(data){
    return request({
      url: `/CancelById/`,
      method: "post",
      data
    })
  }