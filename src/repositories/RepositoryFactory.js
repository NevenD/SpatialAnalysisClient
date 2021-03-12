import _IOpenRouteRepository from "./IOpenRouteRepository";

const repositories = {
    IOpenRouteRepository: _IOpenRouteRepository,
};

export const Repository = {
    get: name => repositories[name]
};
