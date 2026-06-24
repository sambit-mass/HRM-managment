export const setToast = (
  toast,
  title,
  description,
  status,
  position= "top",
  duration = 2000
) => {
  toast({
    title,
    description,
    status,
    position,
    duration,
    isClosable: true,
    
  });
};
