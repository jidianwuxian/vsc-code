import store from "@/store"
import { usePermissionStore } from "./permission"
import { getToken, removeToken, setToken } from "@/utils/auth"
import router, { resetRouter } from "@/router"
import { login, getInfo } from '@/api/user'

export const useUserStore = defineStore("user", () => {
  const token = ref(getToken() || "")
  const roles = ref([])
  const name = ref("")
  const setRoles = (value) => {
    roles.value = value
  }

  const loginRequest = (loginData) => {
    return new Promise((resolve, reject) => {
      login({
        radio1:loginData.radio1,
        username: loginData.username,
        password: loginData.password,
        code: loginData.code
      })
        .then((res) => {
          setToken(res.token)
          token.value = res.token
          name.value = res.data.name
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const queryUserInfo = () => {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((res) => {
          roles.value = res.roles
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const changeRoles = async (role) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    await getInfo()
    const permissionStore = usePermissionStore()
    permissionStore.setRoutes(roles.value)
    resetRouter()
    permissionStore.dynamicRoutes.forEach((item) => {
      router.addRoute(item)
    })
  }

  const logout = () => {
    removeToken()
    token.value = ""
    name.value=""
    roles.value = []
    resetRouter()
  }

  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  return { token, roles,name,setRoles, loginRequest, queryUserInfo, changeRoles, logout, resetToken }
},
// {
//   persist: {
//     enabled: true,
//     strategies: [
//       {
//         // 自定义存储的 key，默认是 defineStore 的第一个参数，即 store.id
//         key: "local",
//         // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
//         storage: localStorage,
//         // state 中的字段名，按组打包储存
//         paths: ["name"],
//       },
//     ],
//   },
// }

)

export function useUserStoreHook() {
  return useUserStore(store)
}
