# App

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível o usuário cadastrar uma organização;
- [x] Deve ser possível buscar um usuário pelo nome de usuário;
- [x] Deve ser possível o usuário fazer um agendamento com uma organização;
- [x] Deve ser possível o usuário obter o seu histórico de agendamentos;
- [x] Deve ser possível o usuário buscar organizações pelo nome;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível cancelar um agendamento antes de um determinado prazo.
- [] Deve ser possível a organização definir horários de funcionamento.
- [] Deve ser possível a organização gerenciar seus agendamentos (aceitar, recusar ou cancelar).
- [] Deve ser possível enviar notificações por e-mail ou SMS sobre agendamentos e cancelamentos.
- [] Deve ser possível um usuário editar seu perfil (nome, senha, foto, etc.).
- [] Deve ser possível que um usuário visualize a disponibilidade de horários de uma organização antes de agendar.

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] A organização só pode ser cadastrada por usuário autenticados;
- [ ] O usuário não pode fazer 2 agendamentos no mesmo dia em uma mesmo horário;
- [ ] O cancelamento de um agendamento deve ter um prazo limite antes do horário marcado.
- [ ] A organização pode definir regras para agendamentos, como tempo mínimo de antecedência.
- [ ] O usuário só pode cancelar um agendamento no máximo X vezes dentro de um período para evitar abusos.
- [ ] O administrador da organização pode adicionar e gerenciar outros usuários (funcionários, por exemplo).

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
