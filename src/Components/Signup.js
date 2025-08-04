import React from 'react';

const Signup = ({ form, onChange, onSubmit, error }) => {
  return (
    <form onSubmit={onSubmit} className="auth-form">
      <div className="form-group mb-3">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="form-control auth-input"
          value={form.name}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control auth-input"
          value={form.email}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control auth-input"
          value={form.password}
          onChange={onChange}
          required
        />
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <button type="submit" className="btn btn-success w-100 auth-btn">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
