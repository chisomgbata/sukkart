export function useHandleRedirect() {
  const redirectCookie = useCookie("redirect");
  const cookie = redirectCookie.value;
  if (cookie) {
    const newCookie = useCookie("redirect", {
      expires: new Date(0),
    });
    newCookie.value = "";
    return navigateTo(cookie);
  }
}
