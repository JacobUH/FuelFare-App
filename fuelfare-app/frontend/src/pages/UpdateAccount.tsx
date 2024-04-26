import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";

interface UpdateUserInfoFormData {
  fullName: string;
  companyName: string;
  companyAddress1: string;
  companyAddress2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface UpdatePWFormData {
  currentPassword: string;
  newPassword: string;
  confNewPassword: string;
}

export default function UpdateAccount() {
  const [updateUserInfoFormData, setUpdateUserInfoFormData] =
    useState<UpdateUserInfoFormData>({
      fullName: "",
      companyName: "",
      companyAddress1: "",
      companyAddress2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    });

  const [updatePWFormData, setUpdatePWFormData] = useState<UpdatePWFormData>({
    currentPassword: "",
    newPassword: "",
    confNewPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/fetchUserData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response data:", response.data);
        const userData = response.data.userSetup;
        console.log("User data:", userData);
        setUpdateUserInfoFormData({
          fullName: userData.fullName,
          companyName: userData.companyName,
          companyAddress1: userData.companyAddress1,
          companyAddress2: userData.companyAddress2,
          city: userData.city,
          state: userData.state,
          country: userData.country,
          zipCode: userData.zipCode,
        });
        console.log("Updated user info:", updateUserInfoFormData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdateUserInfoFormData({ ...updateUserInfoFormData, [name]: value });
  };

  const handlePWInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatePWFormData({ ...updatePWFormData, [name]: value });
  };

  // Add a handle form submission process
  const handleAccountSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8080/updateAccount",
        updateUserInfoFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Account information updated successfully. Redirecting to dashboard..."
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handlePWSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if newPassword and confNewPassword match
    if (updatePWFormData.newPassword !== updatePWFormData.confNewPassword) {
      alert("New Password and Confirm New Password fields do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "http://localhost:8080/updatePassword",
        updatePWFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Your password has been successfully updated! You will now be redirected to the login page to sign in with your new password."
      );
      navigate("/login");
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Current password is incorrect"
      ) {
        alert("The current password you entered is incorrect.");
      } else {
        console.error("Error updating user info:", error);
      }
    }
  };

  /* Hooks for setting input constraints */
  const [nameMaxLength] = useState(50);
  const [addressMaxLength] = useState(100);
  const [cityMaxLength] = useState(100);
  const [zipcodeMaxLength] = useState(9);
  const [zipcodeMinLength] = useState(5);

  return (
    <div
      className={`UpdateAccount ${
        location.pathname === "/updateAccount" ? "update-background" : ""
      }`}
    >
      <Navbar />
      <BackButton className="ms-3" />

      <div className="mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 mb-4">
            <div className="card no-margin-top">
              <div className="card-body">
                <h1
                  className="my-4 text-center"
                  style={{ color: "rgb(17,75,95)" }}
                >
                  Update User Info
                </h1>

                <form className="row g-3" onSubmit={handleAccountSubmit}>
                  <div className="col-md-6">
                    <label htmlFor="inputFullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputFullName"
                      placeholder="John Smith"
                      maxLength={nameMaxLength}
                      name="fullName"
                      value={updateUserInfoFormData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="John's Apple Farm"
                      maxLength={nameMaxLength}
                      name="companyName"
                      value={updateUserInfoFormData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-6">
                    <label htmlFor="inputAddress" className="form-label">
                      Company Address 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      maxLength={addressMaxLength}
                      name="companyAddress1"
                      value={updateUserInfoFormData.companyAddress1}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-6">
                    <label htmlFor="inputAddress" className="form-label">
                      Company Address 2
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      maxLength={addressMaxLength}
                      name="companyAddress2"
                      value={updateUserInfoFormData.companyAddress2}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="inputCity" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      maxLength={cityMaxLength}
                      name="city"
                      value={updateUserInfoFormData.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputState" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputState"
                      name="state"
                      value={updateUserInfoFormData.state}
                      disabled
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCountry"
                      name="country"
                      value={updateUserInfoFormData.country}
                      disabled
                    />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputZip"
                      minLength={zipcodeMinLength}
                      maxLength={zipcodeMaxLength}
                      name="zipCode"
                      value={updateUserInfoFormData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-login-pg">
                      Confirm Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card no-margin-top">
              <div className="card-body">
                <h1
                  className="my-4 text-center"
                  style={{ color: "rgb(17,75,95)" }}
                >
                  Update Password
                </h1>
                <form onSubmit={handlePWSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="currentPassword"
                      value={updatePWFormData.currentPassword}
                      onChange={handlePWInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="newPassword"
                      value={updatePWFormData.newPassword}
                      onChange={handlePWInputChange}
                      minLength={8}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="confNewPassword"
                      value={updatePWFormData.confNewPassword}
                      onChange={handlePWInputChange}
                      minLength={8}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-login-pg">
                      Confirm Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
