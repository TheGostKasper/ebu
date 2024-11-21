import React from "react";
import { useBreadcrumbStore } from "../store/useAppStore";
import FaceCapture from "../components/face-capture";

const Users: React.FC = () => {
  const title = "Users";
  const { setTitle } = useBreadcrumbStore();

  React.useEffect(() => {
    setTitle(title);
  }, [setTitle]);
  return (
    <div className="space-y-6">
      <FaceCapture />
    </div>
  );
};

export default Users;
