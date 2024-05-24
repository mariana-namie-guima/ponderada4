// api/helpers/dados-service.js

// Exporta um objeto que contém um serviço para validar e formatar os dados de um formulário
module.exports = {
  // Nome amigável do serviço
  friendlyName: 'Dados service',

  // Descrição do serviço
  description: 'Service to validate and format form data',

  // Entradas esperadas pelo serviço
  inputs: {
    // Objeto de dados contendo os campos do formulário
    data: {
      type: 'ref', // Tipo do dado esperado (referência)
      description: 'The data object containing form fields', // Descrição do campo
      required: true // Indica que o campo é obrigatório
    }
  },

  // Saídas possíveis do serviço
  exits: {
    // Saída de sucesso
    success: {
      description: 'All done.', // Descrição do sucesso
    },
    // Saída para dados de entrada inválidos
    invalidInput: {
      description: 'Invalid input data', // Descrição do erro
    }
  },

  // Função principal do serviço
  fn: async function (inputs, exits) {
    const data = inputs.data; // Obtém os dados de entrada

    try {
      // Valida e formata o campo de email
      if (typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        throw new Error('Invalid email format'); // Lança um erro se o formato do email for inválido
      }
      data.email = data.email.toLowerCase().trim(); // Converte o email para minúsculas e remove espaços em branco

      // Valida e formata o campo de nome
      if (typeof data.name !== 'string' || data.name.trim() === '') {
        throw new Error('Invalid name'); // Lança um erro se o nome for inválido
      }
      data.name = data.name.trim(); // Remove espaços em branco do nome

      // Valida e formata o campo de senha
      if (typeof data.password !== 'string' || data.password.trim() === '') {
        throw new Error('Invalid password'); // Lança um erro se a senha for inválida
      }
      data.password = data.password.trim(); // Remove espaços em branco da senha

      // Valida e formata o campo de idade
      const age = parseInt(data.idade, 10); // Converte a idade para um número inteiro
      if (isNaN(age) || age <= 0) {
        throw new Error('Invalid age'); // Lança um erro se a idade for inválida
      }
      data.idade = age; // Armazena a idade formatada

      return exits.success(data); // Retorna os dados formatados em caso de sucesso
    } catch (error) {
      return exits.invalidInput({ // Retorna um erro em caso de entrada inválida
        error: error.message // Mensagem de erro
      });
    }
  }
};
