import { Outlet } from "react-router-dom";

function ProtectedLayout() {
  console.log("ProtectedLayout");
  return <Outlet />;
}

export default ProtectedLayout;
