import axios from 'axios';

const apiUrl = 'https://brasilapi.com.br/api';

const fetchCnpj = async (cnpj: string) => {
    try {
        const response = await axios.get(`${apiUrl}/cnpj/v1/${cnpj}`);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('CNPJ Inválido');
        }
    } catch (err) {
        console.log(err)
        throw err;
    }
};

export { fetchCnpj };
