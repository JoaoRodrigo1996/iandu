# App

Cal.com style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível o usuário cadastrar uma organização;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível o usuário fazer um agendamento com uma organização;
- [ ] Deve ser possível o usuário obter o seu histórico de agendamentos;
- [ ] Deve ser possível o usuário buscar organizações pelo nome;
- [ ] Deve ser possível o usuário realizar avaliações da organização;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 agendamentos no mesmo dia em uma mesma organização;
- [ ] A organizaçãp só pode ser cadastrada por usuário autenticados;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
