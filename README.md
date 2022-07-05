**RF (Requisitos Funcionais)**
**RNF (Requisitos Não Funcionais)**
**RN (Regras de Negócio)**

# Cadastro de Carro

**RF**
Deve ser possível cadastar um novo carro;

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente;
O carro deve ser cadastrado como available = true (default);
(!)O cadastro do carro deve feito somente por um usuário adm;

# Listagem de Carros

**RF**
Deve ser possível listar todos os carros que estão disponíveis;
Deve ser possível listar todos os carros disponíveis pelo nome da categoria;
Deve ser possível listar todos os carros disponíveis pelo nome da marca;
Deve ser possível listar todos os carros disponíveis pelo nome do carro;

**RN**
A listagem do carro é feita/permitida para usuários logados ou não logados;

# Cadastro de Especificação do Carro

**RF**
Deve ser possível cadastrar uma especificação para um carro;

**RN**
Não deve ser possível cadastrar uma especificação para um carro que não existe (que não está cadastrado);
Não deve ser possível possível cadastrar uma especificação já existente para o mesmo carro;
O cadastro de uma especificação deve feito somente por um usuário adm;

# Cadastro de Imagens do Carro

**RF**
Deve ser possível cadastrar a imagem do carro;


**RFN**
Utilizar o multer para o upload dos arquivos;

**RN**
O usuário deve poder cadastrar múltiplas imagens para o mesmo carro;
O cadastro de imagens do carro deve feito somente por um usuário adm;

# Aluguel de Carro

**RF**
Deve ser possível cadastrar um aluguel;

**RN**
O aluguel deve ter duração mínima de 24 horas;
Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo usuário;
Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro;
