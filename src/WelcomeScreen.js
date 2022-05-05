import React from "react";
function WelcomeScreen(props) {
  return props.showWelcomeScreen ? (
    <div className="WelcomeScreen">
      <h2 className="app-title title">
        Log in to see upcoming events around the world for full-stack developers
      </h2>
      <div className="button_cont" align="center">
        <button
          onClick={() => {
            props.getAccessToken();
          }}
          rel="nofollow noopener"
          class="btn-text"
        >
          <b>Sign in with google</b>
        </button>
        <div class="google-btn">
          <div class="google-icon-wrapper">
            <img
              class="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log
o.svg"
              alt="Google sign-in"
            />
          </div>
        </div>
      </div>
      <a className="link"
        href="https://valvegan.github.io/meet/privacy.html"
        rel="nofollow noopener"
      >
        Privacy policy
      </a>
    </div>
  ) : null;
}
export default WelcomeScreen;
