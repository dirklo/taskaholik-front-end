const setToken = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const thirtyMinutes = 1000 * 60 * 30;
  const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
  if (timeSinceLastLogin < thirtyMinutes) {
    return localStorage.getItem("token");
  }
};

export const signupUser = (credentials) => {
    return (dispatch) => {
      return fetch("http://127.0.0.1:3001/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: credentials })
      }).then((res) => {
        if (res.ok) {
          setToken(res.headers.get("Authorization"));
          return res
            .json()
            .then((userJson) =>
              dispatch({ type: 'AUTHENTICATED', payload: userJson })
            );
        } else {
          return res.json().then((errors) => {
            dispatch({ type: 'NOT AUTHENTICATED' });
            return Promise.reject(errors);
          });
        }
      });
    };
};

export const loginUser = (credentials) => {
    return async (dispatch) => {
        fetch("http://127.0.0.1:3001/login", {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ user: credentials }),
        })
        .then((res) => {
          if (res.ok) {
            setToken(res.headers.get("Authorization"));
            return res.json()
            .then((userJson) => {
              dispatch({ type: 'AUTHENTICATED', payload: userJson })
              return userJson
            })
          } else {
            return res.json()
            .then((errors) => {
            dispatch({ type: 'NOT AUTHENTICATED' });
            return Promise.reject(errors);
            });
          }
        });
    };
};
  
export const logoutUser = () => {
    return (dispatch) => {
        return fetch("http://127.0.0.1:3001/logout", {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: getToken(),
        },
        }).then((res) => {
        if (res.ok) {
            return dispatch({ type: 'NOT AUTHENTICATED' });
        } else {
            return res.json().then((errors) => {
            dispatch({ type: 'NOT AUTHENTICATED' });
            return Promise.reject(errors);
            });
        }
        });
    };
};

export const checkAuth = () => {
    return (dispatch) => {
      return fetch("http://localhost:3001/current_user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: getToken()
        }
      }).then((res) => {
        if (res.ok) {
          return res.json().then(user => dispatch({type: 'AUTHENTICATED', payload: user}))
        } else {
          return Promise.reject(dispatch({type: 'NOT AUTHENTICATED'}))
        }
      });
    };
  };