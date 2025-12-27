
export function logout(navigate) {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("role");
  navigate("/login");
}
