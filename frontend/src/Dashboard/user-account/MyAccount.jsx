import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("myBookings");
  const [busy, setBusy] = useState(false); // disables buttons during operations

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  // NOTE: It's better to get token from auth context / localStorage rather than an import.
  // const token = localStorage.getItem('token'); // <-- prefer this

  // Only performs DELETE API call and returns a promise. Does NOT dispatch logout.
  const handleDelete = async () => {
    setBusy(true);
    try {
      const response = await fetch(`${BASE_URL}/users/${userData._id}`, {
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
          // no json in error
        }
        throw new Error(message || "Something went wrong");
      }

      // Return server response (could be empty)
      const json = await response.json().catch(() => null);
      setBusy(false);
      return json;
    } catch (err) {
      setBusy(false);
      // rethrow so callers (toast.promise) see the rejection
      throw err;
    }
  };

  // called when user presses the "Delete Account" button
  const deleteImpl = () => {
    // Confirm — don't let users delete by accident
    if (!window.confirm("Are you sure you want to permanently delete your account? This cannot be undone.")) {
      return;
    }

    const deletePromise = handleDelete();

    toast.promise(
      deletePromise,
      {
        pending: "Deleting account...",
        success: "Account deleted successfully!",
        error: {
          render({ data }) {
            // data is the error thrown from handleDelete
            return `Failed to delete account: ${data?.message || data?.toString() || "Unknown error"}`;
          },
        },
      }
    );

    // After successful deletion, log the user out.
    deletePromise
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch(() => {
        // error already handled by toast; nothing else to do
      });
  };

  // Logout should NOT delete the account. Only log the user out locally / call logout endpoint.
  const handleLogout = async () => {
    setBusy(true);
    try {
      // Optional: call server logout endpoint if you have one to invalidate tokens
      // await fetch(`${BASE_URL}/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });

      // Clear client state, tokens, etc.
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}

        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex item-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData.name}
                </h3>
                <p className="text-[15px] text-textColor leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-[15px] text-textColor leading-6 font-medium">
                  Blood Type:
                  <span className="ml-2 text-headingColor text-[20px] leading-7">
                    {userData.bloodType}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  disabled={busy}
                  className={`w-full p-3 text-[17px] leading-7 rounded-md text-white ${busy ? "opacity-60 cursor-not-allowed" : "bg-[#181A1E]"}`}
                >
                  Logout
                </button>
                <button
                  onClick={deleteImpl}
                  disabled={busy}
                  className={`w-full mt-4 p-3 text-[17px] leading-7 rounded-md text-white ${busy ? "opacity-60 cursor-not-allowed" : "bg-red-600"}`}
                >
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("myBookings")}
                  className={`${
                    tab === "myBookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7
                  border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7
                  border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>

              {tab === "myBookings" && <MyBookings />}
              {tab === "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
