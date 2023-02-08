export const CustomEvents = {
  PlaceholderAdded: "placeholder-added",
  RerenderFloatingToolbar: "rerender-floating-toolbar",
};

export type CustomEventDetailType = { id: string; name: string };

export const dispatchCustomEvent = (
  eventName: string,
  detail: CustomEventDetailType
) => {
  const event = new CustomEvent(eventName, { detail });
  document.dispatchEvent(event);
};
