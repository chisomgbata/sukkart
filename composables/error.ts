export function useHandleError(error: any) {
  if (error.errors) {
    return toast.error("Error", {
      description: error.errors[0].message,
    });
  }
  if (error.data) {
    return toast.error("Error", {
      description: error.data.message,
    });
  }
  return toast.error("Error", {
    description: error.message,
  });
}
