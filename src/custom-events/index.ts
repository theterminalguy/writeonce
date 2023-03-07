export const CustomEvents = {
  PlaceholderAdded: "placeholder-added",
  RerenderFloatingToolbar: "rerender-floating-toolbar",
};

export type CustomEventDetailType = { id: string; name: string };

export const dispatchCustomEvent = (
  eventName: string,
  detail?: CustomEventDetailType
) => {
  const event = detail
    ? new CustomEvent<CustomEventDetailType>(eventName, { detail })
    : new CustomEvent<CustomEventDetailType>(eventName);

  document.dispatchEvent(event);
};
