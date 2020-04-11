const axios = require('axios')
const getUrl = data => `https://economia.awesomeapi.com.br/json/daily/USD-BRL?start_date=${data}`


const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data[0].high
const getToday = () => {
    const today = new Date()
    formatarData = `${today.getFullYear()}0${today.getMonth()+1}${today.getDate()}`
    return formatarData
    
}
const getCotacao = ({getToday, getUrl, getCotacaoAPI, extractCotacao}) => async() => {
    try{
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao
    }
    catch(err){
        return ''
    }    
}

module.exports = {
    getCotacao: getCotacao({getToday, getUrl, getCotacaoAPI, extractCotacao}),
    extractCotacao,
    getCotacaoAPI,
    getUrl,
    getToday,
    pure: {
        getCotacao
    }
}