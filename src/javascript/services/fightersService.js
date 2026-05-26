import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    #detailsEndpoint = 'details/fighter/'; // 1. Add this private property

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
            // 1. Construct the specific endpoint for this fighter using backticks
            const endpoint = `${this.#detailsEndpoint}${id}.json`;

            // 2. Call the API helper with this new endpoint
            const apiResult = await callApi(endpoint);

            // 3. Return the detailed data
            return apiResult;
        } catch (error) {
            // 4. Pass the error up if the network request fails
            throw error;
        }
    }
}

const fighterService = new FighterService();

export default fighterService;
