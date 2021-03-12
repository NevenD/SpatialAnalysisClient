import _repository from "./../repositories/Repository";

const route = "/api/OpenRoute";
export default {
    getDirectionData(getRouteDTO) {
        return Repository.get(`${route}/GetRouteAsync/${getRouteDTO}`).catch(error => console.log(error));
    }
};