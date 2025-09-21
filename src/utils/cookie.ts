interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

const setCookie = (tokens: Tokens): void => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${
    1 * 24 * 60 * 60
  }`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * 24 * 60 * 60
  }`;
};

const getCookie = (cookeiName: string) => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookeiName)
    ?.split("=")[1];
};

export { setCookie, getCookie };
