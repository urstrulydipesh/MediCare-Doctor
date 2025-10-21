import { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const Tabs = ({ tab, setTab, doctorID }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);


  const handleDelete = async () => {
    if (!doctorID) throw new Error("Missing doctor ID");
    setBusy(true);

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
          /* no json body */
        }
        throw new Error(message || "Something went wrong");
      }

      setBusy(false);
      return true;
    } catch (err) {
      setBusy(false);
      throw err;
    }
  };

  // Wrapper for toast + navigation logic
  const deleteImpl = () => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete your account? This cannot be undone."
      )
    ) {
      return;
    }

    const p = handleDelete();

    toast.promise(p, {
      pending: "Deleting account...",
      success: "Account deleted successfully!",
      error: {
        render({ data }) {
          return `Failed to delete account: ${
            data?.message || data?.toString() || "Unknown error"
          }`;
        },
      },
    });

    // After success → logout and redirect
    p.then(() => {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    }).catch(() => {
      // error handled by toast
    });
  };

  // Normal logout (no delete)
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
        className="hidden lg:flex flex-col p-[30px] bg-zinc-100 shadow-panelShadow items-center h-max rounded-md"
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
          Appointments
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
            disabled={busy}
            className={`w-full bg-[#181A1E] p-3 text-[17px] leading-7 rounded-md text-white ${
              busy ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            Logout
          </button>

          <button
            onClick={deleteImpl}
            disabled={busy}
            className={`w-full bg-red-600 mt-4 p-3 text-[17px] leading-7 rounded-md text-white ${
              busy ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
