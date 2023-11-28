export const activeRoute = (
  isActiveOn: string,
  pathname: string,
  hasNestedRoute: boolean = false
) => {
  if (hasNestedRoute) {
    return pathname.startsWith(isActiveOn);
  } else {
    return isActiveOn === pathname;
  }
};
