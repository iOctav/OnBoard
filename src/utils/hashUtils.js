export const getHashParams = () => {
  return extractHashParamsFromHash(window.location.hash);
}

export const extractHashParamsFromRedirectUrl = (redirectUrl) => {
  const url = new URL(redirectUrl);
  return extractHashParamsFromHash(url.hash);
}

const extractHashParamsFromHash = (urlHash) => {
  return urlHash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
}

export const removeHashParamsFromUrl = () => {
  window.history.pushState("", document.title, window.location.pathname + window.location.search);
}