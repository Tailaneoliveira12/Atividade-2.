async function consultaCep(){
    const cep = ProcessingInstruction.argv[2];

    if (!cep) {
        console.log('Uso: clip-cep <CEP>');
            console.log('Exemplo: cli-cep 01001000');
            return;
    }

    if (!/^\d{8}$/.test(cep)) {
        console.log('CEP inválido. Digite 8 dígitos numéricos.');
        return;
    }

    console.log(`Buscando informaçãoes para o CEP: ${cep}...`);

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (data.erro) {
      console.log(`Erro: CEP "${cep}" não encontrado.`);
      return;
    }

    console.log('\n--- Endereço Encontrado ---');
    console.log(`CEP:        ${data.cep}`);
    console.log(`Logradouro: ${data.logradouro}`);
    console.log(`Bairro:     ${data.bairro}`);
    console.log(`Cidade:     ${data.localidade}`);
    console.log(`Estado:     ${data.uf}`);
    console.log(`DDD:        ${data.ddd}`);
    console.log('--------------------------\n');

    } catch (error) {
    console.error('Ops! Ocorreu um erro ao consultar o CEP:', error.message);
    console.error('Verifique sua conexão com a internet ou tente novamente mais tarde.');
  }
}
