// api/controllers/UsuarioController.js

// Exporta um objeto que contém várias funções para lidar com requisições relacionadas a usuários
module.exports = {
  // Função para exibir o formulário de cadastro de usuário
  showUserForm: function (req, res) {
    return res.view('pages/cadastro'); // Renderiza a página de cadastro de usuário
  },

  // Função para criar um novo usuário
  create: async function (req, res) {
    try {
      const formData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        idade: req.body.idade
      };

      console.log('Form data received:', formData); // Log do formulário recebido

      // Validate and format data using the helper service
      const formattedData = await sails.helpers.dadosService.with({ data: formData }).intercept('invalidInput', (err) => {
        return res.status(400).json({ error: err.message }); // Retorna um erro de entrada inválida
      });

      console.log('Formatted data:', formattedData); // Log dos dados formatados

      // Create new user with validated and formatted data
      const newUser = await Usuario.create(formattedData).fetch(); // Cria um novo usuário com os dados formatados e validados
      console.log('New user created:', newUser); // Log do novo usuário criado
      res.status(201).json(newUser); // Retorna o novo usuário criado como resposta
    } catch (err) {
      console.error('Error creating user:', err); // Log do erro detalhado
      res.status(500).json({ error: 'Erro ao criar usuário' }); // Retorna um erro interno do servidor
    }
  },

  // Função para buscar um usuário pelo ID
  read: async function (req, res) {
    try {
      const user = await Usuario.findOne({ id: req.params.id }); // Busca um usuário pelo ID
      if (!user) { throw new Error('Usuário não encontrado'); } // Lança um erro se o usuário não for encontrado
      res.json(user); // Retorna o usuário encontrado como resposta
    } catch (err) {
      res.status(404).json({ error: err.message }); // Retorna um erro de não encontrado
    }
  },

  // Função para atualizar um usuário pelo ID
  update: async function (req, res) {
    try {
      const formData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        idade: req.body.idade
      };

      console.log('Form data received for update:', formData); // Log do formulário recebido para atualização

      // Validate and format data using the helper service
      const formattedData = await sails.helpers.dadosService.with({ data: formData }).intercept('invalidInput', (err) => {
        return res.status(400).json({ error: err.message }); // Retorna um erro de entrada inválida
      });

      console.log('Formatted data for update:', formattedData); // Log dos dados formatados para atualização

      const updatedUser = await Usuario.updateOne({ id: req.params.id }).set(formattedData); // Atualiza o usuário com os dados formatados
      if (!updatedUser) { throw new Error('Usuário não encontrado'); } // Lança um erro se o usuário não for encontrado
      res.json(updatedUser); // Retorna o usuário atualizado como resposta
    } catch (err) {
      console.error('Error updating user:', err); // Log do erro detalhado
      res.status(500).json({ error: err.message }); // Retorna um erro interno do servidor
    }
  },

  // Função para excluir um usuário pelo ID
  delete: async function (req, res) {
    try {
      const deletedUser = await Usuario.destroyOne({ id: req.params.id }); // Exclui o usuário pelo ID
      if (!deletedUser) { throw new Error('Usuário não encontrado'); } // Lança um erro se o usuário não for encontrado
      res.json({ message: 'Usuário excluído com sucesso' }); // Retorna uma mensagem de sucesso
    } catch (err) {
      console.error('Error deleting user:', err); // Log do erro detalhado
      res.status(500).json({ error: err.message }); // Retorna um erro interno do servidor
    }
  }
};
