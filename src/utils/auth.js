export const isSuperAdmin = () => {
    const role = localStorage.getItem("role");
    return role === "superadmin";
  };  