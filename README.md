# Gobarber-API
API do GoBarber

Api REST do Projeto GoBarber - Agendamento de serviço para cabeleleiro. 

# Funcionalidades 

[ ] - Cadastro de usuários </br>
[ ] - Login </br>
[ ] - Recuperação de senha </br>
[ ] - Atualização do perfil e avatar </br>
[ ] - Listagem dos Cabeleiros </br>
[ ] - Listagem de disponibilidade de horário, mês e ano </br>
[ ] - Agendamento do serviço </br>
[ ] - Listagem do serviço de determinado dia </br>


# Tecnologias

[ ] -Foi utilizada a linguagem de programação NODEJS com Typescript </br>
[ ] - Para rodar os testes foi utilizado o Jest </br>
[ ] - Em ambiente de desenvolvimento utilizamos fake SMTP ethereal e para produção o serviço da Amazon SES </br>


# Subindo a Aplicaçao 

Para rodar a aplicação necessitar primeiramente criar um banco de dado com o nome "gostack_gobarber", logo após executar as migração do
banco de dados com o seguinte código `yarn typeorm migration:run`, depois disso digite o código  `yarn dev:server`, com isso a API está pronta para aceitar requisições.

#Rodando os testes

Para executar os testes basta digitar o código `yarn test`
