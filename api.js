// Declaração da função responsável por buscar as cotações
export async function GetRates(){
    const url = 'https://api.frankfurter.app/latest?from=BRL';
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na resposta da API: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json(); // Converte a resposta para JSON
  
      // Retorna as taxas de câmbio com os valores corretos
      return {
        USD: 1 / data.rates.USD,
        EUR: 1 / data.rates.EUR,
        GBP: 1 / data.rates.GBP,
      };
    } catch (error) {
      console.error('Erro ao buscar as cotações:', error);
      throw error; // Re-throw the error to handle it in script.js if needed
    }
  }