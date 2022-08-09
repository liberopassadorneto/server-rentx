**RF (Requisitos Funcionais)**
**RNF (Requisitos Não Funcionais)**
**RN (Regras de Negócio)**

# Cadastro de Carro

**RF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado como available = true (default).
(!) O cadastro do carro deve feito somente por um usuário adm.

# Listagem de Carros

**RF**
Deve ser possível listar todos os carros que estão disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
A listagem do carro é feita/permitida para usuários logados ou não logados.

# Cadastro de Especificação do Carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.

**RN**
Não deve ser possível cadastrar uma especificação para um carro que não existe (que não está cadastrado).
Não deve ser possível possível cadastrar uma especificação já existente para o mesmo carro.
(!) O cadastro de uma especificação deve feito somente por um usuário adm.

# Cadastro de Imagens do Carro

**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Utilizar o multer para o upload dos arquivos.

**RN**
O usuário deve poder cadastrar múltiplas imagens para o mesmo carro.
(!) O cadastro de imagens do carro deve feito somente por um usuário adm.

# Aluguel de Carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro.
Não deve ser possível cadastrar um novo aluguel, caso já exsta um aberto para o mesmo usuário.
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.
(!) O usuário deve estar logado na aplicação.

# Devolução de Carro

**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado uma diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o valor total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado uma multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao valor total do aluguel.
(!) O usuário deve estar logado na aplicação.
