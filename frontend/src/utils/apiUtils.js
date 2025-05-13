const getApiUrl = () => {
    const { protocol, hostname } = window.location;
    const backendPort = import.meta.env.VITE_BACKEND_PORT;
    return `${protocol}//${hostname}:${backendPort}`;
};

export { getApiUrl };
