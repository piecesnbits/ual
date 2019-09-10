export function getShouldRenderLoginModal(state) {
    return state.showLoginModal;
}
export function getActiveAuthenticator(state) {
    return state.activeAuthenticator;
}

export function getAuthenticators(state) {
    if(state.UAL){
        return state.UAL.getAuthenticators().availableAuthenticators;
        // return state.UAL.authenticators;
    }
    else{
        return [];
    }  
}

export function getSESSION(state) {
    return state.SESSION;
}

export function getUAL(state) {
    return state.UAL;
}

export function getAccountName(state) {
    return state.accountName;
}


