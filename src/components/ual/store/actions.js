export async function renderLoginModal({ state, commit, dispatch }) {
  commit("setShouldRenderLoginModal", true);
}

export async function logout({ state, commit, dispatch }) {
  let activeAuth = state.activeAuthenticator;
  if(activeAuth){
    console.log(`Logging out from authenticator: ${activeAuth.getStyle().text}`);
    activeAuth.logout().then(() =>{
      console.log('Logged out!')
      commit("setActiveAuthenticator", false);
      commit("setAccountName", false);
      commit("setSESSION", {accountName:null, authenticatorName: null});
    }).catch(e => {console.log(`An error occured while attempting to logout from authenticator: ${activeAuth.getStyle().text}`)});
  }
  else{
    console.log('No active authenticator found, you must be logged in before logging out.');
  }
}

export async function transact({ state, commit, getters }, payload) {
  let user = state.activeAuthenticator.users[0];
  //add authorization to actions if not supplied
  payload.actions.forEach(a => {
    if (!a.authorization) {
      a.authorization = [{ actor: user.accountName, permission: "active" }];
    }
    // return a;
  });
  console.log(JSON.stringify(payload.actions, null, 2) );
  //sign
  try{
    let res = await user.signTransaction(
      { actions: payload.actions },
      { broadcast: true }
    );
    console.log(res);
    return res;
  }catch(e){
    console.log(e, e.cause);
    return false;
  }
}

export async function waitForAuthenticatorToLoad({}, authenticator) {
  return new Promise((resolve) => {
    if (!authenticator.isLoading()) {
      resolve()
      return
    }
    const authenticatorIsLoadingCheck = setInterval(() => {
      if (!authenticator.isLoading()) {
        clearInterval(authenticatorIsLoadingCheck)
        resolve()
      }
    }, 250)
  })
}
export async function attemptAutoLogin({state, commit, dispatch}){
  let {accountName, authenticatorName, timestamp}= state.SESSION;
  if(accountName && authenticatorName){
    let authenticator = state.UAL.authenticators.find(a => a.getStyle().text == authenticatorName);
    authenticator.init();
    await dispatch('waitForAuthenticatorToLoad', authenticator);
    if(authenticator.initError){
      console.log(`Attempt to auto login with authenticator ${authenticatorName} failed because it's not available anymore.`);
      return;
    }
    authenticator.login(accountName).then(()=>{
      commit('setSESSION', {accountName:accountName, authenticatorName: authenticatorName});
      commit("setAccountName", accountName);
      commit("setActiveAuthenticator", authenticator);
    });
  }
  
}
