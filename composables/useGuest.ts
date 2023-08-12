export const useGuest = () => {
  const guestId = useState("useGuest", () => {
    // If guestId is not set, generate a 16 character random string starting with "guest-" and store it in localStorage
    const guestId = useCookie("guestId");
    if (!guestId.value) {
      const newGuestId =
        "guest|" +
        Math.random().toString(36).substring(2, 16) +
        Math.random().toString(36).substring(2, 16);
      guestId.value = newGuestId;
      return newGuestId;
    }
    return guestId;
  });

  return { guestId };
};
