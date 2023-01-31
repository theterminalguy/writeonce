export const CustomEvents = {
    PlaceholderAdded: 'placeholder-added',
    RerenderFloatingToolbar: 'rerender-floating-toolbar',
};

export const dispatchCustomEvent = (eventName: string, detail: any) => {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
}
