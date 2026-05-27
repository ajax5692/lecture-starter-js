import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    #detailsEndpoint = 'details/fighter/'; // added this private property

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        try {
            // construct the specific endpoint for this fighter using backticks
            const endpoint = `${this.#detailsEndpoint}${id}.json`;

            // call the API helper with this new endpoint
            const apiResult = await callApi(endpoint);

            // return the detailed data
            return apiResult;
        } catch (error) {
            // pass the error up if the network request fails
            throw error;
        }
    }
}

const fighterService = new FighterService();

export default fighterService;
