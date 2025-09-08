import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const Tabs = ({ tab, setTab, doctorID }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  // ${BASE_URL}/doctors/${doctorID}

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/doctors/${doctorID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = response.statusText;

        try {
          const errJson = await response.json();
          message = errJson.message || message;
        } catch {
          console.log("No JSON response");
        }

        throw new Error(message || "Something went wrong");
      }
      // Successfully deleted the account, now log out the user
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.error("Failed to delete account:", err.message);
    }
  };

  // Show toast notifications for delete API call
  const deleteImpl = () => {
    toast.promise(handleDelete(), {
      pending: "Deleting account...",
      success: "Account deleted successfully!",
      error: {
        render({ data }) {
          return `Failed to delete account: ${
            data?.message || "Unknown error"
          }`;
        },
      },
    });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div
        className="hidden lg:flex flex-col p-[30px] bg-zinc-100  shadow-panelShadow items-center h-max 
      rounded-md"
      >
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>

        <button
          onClick={() => setTab("appointments")}
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Appointements
        </button>

        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>

        <div className="mt-[100px] w-full">
          <button
            onClick={handleLogout}
            className="w-full bg-[#181A1E] p-3 text-[17px] leading-7 rounded-md text-white"
          >
            Logout
          </button>
          <button
            onClick={deleteImpl}
            className="w-full bg-red-600 mt-4 p-3 text-[17px] leading-7 rounded-md text-white"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
