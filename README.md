# App

Cal.com style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [x] Deve ser possível o usuário cadastrar uma organização;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível buscar um usuário pelo nome de usuário;
- [x] Deve ser possível o usuário fazer um agendamento com uma organização;
- [x] Deve ser possível o usuário obter o seu histórico de agendamentos;
- [x] Deve ser possível o usuário buscar organizações pelo nome;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 agendamentos no mesmo dia em uma mesmo horário;
- [ ] A organização só pode ser cadastrada por usuário autenticados;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
