export const isSuperAdmin = () => {
    const role = localStorage.getItem("role");
    return role === "superadmin";
  };  

export const saveToken = (token, role) => {
  localStorage.setItem("access_token", token);
  localStorage.setItem("role", role);
}

export const getToken = () => {
  return localStorage.getItem("access_token");
}

export const deleteToken = ()=>{
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
}

export const getRole = () => {
  return localStorage.getItem("role")
}
