
import React, { useState } from "react";
import "./App.css";

const initialForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  gender: "",
  terms: false,
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
    setSubmittedData(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Include uppercase, lowercase and a number.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender.";
    }

    if (!formData.terms) {
      newErrors.terms = "Please accept the terms to continue.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setSubmittedData(null);
      return;
    }

    // Demo only: do not store or display the password.
    setSubmittedData({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone,
      gender: formData.gender,
    });
  };

  const handleReset = () => {
    setFormData(initialForm);
    setErrors({});
    setSubmittedData(null);
    setShowPassword(false);
  };

  return (
    <main className="app-container">
      <section className="form-card">
        <div className="brand-icon" aria-hidden="true">
          ✦
        </div>

        <p className="eyebrow">CREATE YOUR ACCOUNT</p>
        <h1>Join us today</h1>
        <p className="subtitle">
          Fill in your details to get started.
        </p>

        {submittedData ? (
          <section className="success-panel" aria-live="polite">
            <div className="success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p>Your form has been validated successfully.</p>

            <div className="profile-details">
              <p><strong>Full Name:</strong> {submittedData.name}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Phone:</strong> {submittedData.phone}</p>
              <p><strong>Gender:</strong> {submittedData.gender}</p>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={handleReset}
            >
              Register Another Account
            </button>
          </section>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Kartik Rathod"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p className="error-message" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="error-message" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="error-message" id="password-error">
                  {errors.password}
                </p>
              )}
              <p className="field-hint">
                Use uppercase, lowercase and at least one number.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Mobile Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p className="error-message" id="phone-error">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                aria-invalid={Boolean(errors.gender)}
                aria-describedby={errors.gender ? "gender-error" : undefined}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="error-message" id="gender-error">
                  {errors.gender}
                </p>
              )}
            </div>

            <div className="terms-row">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                aria-invalid={Boolean(errors.terms)}
                aria-describedby={errors.terms ? "terms-error" : undefined}
              />
              <label htmlFor="terms">
                I agree to the terms and conditions.
              </label>
            </div>
            {errors.terms && (
              <p className="error-message" id="terms-error">
                {errors.terms}
              </p>
            )}

            <div className="button-row">
              <button type="submit" className="primary-button">
                Create Account →
              </button>
              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

            <p className="security-note">
              Demo form · Your details are not sent to a server.
            </p>
          </form>
        )}
      </section>

      <footer className="page-footer">
        Built with React · Forms, Events &amp; Validation
      </footer>
    </main>
  );
}

export default App;
