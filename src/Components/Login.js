import React from 'react';

const Login = ({ form, onChange, onSubmit, error }) => {
  return (
    <form onSubmit={onSubmit} className="auth-form">
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

      <button type="submit" className="btn btn-primary w-100 auth-btn">
        Login
      </button>
    </form>
  );
};

export default Login;
