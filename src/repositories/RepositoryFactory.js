import _IOpenRouteRepository from "./IOpenRouteRepository";
import _IRouteRepository from "./IRouteRepository";

const repositories = {
  IOpenRouteRepository: _IOpenRouteRepository,
  IRouteRepository: _IRouteRepository,
};

export const Repository = {
  get: (name) => repositories[name],
};
